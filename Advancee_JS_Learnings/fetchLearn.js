// // === fetch Learn ===
// let apiKey = "zUbDUGtTCmJ7v6Om9lBD8w==w59bc2OVxPlHMgDz";

// let options = {
//     method: "GET",
//     headers: {
//         'X-Api-Key': apiKey
//     }
// }

// let response = fetch("https://dummyjson.com/quotes", options);
// console.log(response);
// console.log(response instanceof Promise);

// response.then((res) => {
//     // you only one time use the response date (bodyUsed readyOnly property)

//     // console.log(res.json());
//     // console.log(res.json().limit);
//     return res.json();
// }).then((data) => {
//     console.log(data);
//     console.log(data.quotes[Math.floor(Math.random()*30)].quote);
// })

// fetch("https://jsonplaceholder.typicode.com/posts", {
//     method: "POST",
//     body: JSON.stringify({
//         title: 'foo',
//         body: 'bar',
//         userId: 1,
//     }),
//     headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//     }
// })
// .then((response) => response.json())
// .then((json) => console.log("created:",json))
// .catch((err) => console.log("Error:", err));


// ==== await and async ========

// function wash() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve("Vegetables washed");
//         }, 1000);
//     })
// }

// function chop() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve("Vegetables chopped");
//         }, 1000);
//     })
// }

// function cook() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve("Vegetables cooked");
//         }, 2000);
//     })
// }

// function serve() {
//     return new Promise((resolve) => {
//         resolve("How is the dish sir?");
//     })
// }

// function makeDish() {
//     wash().then((result) => {
//         console.log(result);
//         return chop();
//     }).then((result) => {
//         console.log(result);
//         return cook();
//     }).then((result) => {
//         console.log(result)
//         return serve();
//     }).then((result) => {
//         console.log(result);
//         confirm(result);
//     }).catch((err) => {
//         console.log("Error on making dish: ", err);
//     });
// }

// async function makeDishInAwait() {
//     console.log("Async and await on cooking dishes")
//     console.log(await wash());
//     console.log(await chop());
//     console.log(await cook());
//     console.log(await serve());
// }

// makeDish();
// makeDishInAwait();


// fetch("https://jsonplaceholder.typicode.com/posts/1")
// .then((response) => {
//   if (!response.ok){
//     throw new Error("Bad Response");
//   }
//   return response;
// }).then((result) => {
//       return result.json();
// }).catch((err) => {
//   console.log("Response status is bad", err);
// });