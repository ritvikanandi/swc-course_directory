const express = require("express");
const router = express.Router({ mergeParams: true });
const { isAdmin, isLoggedIn } = require("../middleware");

const videoController = require("../controllers/video.controller");

router.get("/", isLoggedIn, isAdmin, videoController.getVideos);

router.get("/add", isLoggedIn, isAdmin, videoController.addVideoForm);

router.post("/", isLoggedIn, isAdmin, videoController.postVideo);

router.get("/:videoid", videoController.getEditForm);

router.put("/:videoid", videoController.postEditForm);

router.delete("/:videoid", videoController.deleteVideo);



module.exports = router;
