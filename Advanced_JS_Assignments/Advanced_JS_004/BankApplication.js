function createBankElements(tag, classes = "", id = "", text = "", source = "", alt ="") {
    const element = document.createElement(tag);
    if (classes) element.className = classes;
    if (id) element.id = id;
    if (source) {
        element.src = source;
        element.alt = alt + " flag image";
    }
    if (text) element.textContent = text;
    return element;
}

class BankAccount {
    constructor() {}
}