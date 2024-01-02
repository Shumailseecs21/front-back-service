const express = require("express");
const { get } = require("mongoose");

const User = require("../model/user");

const router = express.Router();

router.get("/", (req, res) => {
    res.redirect("/login");
});

router.get("/register", async function (req, res, next) {
    const response = await fetch("http://127.0.0.1:5001/users/register", {
        method: "get",
    });

    if (response.status === 200) {
        res.render("login/register");
    } else {
        console.log(response.status);
    }
});

router.post("/register", async function (req, res, next) {
    let checkuser;
    const { fullName, email, password, username } = req.body;
    const response = await fetch("http://127.0.0.1:5001/users/register", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fullName: fullName,
            email: email,
            password: password,
            username: username,
        }),
    });
    const data = await response.json();
    const user = data.user;
    const saveUser = new User({
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        password: user.password,
        isLoggedIn: false,
    });
    const storageRes = await fetch(`http://127.0.0.1:5003/api/allocate/${saveUser._id}`, {
        method: "post",
    });
    const storageUser = await storageRes.json();
    const updatedUser = new User({
        ...saveUser.toObject(),
        allocatedStorage: storageUser.user.allocatedStorage,
        usedStorage: storageUser.user.usedStorage,
    });

    const usageRes = await fetch(`http://127.0.0.1:5002/monitor/${saveUser._id}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            bandwidthBytes: 25,
        }),
    });
    const usageUser = await usageRes.json();

    const modifiedUser = new User({
        ...updatedUser.toObject(),
        bandwidthAllocated: usageUser.usageInfo.result.usageCount,
        bandwidthUsed: 0,
    });
    await modifiedUser.save();
    if (response.status === 201) {
        res.render("index");
    } else {
        console.log(response.status);
    }
});

router.get("/login", async function (req, res, next) {
    const response = await fetch("http://127.0.0.1:5001/users/login", {
        method: "get",
    });

    if (response.status === 200) {
        res.render("index");
    } else {
        console.log(response.status);
    }
});

router.post("/login", async function (req, res, next) {
    const { password, username } = req.body;
    const response = await fetch("http://127.0.0.1:5001/users/login", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            password: password,
            username: username,
        }),
    });

    if (response.status === 200) {
        const data = await response.json(); // Extract JSON data from the response
        const token = data.token; // Assuming the token is in the 'token' property of the response
        const user = data.user;
        let userModel = await User.findOne({ username: user.username });
        let userId = userModel._id;
        if (userModel.isLoggedIn) {
            if (token) {
                const updatedUser = await User.findByIdAndUpdate(userModel._id, {
                    $set: {
                        token: token,
                        isLoggedIn: true,
                    },
                });
                await updatedUser.save();
            } else {
                res.redirect("/login");
            }
        }
        res.redirect(`/gallery/${userId}`);
    } else {
        console.log(response.status);
    }
});

router.get("/gallery/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findOne({ _id: userId });
        console.log(user);
        if (user.isLoggedIn) {
            const storageRes = await fetch(`http://127.0.0.1:5003/api/viewGallery/${userId}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const storageImages = await storageRes.json();
            if (storageRes.status === 200) {
                // let finalUsedStorage;
                let finalBandwidth = 0;
                storageImages.Images.forEach(Image => {
                    console.log(Image);
                    // finalUsedStorage=Image.usedStorage;
                    if (Image.size) {
                        finalBandwidth += Image.size;
                        user.images.push({ data: Image.data, size: Image.size, imageId:Image._id });
                    }
                });
                // console.log(user._id);
                const usageResUpdate = await fetch(`http://127.0.0.1:5002/monitor/${user._id}`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        bandwidthBytes: finalBandwidth,
                    }),
                });
                const usageResUpdateJson = await usageResUpdate.json();
                // console.log(usageResUpdateJson);
                const updatedUser = await User.findByIdAndUpdate(user._id, {
                    $set: {
                        bandwidthUsed: usageResUpdateJson.usageInfo.result.usageCount.toString(),
                    },
                });
                await updatedUser.save();
                // return res.redirect("/login");
                res.render("dash/indexDash",{user});
            } else {
                console.log(storageRes.status);
            }
        } else {
            res.redirect("/login");
        }
    } catch (error) {
        console.error(error);
    }
});

// router.get("/gallery/updateprofile/:userId",async(req,res)=>{
    
// });

// router.post("/gallery/image/delete/:imageId",async(req,res)=>{

// });

// router.post("/gallery/updateprofile/:userId",async(req,res)=>{

// });

router.get("/gallery/uploadimage/:userId",async(req,res)=>{
    const userId=req.params.userId;
    const user=await User.find({_id:userId});
    const userDoc=user[0];
    console.log(userDoc);
    res.render("dash/upload",{user:userDoc});
});

router.post("/gallery/uploadimage/:userId",async(req,res)=>{
    const userId=req.params.userId;
    const user=await User.find({_id:userId}); 
    const userDoc=user[0];

    const storageRes = await fetch(`http://127.0.0.1:5003/api/uploadImage/${user._id}`,{
        method:"post",
        headers:{
            "Content-Type":"application/json",
        },body:JSON.stringify({
            file:req.file
        })
    })
    const storageResJson=storageRes.json();
    console.log(storageResJson);
    return res.redirect(`/gallery/uploadimage/${userDoc._id}`);
    const usageRes = await fetch(`http://127.0.0.1:5002/monitor/${user._id}`, {

    });

})

module.exports = router;
