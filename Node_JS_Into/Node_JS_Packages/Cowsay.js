import cowsay from "cowsay";

const text = {
    text : "I'm a moooodule",
    e : "oO",
    T : "U "
}

console.log(cowsay.say(text));

let opts= {
    text: "Hello from TypeScript!",
    e: '^^',
    r: true
};

let shapes = {
    text: "Welcome to Node js packages",
    e: "oo",
    f: "elephant",
    mode: "d"
}

console.log(cowsay.say(shapes));