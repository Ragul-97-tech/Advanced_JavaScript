const os = require("os");
console.log(os.type());
console.log(os.cpus().length);
// console.log(os.version());

const fs = require("fs");
fs.writeFileSync("hello.txt", "I am doing Node js");
fs.appendFile("hello.txt", "\nNow I am learing write file in node js", 
    (err) => {
        console.log("file written");
    }
);

const data = fs.readFileSync("hello.txt", "utf-8");
console.log(data);

console.log("Hi Welcome to Node JS learning let's start with fire fire fire");
function greet(name) {
    console.log("Hi,",name);
}
greet("Ragul");
greet("Murugan");
greet("Kasi");
console.error("hello");

console.log("\u001B[1mRagul");


