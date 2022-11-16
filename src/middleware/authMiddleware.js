const jwt = require("jsonwebtoken")
const { isValidObjectId } = require("mongoose")
const blogModel = require("../models/blogModel")

const authentication = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]

        if (!token) { return res.status(400).send({ status: false, msg: "Header key is missing" }) }

        let decode = jwt.verify(token, "blogging site")
        
        if (!decode) { return res.status(401).send({ status: false, msg: "authentication failed" }) }
        else {
            req["x-api-key"] = token
            req.decode = decode
            next()
        }
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

const autherization = async function (req, res, next) {

    try {
        let blogId = req.params.blogId;
        if(!isValidObjectId(blogId)){return res.status(400).send("please enter a valid blog id")}
        
        let blogDocx = await blogModel.findById(blogId)
        if(!blogDocx){return res.status(404).send({ status: false, msg: "blog not found" })}
       
        if (req.decode.authorId != blogDocx.authorId) {
            return res.status(403).send({status: false, msg: "autherisation failed" })
        } else {
            next()
        }
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { authentication, autherization }