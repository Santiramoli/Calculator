// Variables to store the numbers and the selected operator
let firstNumber = '';
let secondNumber = '';
let currentOperator = '';
let resultDisplayed = false;

// Select all buttons inside the 'buttons' class
const buttons = document.querySelectorAll('.buttons button');

// Maximum number of digits before switching to scientific notation
const MAX_DIGITS = 10;

// Iterate over all buttons and add a 'click' event listener
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        // Get the value of the clicked button
        const buttonValue = event.target.innerText;

        // If a result was already displayed and a number is pressed, reset values for a new calculation
        if (resultDisplayed && !isNaN(buttonValue)) {
            firstNumber = '';
            secondNumber = '';
            currentOperator = '';
            resultDisplayed = false;
        }

        // If the button is a number or a decimal point
        if (!isNaN(buttonValue) || buttonValue === '.') {
            if (!currentOperator) {
                // If no operator is selected, continue forming the first number
                firstNumber += buttonValue;
                updateScreen(formatNumber(firstNumber), `${formatNumber(firstNumber)}`);
            } else {
                // If an operator is selected, continue forming the second number
                secondNumber += buttonValue;
                updateScreen(formatNumber(secondNumber), `${formatNumber(firstNumber)} ${currentOperator} ${formatNumber(secondNumber)}`);
            }
        } else if (buttonValue === 'AC') {
            // Reset everything if 'AC' is pressed
            firstNumber = '';
            secondNumber = '';
            currentOperator = '';
            resultDisplayed = false;
            updateScreen('0', ''); // Set the screen to 0 and clear the operation
        } else if (['+', '-', 'x', '/'].includes(buttonValue)) {
            // If the button is an operator and a result was already displayed, use that result as the first number
            if (resultDisplayed) {
                resultDisplayed = false; // Reset the state to continue operating
                secondNumber = '';
            }
            
            // Store the operator and update the screen
            currentOperator = buttonValue;
            updateScreen('', `${formatNumber(firstNumber)} ${currentOperator}`);
        } else if (buttonValue === '=') {
            // If '=' is pressed, calculate the result
            if (firstNumber && secondNumber && currentOperator) {
                const result = calculate(Number(firstNumber), Number(secondNumber), currentOperator);
                updateScreen(formatNumber(result), `${formatNumber(firstNumber)} ${currentOperator} ${formatNumber(secondNumber)} =`);
                resultDisplayed = true; // Mark that the result has been displayed
                firstNumber = result; // Store the result as the first number for new operations
                secondNumber = '';
                currentOperator = '';
            }
        }
    });
});

// Function to update the calculator screen
// It updates both the result and the operation
function updateScreen(result, operation) {
    const resultElement = document.querySelector('.result');
    const operationElement = document.querySelector('.operation');
    
    if (result !== '') {
        resultElement.innerText = result; // Update the result
    }
    
    if (operation !== '') {
        operationElement.innerText = operation; // Update the operation
    }
}

// Function to format the result if it exceeds a certain number of digits
function formatNumber(number) {
    // If number is a string, remove extra zeros
    const numStr = number.toString();
    
    // If the result has more than MAX_DIGITS digits, use scientific notation
    if (numStr.replace('.', '').length > MAX_DIGITS) {
        return Number(number).toExponential(5); // Keep 5 decimal places in scientific notation
    }
    
    return number;
}

// Function to perform the calculations
function calculate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case 'x':
            return num1 * num2;
        case '/':
            return num1 / num2;
        default:
            return 'Error';
    }
}
