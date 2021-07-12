const express = require("express");
const router = express.Router({ mergeParams: true });
const { isAdmin, isLoggedIn } = require("../middleware");

const videoController = require("../controllers/video.controller");

router.get("/", isLoggedIn, isAdmin, videoController.getVideos);

router.post("/", isLoggedIn, isAdmin, videoController.searchVideo);

router.get("/add", isLoggedIn, isAdmin, videoController.addVideoForm);

router.post("/add", isLoggedIn, isAdmin, videoController.postVideo);

router.get("/:videoid", isLoggedIn, isAdmin, videoController.getEditForm);

router.put("/:videoid", isLoggedIn, isAdmin, videoController.postEditForm);

router.delete("/:videoid", isLoggedIn, isAdmin, videoController.deleteVideo);

module.exports = router;
