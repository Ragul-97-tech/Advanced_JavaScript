// const result = document.getElementById("result");

// const xhr = new XMLHttpRequest();
// xhr.open("GET","https://jsonplaceholder.typicode.com/posts",true);
// console.log(xhr.readyState);
// xhr.send();
// console.log(xhr.status);
// xhr.onload = () => {
//     console.log(xhr.status);
//     if (xhr.status == 200) {
//         console.log(xhr.responseText);
//     }
// }

// //========== Call Stacks ===============

// // function A() {
// //     console.log("I am A")
// // }
// // function B() {
// //     console.log("I am B")
// // }
// // function C() {
// //     console.log("I am C")
// // }
// // function D() {
// //     console.log("I am D")
// // }

// // A();
// // setTimeout(C, 0);
// // Promise.resolve().then(D);
// // B();

// let dosaOrder = new Promise((resolve, reject) => {
//     let dosaReady = Math.random() > 0.5;
//     if (dosaReady)
//         resolve("Dosa is Ready");
//     else 
//         reject("Dosa is not Ready");
// });

// dosaOrder.then((success) => {
//     console.log(success);
// }).catch((error) => {
//     console.log(error);
// }).finally(() => {
//     console.log("Bye..");
// });

// const promise1 = Promise.reject("error occurred!");
// console.log(promise1);
// promise1.then((msg) => {
//     console.log("Promise resolve: ", msg);
// }).catch((err) => {
//     console.log("Promise errors: ", err);
// });

// // // ========== Promise.all() ============
// console.log("// ========== Promise.all() ============");
// const p1 = Promise.resolve(10);
// const p2 = Promise.resolve(20);
// const p3 = Promise.reject(30);
// console.log(p1);

// Promise.all([p1,p2,p3]).then((values) => {
//     console.log("Promise all values: ", values);
// }).catch((err) => {
//     console.log("Promise all errors: ", err);
// });

// // console.log("// ========== Promise.allSettled() ============");
// Promise.allSettled([p1,p2,p3]).then((values) => {
//     console.log("Promise allSettled values: ", values);
// }).catch((err) => {
//     console.log("Promise allSettled errors: ", err);
// });

// console.log("// ========== Promise.any() ============");
// // Any one request is resolved
// Promise.any([p1,p2,p3]).then((values) => {
//     console.log("Promise any values: ", values);
// }).catch((err) => {
//     console.log("Promise any errors: ", err);
// });

// const fast = new Promise((resolve, reject) => {
//     setTimeout(() => resolve("I am fast"), 500);
// });

// const slow = new Promise((resolve, reject) => {
//     setTimeout(() => reject("I am slow"), 300);
// });

// Promise.race([fast, slow]).then((msg) => {
//     console.log("Promise race values: ", msg);
// }).catch((err) => {
//     console.log("Promise race error:", err);
// });

// Promise.allSettled([fast, slow]).then((msg) => {
//     console.log("Promise race values: ", msg);
// }).catch((err) => {
//     console.log("Promise race error:", err);
// });

// function markResults(subject, mark) {
//     return new Promise((resolve, reject) => {
//         if (mark <= 35) {
//             reject(`Failed in ${subject} with ${mark}`);
//         }
//         else {
//             resolve(`Passed in ${subject} with ${mark}`);
//         }
//     });
// }

// let tamil = markResults("Tamil", 95);
// let english = markResults("English", 85);
// let maths = markResults("Mathematics", 35);

// Promise.all([tamil,english,maths]).then((values) => {
//     console.log("Passed: ", values);
// }).catch((err) => {
//     console.log("Failed: ", err);
// });


// Promise.allSettled([tamil,english,maths]).then((values) => {
//     console.log("Passed: ", values);
// }).catch((err) => {
//     console.log("Failed: ", err);
// });


// Promise.any([tamil,english,maths]).then((values) => {
//     console.log("Passed: ", values);
// }).catch((err) => {
//     console.log("Failed: ", err);
// });


// Promise.race([tamil,english,maths]).then((values) => {
//     console.log("Passed: ", values);
// }).catch((err) => {
//     console.log("Failed: ", err);
// });