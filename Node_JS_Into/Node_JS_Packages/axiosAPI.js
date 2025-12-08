import axios from "axios";

axios.get("https://jsonplaceholder.typicode.com/posts")
.then(data => console.log(data));

axios.post("https://jsonplaceholder.typicode.com/posts", {
    id: 123456,
    title:"Greetings",
    body: `Hi Hi HI HI Hi Hi Hi hI hi HI HIhI hIhIhi hIhIihi HIhIHi`
}).then(data  => console.log(data)).catch(err => console.log(err));

axios.put("https://jsonplaceholder.typicode.com/posts/1", {
    title:"untitled"
}).then(data => console.log("On change Put",data));

axios.get("https://jsonplaceholder.typicode.com/posts/1").then(data => console.log("After Put ",data));