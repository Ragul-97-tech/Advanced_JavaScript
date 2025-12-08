import http from "http";

const server = http.createServer((request, response) => {
    console.log("request");
    response.write("Responding");
    response.end();
});

const PORT = 3010;
server.listen(PORT, (err, data) => {
    if (err)
        console.log("Something went wrong", err);
    else 
        console.log("Server running on Port", PORT);
});