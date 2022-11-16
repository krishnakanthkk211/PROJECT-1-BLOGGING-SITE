const authorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken")


//-----Function for email validation-----

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

//-----Function for email Password-----

function checkPassword(str) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
}


//-----Create Author API-----

const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        let { fname, lname, title, email, password } = data;

        if (!fname || !lname || !title || !email || !password) {
            return res.status(400).send({status:false, msg:"All fields are mandatory"})
        }

        let checkEmail = validateEmail(email)           //it returns true/false
        if (!checkEmail){return res.status(400).send({status:false, msg:"Please enter a valid Email"})}
        let checkPass = checkPassword(password)
        if (!checkPass){return res.status(400).send({status:false, msg:"Please enter a valid Password"})}

        let result = await authorModel.create(data);
        res.status(201).send({ status: true, msg: result })
        
    } catch (err) {
        res.status(500).send(err.message)
    }
};


//-----Author Login API------

const authorLogin = async function (req, res) {

    let email = req.body.email
    let pass = req.body.password

    if (!email) { return res.status(400).send({ status: false, msg: "Please enter your email" }) }
    if (!pass) { return res.status(400).send({ status: false, msg: "Please enter password" }) }

    let checkEmail = validateEmail(email)
    if (!checkEmail) { return res.status(400).send({ status: false, msg: "Please enter a valid Email" }) }
    let checkPass = checkPassword(pass)
    if (!checkPass) { return res.status(400).send({ status: false, msg: "Please enter a valid Password" }) }


    let authorEmail = await authorModel.findOne({ email: email })
    let authorEP = await authorModel.findOne({ email: email, password: pass })

    if (authorEmail && !authorEP) { return res.status(400).send({ status: false, msg: "Please enter a correct Password" }) }
    else if (!authorEmail) { return res.status(404).send({ status: false, msg: "Author not found" }) }
    else {
        let token = jwt.sign({ authorId: authorEP._id }, "blogging site")
        res.status(200).send({ status: true, Token: token })
    }
}

module.exports = { createAuthor, authorLogin }