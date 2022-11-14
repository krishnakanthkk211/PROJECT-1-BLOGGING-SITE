const authorModel = require("../models/authorModel")


const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        let { fname, lname, title, email, password } = data;

        if (!fname || !lname || !title || !email || !password) {
            res.status(400).send("All fields are mandatory")
        }

        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
        let checkEmail = validateEmail(email)


        function checkPassword(str) {
            var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            return re.test(str);
        }
        let checkPass = checkPassword(password)


        if (!checkEmail) {
            res.status(400).send("Please enter a valid Email")
        }else if(!checkPass) {
            res.status(400).send("Please enter a valid Password")
        }
        else {
            let result = await authorModel.create(data);
            res.status(201).send({ status: true, msg: result })
        }

    } catch (err) {
        res.status(500).send(err.message)
    }
};

module.exports = { createAuthor }
