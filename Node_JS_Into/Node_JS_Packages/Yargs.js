
const { log } = console;
const LOCATION = `../Node_JS_Packages/node_modules/yargs`;

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argvParser = yargs(hideBin(process.argv));
log("Yargs parsed arguments:",argvParser);

argvParser.command({
    command: "greet",
    describe: "Greet Name",
    aliases: ["hi"],
    builder: {
        name: {
            describe: "name of user",
            type: "string",
            demandOption:true
        },
        shout: {
            describe: "shout greeting",
            type: "boolean",
            default: false,
            demandOption: false,
            alias: "s"
        }
    },
    handler(argv) {
        if (argv.shout) {
            log(`HELLO, ${argv.name.toUpperCase()}`);
            return;
        }
        log(`Hello, ${argv.name}`);
    }
});
argvParser.command({
    command: "goodbye",
    describe: "Say bye name",
    aliases: ["bye"],
    builder: {
        name: {
            describe: "name of user",
            type: "string",
            demandOption:true
        },
        shout: {
            describe: "shout greeting",
            type: "boolean",
            default: false,
            demandOption: false,
            alias: "s"
        }
    },
    handler(argv) {
        if (argv.shout) {
            log(`BYE, ${argv.name.toUpperCase()}`);
            return;
        }
        log(`Bye, ${argv.name}`);
    }
});

argvParser.command({
    command: "add",
    describe: "add two values",
    aliases: ["+","addition"],
    builder: {
        number1: {
            describe: "first number",
            type: "integer",
            demandOption:true,
            alias: "n1"
        },
        number2: {
            describe: "second number",
            type: "integer",
            demandOption: true,
            alias: "n2"
        }
    },
    handler(argv) {
        console.log(argv.number1,"+",argv.number2,"=",argv.number1 + argv.number2);
        return;
    }
});

argvParser.command({
    command: "sub",
    describe: "sub two values",
    aliases: ["-","subtraction"],
    builder: {
        number1: {
            describe: "first number",
            type: "integer",
            demandOption:true,
            alias: "n1"
        },
        number2: {
            describe: "second number",
            type: "integer",
            demandOption: true,
            alias: "n2"
        }
    },
    handler(argv) {
        console.log(argv.number1,"-",argv.number2,"=",argv.number1 - argv.number2);
        console.log(argv.number2,"-",argv.number1,"=",argv.number2 - argv.number1);
        return;
    }
});

argvParser.command({
    command: "mul",
    describe: "multiple two values",
    aliases: ["*","x","X","multiple", "multiplication"],
    builder: {
        number1: {
            describe: "first number",
            type: "integer",
            demandOption:true,
            alias: "n1"
        },
        number2: {
            describe: "second number",
            type: "integer",
            demandOption: true,
            alias: "n2"
        }
    },
    handler(argv) {
        console.log(argv.number1,"x",argv.number2,"=",argv.number1 * argv.number2);
        return;
    }
});

argvParser.command({
    command: "div",
    describe: "division two values",
    aliases: ["/","÷","div","divide","division"],
    builder: {
        number1: {
            describe: "first number",
            type: "integer",
            demandOption:true,
            alias: "n1"
        },
        number2: {
            describe: "second number",
            type: "integer",
            demandOption: true,
            alias: "n2"
        }
    },
    handler(argv) {
        console.log(argv.number1,"÷",argv.number2,"=",argv.number1 / argv.number2);
        console.log(argv.number2,"÷",argv.number1,"=",argv.number2 / argv.number1);
        return;
    }
});

argvParser.parse();
