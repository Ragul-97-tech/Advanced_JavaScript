function add(a,b) {
    return a + b;
}
function sub(a,b) {
    return a-b;
}
export function mul(a,b) {
    return a*b;
}
export function div(a,b) {
    return a/b;
}

export default function greet(name) {
    return "Hi, " + name;
}
console.log(add(3,4));
console.log(sub(5,-9));

export{add, sub};
