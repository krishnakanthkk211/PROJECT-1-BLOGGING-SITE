const express = require("express")
const router = express.Router()
const authorController = require("../Controller/authorController")
const blogController = require("../Controller/blogController")
const middleware = require("../middleware/authMiddleware")

router.post("/author",authorController.createAuthor)
router.post("/blogs", blogController.createBlog)

router.get("/blogs", blogController.getBlogs)

router.put("/blogs/:blogId", middleware.authentication, middleware.autherization,  blogController.updateBlog)

router.delete("/blogs/:blogId", middleware.authentication, middleware.autherization, blogController.deleteBlog)

router.delete("/blogs", middleware.authentication, middleware.autherization, blogController.deleteByField)

router.post("/login", authorController.authorLogin)

module.exports = router;