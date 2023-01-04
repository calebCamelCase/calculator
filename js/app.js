class Calculator {
    constructor(prevOperText, currOperText){
        this.prevOperText = prevOperText;
        this.currOperText = currOperText;
        this.clear();
    }
    /**
     * WHAT DO WE WANT THE CALC TO DO?
     * define operations
     *      clear
     *      delete (single number)
     *      append number
     *      choose operations
     *      compute
     *      update the display
     */

    clear() {
        this.prevOperand = '';
        this.currOperand = '';
        this.operation = undefined;
    }

    delete(){
        this.currOperand = this.currOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        if(number === '.' && this.currOperand.includes('.')) return;
        this.currOperand = this.currOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currOperand === '') return;//if there is no number, the operation buttons are disabled
        if(this.prevOperand !== '') {
            // do something here
            this.compute();
        }

        this.operation = operation;
        this.prevOperand = this.currOperand; //passes this.currOperand to this.prevOpperand
        this.currOperand = ''; //set this.currOperand back to empty string '' so that the user can input a new value
    }

    compute(){
        let computation;
        const prev = parseFloat(this.prevOperand);
        const curr = parseFloat(this.currOperand);

        if(isNaN(prev) || isNaN(curr)) return;
        switch(this.operation){
            case '+':
                //do stuff
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '/':
                computation = prev / curr;
                break;
            default:
                return;
        }

        this.currOperand = computation;
        this.operation = undefined;
        this.prevOperand = '';
    }

    getDisplay(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.'[0]));
        const decimalDigits = stringNumber.split('.'[1]);
        let integerDisplay;

        if(isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', 
            {maximumFractionDigits: 0});
        }
        return decimalDigits;
    }

    updateDisplay(){
        this.currOperText.innerText = this.getDisplay(this.currOperand);
        if(this.operation != null){
            prevOperText.innerText = `${this.getDisplay(this.prevOperand)} ${this.operation}`
        } else {
            prevOperText.innerText = '';
        }
    }
}

/**
 *set constants to acces buttons
 *enclose attribute value pairs in brackets 
 */

const numBtn = document.querySelectorAll('[data-number]');
// console.log(numBtn);
const operBtn = document.querySelectorAll('[data-operation]');
const equalBtn = document.querySelector('[data-equals]');
const delBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');

const prevOperText = document.querySelector('[data-prev-operand]');
const currOperText = document.querySelector('[data-curr-operand]');

const calculator = new Calculator(prevOperText, currOperText);

allClearBtn.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

numBtn.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operBtn.forEach(button =>{
    button.addEventListener('click', ()=> {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalBtn.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

delBtn.addEventListener('click', button =>{
    calculator.delete();
    calculator.updateDisplay();
})