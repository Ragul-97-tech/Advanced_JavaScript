console.log($("#fruits"));
// $("#fruits").next().css({
//     border: "2px solid black"
// })

// console.log($("#fruits").prev().css({color:"red", fontWeight: 100}));
// $("#fruits").prev().css({color:"red"});

// $("#fruits").find("li").first().css({color:"blue", fontSize: "32px"});

$("button").on("click", (e) => {
    e.target.style.scale = "1.5";
});

$.ajax({
    url: "https://jsonplaceholder.typicode.com/users?id=1",
    method: "GET",
});
