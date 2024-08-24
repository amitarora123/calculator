let display = document.getElementById("number");
let display2 = document.getElementById("number2");
let isTrue = true;
let againOperator = false;
let lastOperator = "";

function init() {
    for (let i = 0; i < 10; i++) {
        let number = document.getElementById(i.toString());
        number.addEventListener("click", () => handleNumberClick(i));
    }

    document.getElementById(".").addEventListener("click", handleDecimalClick);
    document.getElementById("C").addEventListener("click", handleClearClick);
    document.getElementById("CE").addEventListener("click", handleClearEntryClick);
    document.getElementById("backSpace").addEventListener("click", handleBackspaceClick);
    document.getElementById("equals").addEventListener("click", handleEqualsClick);
    document.getElementById("x²").addEventListener("click", handleSquareClick);
    document.getElementById("√x").addEventListener("click", handleSquareRootClick);
    document.getElementById("1/x").addEventListener("click", handleReciprocalClick);
    document.getElementById("+/-").addEventListener("click", handleToggleSignClick);
    document.getElementById("%").addEventListener("click", handlePercentageClick);
    
    document.getElementById("+").addEventListener("click", () => handleOperatorClick("+"));
    document.getElementById("-").addEventListener("click", () => handleOperatorClick("-"));
    document.getElementById("*").addEventListener("click", () => handleOperatorClick("*"));
    document.getElementById("÷").addEventListener("click", () => handleOperatorClick("/"));
    
    display.addEventListener("keypress", handleKeyPress);
}

function handleNumberClick(number) {
    if (display.value == "0" || isTrue) {
        display.value = number.toString();
        isTrue = false;
    } else {
        display.value += number.toString();
    }
}

function handleDecimalClick() {
    if (!display.value.includes(".")) {
        display.value += ".";
    }
}

function handleClearClick() {
    display.value = "0";
    display2.value = "";
    isTrue = true;
    againOperator = false;
}

function handleClearEntryClick() {
    display.value = "0";
    isTrue = true;
}

function handleBackspaceClick() {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = "0";
    }
}

function handleEqualsClick() {
    if (display2.value !== "" && !isTrue) {
        display2.value += display.value;
        display.value = eval(display2.value);
        display2.value = "";
        isTrue = true;
    }
}

function handleSquareClick() {
    display.value = Math.pow(display.value, 2);
}

function handleSquareRootClick() {
    display.value = Math.sqrt(display.value);
}

function handleReciprocalClick() {
    display.value = 1 / display.value;
}

function handleToggleSignClick() {
    display.value = (display.value.charAt(0) === "-") ? display.value.slice(1) : "-" + display.value;
}

function handlePercentageClick() {
    display.value = display.value / 100;
}

function handleOperatorClick(operator) {
    if (againOperator) {
        display2.value = display2.value.slice(0, display2.value.length - 1);
    }
    againOperator = true;
    lastOperator = operator;
    if (display2.value == "") {
        display2.value = display.value + operator;
    } else {
        display2.value += display.value + operator;
    }
    isTrue = true;
}

function handleKeyPress(event) {
    if (isTrue) {
        display.value = "";
        isTrue = false;
    }
    const key = event.key;
    const validKeys = "0123456789";
    const validOperator = "/*-+^%";
    
    if (!validKeys.includes(key) && !validOperator.includes(key) && key !== ".") {
        event.preventDefault();
        againOperator = false;
    }

    if (validOperator.includes(key)) {
        handleOperatorClick(key);
    }
}

init();
