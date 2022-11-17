// Given a string S, remove the repeated characters in the string
// Input: Hello World
// where:First line represents the input string
 
// Output: Helo Wrd


function run(s){
    let arr = s.split("")
    let result = arr.filter((x,i,a)=>a.indexOf(x)==i)
    return (s==result.join(""))?"Yes":"No"
}
console.log(run("Machine"))