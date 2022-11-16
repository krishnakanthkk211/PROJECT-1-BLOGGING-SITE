const jwt = require("jsonwebtoken")
const { isValidObjectId } = require("mongoose")
const blogModel = require("../models/blogModel")

const authentication = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) { return res.status(400).send({ status: false, msg: "Header key is missing" }) }

        let decode;
        try{
            decode = jwt.verify(token, "blogging site")
        }catch(err){
           return res.status(401).send({status: false, msg: "authentication failed"})
        }

        req.decode = decode;
        next();
        
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

const autherization = async function (req, res, next) {

    try {
        let blogDocx;
        let blogId = req.params.blogId;
        if(blogId){
            if(!isValidObjectId(blogId)){return res.status(400).send({ status: false, msg: "Please enter a valid Id" })}
            blogDocx = await blogModel.findById(blogId)
        }

        // let queryData = req.query
        // if(queryData){
        //     blogDocx = await blogModel.findOne(queryData)
        // }

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