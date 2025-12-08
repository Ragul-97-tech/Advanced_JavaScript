
import {add, sub, mul} from "../Node_JS_Packages/Math.js";
import greet from "../Node_JS_Packages/Math.js";
import * as math from "../Node_JS_Packages/Math.js";

console.log(process.argv[2]);
const name = process.argv[2];
console.log(greet(name));

console.log(math);
console.log(math.add(3,7));
console.log(math.sub(8,2));
console.log(math.mul(2,345));
console.log(div(9,3));