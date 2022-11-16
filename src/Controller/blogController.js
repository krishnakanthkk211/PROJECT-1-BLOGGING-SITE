const { isValidObjectId } = require("mongoose");
const blogModel = require("../models/blogModel")




//-----Create Blog API-----

const createBlog = async function (req, res) {

    try {
        let data = req.body;
        let { title, body, authorId, tags, category, subcategory } = data;

        if (!title || !body || !authorId || !tags || !category || !subcategory) {
            res.status(400).send("All fields are mandatory")
        }
        
        if(!isValidObjectId(authorId)){ return res.status(400).send({status: false, msg: "Please enter valid authorId" })}

        let result = await blogModel.create(data)
        res.status(201).send({ status: true, msg: result })

    } catch (err) {
        res.status(500).send(err.message)
    }

}



//-----API to fetch the blogs-----

const getBlogs = async function (req, res) {

    try {
        let data = req.query
        data.isDeleted = false;
        data.isPublished = true;

        let id = req.query.authorId
        if(id){
            if(!isValidObjectId(id)){return res.status(400).send({status: false, msg: "Please enter valid authorId"})}
        }

        let result = await blogModel.find(data).populate("authorId")

        if(result.length <= 0){return res.status(404).send({ status: false, msg: "blog not found" })}
        else{
            res.status(200).send({status: true, msg: result })
        }

    } catch (err) {
        res.status(500).send(err.message)
    }
}


//-----API to Update the fields of any Blog------

const updateBlog = async function (req, res) {

    try {
        let blogId = req.params.blogId
        if (!isValidObjectId(blogId)) { return res.status(400).send({ status: false, msg: "Please enter valid blog Id" }) }

        let data = req.body;
        let { title, body, tags, category, subcategory } = data

        let obj1 = {}
        let obj2 = {}
        if (title) { obj1.title = title }
        if (body) { obj1.body = body }
        if (category) { obj1.category = category }
        obj1.isPublished = true
        obj1.publishedAt = new Date().toLocaleString()

        if (tags) { obj2.tags = tags }
        if (subcategory) { obj2.subcategory = subcategory }

        let x = await blogModel.findByIdAndUpdate({ _id: blogId }, { $push: obj2 })
        let result = await blogModel.findByIdAndUpdate({ _id: blogId }, { $set: obj1 }, { new: true }).populate("authorId")
        res.status(200).send({ status: true, msg: result })

    } catch (err) {
        res.status(500).send(err.message)
    }

}


//-------API to delete a blog by using blogId---------

const deleteBlog = async function (req, res) {

    try {
        let blogId = req.params.blogId
        if (!isValidObjectId(blogId)) { return res.status(400).send({ status: false, msg: "Please enter a valid blogId" }) }

        let dataUpdate = {
            isDeleted: true,
            deletedAt: new Date().toLocaleString()
        }
        let result = await blogModel.findByIdAndUpdate({ _id: blogId }, { $set: dataUpdate }, { new: true })
        res.status(200).send({ status: true, msg: "Deleted" })

    } catch (err) {
        res.status(500).send(err.message)
    }
}


//-------API to delete a Blog by any field--------

const deleteByField = async function (req, res) {

    try {
        let data = req.query
        let dataUpdate = {
            isDeleted: true,
            deletedAt: new Date().toLocaleString()
        }
        let result = await blogModel.updateMany(data, { $set: dataUpdate })
        res.status(200).send({ status: true, msg: "Deleted" })
    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = { createBlog, getBlogs, updateBlog, deleteBlog, deleteByField }