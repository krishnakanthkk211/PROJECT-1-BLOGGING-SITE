// function validateEmail(email) {
//     var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
//     return re.test(email);
// }
// let checkEmail = validateEmail("aman@8278")
// console.log(checkEmail)



function checkPassword(str)
{
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
}

let checkEmail = checkPassword("Aman@8278")
console.log(checkEmail)