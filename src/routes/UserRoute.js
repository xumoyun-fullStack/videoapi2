const { UsersGet, UserPost } = require("../controllers/UsersController");


const router = require("express").Router();

router.get("/users", UsersGet)
router.post("/user", UserPost)

module.exports = {
    path: "/api",
    router
}
