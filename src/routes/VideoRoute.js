const { VideosGet, VideoPost, VideoPatch, VideoGet, VideoDel } = require("../controllers/VideosController");

const router = require("express").Router();

router.get("/videos", VideosGet);
router.get("/video/:slug", VideoGet);
router.post("/videos", VideoPost);
router.patch("/video/:slug",VideoPatch);
router.delete("/video/:slug",VideoDel);

module.exports = {
    path: "/api",
    router
}