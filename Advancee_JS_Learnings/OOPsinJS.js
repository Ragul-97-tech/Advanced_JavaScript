class Person {
    constructor(name = "Ragul", age) {
        this.name = name;
        this.age = age;
    }

    displayInfo() {
        console.log(`Name: ${this.name}, Age: ${this.age}`);
    }
}

const p1 = new Person('Ragul', 18);
console.log(p1);
p1.displayInfo();

class Student extends Person {
    incrementId;
    subjects = 5;
    static studentID = 1;
    static schoolName = "ABC Higher secondary school";
    constructor(name, age) {
        super(name, age);
        this.incrementId = Student.studentID++;
    }

    displayInfo() {
        super.displayInfo();
        console.log(`Student ID: ${this.incrementId} \nSchool Name: ${Student.schoolName}`);
    }
}

const s1 = new Student("Ram", 13);
s1.displayInfo();

class Plant {
    constructor(name) {
        this.name = name;
    }

    grow() {
        console.log(`The ${this.name} plant is growing`);
    }
}

class Flower extends Plant {
    constructor(name, color) {
        super(name);
        this.color = color;
    }

    bloom() {
        super.grow();
        console.log(`The ${this.color} flower is growing in the ${this.name} plant`);
    }
}

class Tree extends Plant {
    constructor(name, height) {
        super(name);
        this.height = height;
    }

    provideShade() {
        super.grow();
        console.log(`I am ${this.name} and I am tall about ${this.height} meters so I provide shade.`);
    }
}

const flowerP1 = new Flower("Rose", "red");
flowerP1.bloom();

const tree1 = new Tree("Banyan", 1080);
tree1.provideShade();

const plant1 = new Plant("Jasmine");