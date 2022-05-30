const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operator]');
const equalBtn = document.querySelector('[data-equal]');
const clearBtn = document.querySelector('[data-clear]');
const delBtn = document.querySelector('[data-del]');
const previousOpText = document.querySelector('[data-prev-op]');
const currentOpText = document.querySelector('[data-curr-op]');


class Calculator{
  constructor(previousOpText, currentOpText) {
    this.previousOpText = previousOpText;
    this.currentOpText = currentOpText;
    this.clear();
  }
  
  delete(){
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  clear(){
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  formatDisplayNumber(number){
    const stringNumber = number.toString();
    const intDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];

    let intDisplay;

    if(isNaN(intDigits)){
      intDisplay = '';
    } else {
      intDisplay = intDigits.toLocaleString("en", {
        maximalFractionDigits: 0,
      });
    }

    if(decimalDigits != null) {
      return `${intDisplay}.${decimalDigits}`;
    } else {
      return intDisplay;
    }
  }

  calculate(){
    let result;

    const previousOperandFloat = parseFloat(this.previousOperand);
    const currentOperandFloat = parseFloat(this.currentOperand);

    if(isNaN(previousOperandFloat) || isNaN(currentOperandFloat)) return;

    switch(this.operation){
      case '+':
          result = previousOperandFloat + currentOperandFloat;
          break;

        case '-':
          result = previousOperandFloat - currentOperandFloat;
          break;

        case 'x':
          result = previousOperandFloat * currentOperandFloat;
          break;

        case '÷':
          result = previousOperandFloat / currentOperandFloat;
          break;

        default:
          return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  selectOperation(operation){
    if(this.previousOperand !== ''){
      this.calculate();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  appendNumber(number){
    console.log(this.currentOperand);
    if(this.currentOperand.includes(".") && number === '.')  return;
    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  updateDisplay(){
    this.previousOpText.innerText = `${this.previousOperand} ${this.operation || ""}`;
    this.currentOpText.innerText = this.formatDisplayNumber(this.currentOperand);
  }
}

const calculator = new Calculator(
  previousOpText, currentOpText
);

clearBtn.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

for(const numberBtn of numberBtns){
  numberBtn.addEventListener('click', () => {
    calculator.appendNumber(numberBtn.innerText);
    calculator.updateDisplay();
  });
}

for(const operationBtn of operationBtns){
  operationBtn.addEventListener('click', () => {
    calculator.selectOperation(operationBtn.innerText);
    calculator.updateDisplay();
  })
}

equalBtn.addEventListener('click', () =>{
  calculator.calculate();
  calculator.updateDisplay();
});

delBtn.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})