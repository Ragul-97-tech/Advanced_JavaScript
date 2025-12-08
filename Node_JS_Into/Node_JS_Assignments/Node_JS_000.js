const fs = require("fs");
fs.writeFileSync("students.txt", "Aravind,Malathi,Karim");

function iteratorAndPrint(arr) {
    arr.split(",").forEach((ele,idx) => {
        console.log(idx+1+".",ele);
    });
    console.log();
}

let data = fs.readFileSync("students.txt", "utf-8");
iteratorAndPrint(data);

fs.appendFileSync("students.txt",",Aisha,Kavin");
data = fs.readFileSync("students.txt", "utf-8");
iteratorAndPrint(data);

