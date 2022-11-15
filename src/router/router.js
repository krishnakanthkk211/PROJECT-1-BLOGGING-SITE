const express = require("express")
const router = express.Router()
const authorController = require("../Controller/authorController")
const blogController = require("../Controller/blogController")

router.post("/author",authorController.createAuthor)
router.post("/blogs", blogController.createBlog)

router.get("/blogs", blogController.getBlogs)

router.put("/blogs/:blogId", blogController.updateBlog)

module.exports = router;