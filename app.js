const buttons = document.querySelectorAll("button");
const displayInput = document.querySelector(".display");
const displayResult = document.querySelector(".result");

let input = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonValue = button.value;

    if (buttonValue === "clear") {
      input = "-";
      displayInput.innerText = " ";
      displayResult.innerText = "  ";
    } else if (buttonValue === "equal") {
      const result = eval(input);
      const roundedResult = parseFloat(result.toFixed(3));
      displayResult.innerText = roundedResult;
      displayInput.innerText = " ";
      input = displayResult.innerText;
    } else {
      // Overenie vstupu pred pridaním
      if (validInput(buttonValue, input)) {
        input += buttonValue;
        displayInput.innerText = input;
      }
    }
  });
});

// Funkcia na overenie vstupu
function validInput(buttonValue, currentInput) {
  // Zabezpečenie, aby nedochádzalo k viacnásobným desatinným bodkám
  if (buttonValue === "." && currentInput.includes(".")) {
    return false;
  }
  // Zabezpečenie, aby sa príklad nezačínal s * /
  if ((buttonValue === "*" || buttonValue === "/") && currentInput === "") {
    return false;
  }
  // Zabezpečenie, aby sa za sebou nemohli nachádzať dve znamienka
  if (
    currentInput.length > 0 && // kontrola či je vstup dlhší ako 0
    isOperator(currentInput[currentInput.length - 1]) && // kontrola či posledný znak vstupu je operátor
    isOperator(buttonValue) // kontrola či je aktuálny znak operátor
  ) {
    return false;
  }
  return true;
}

// Zabezpečenie, aby sa za sebou nemohli nachádzať dve znamienka

// Funkcia na kontrolu, či je znak operátor (+, -, *, /)
function isOperator(char) {
  return char === "+" || char === "-" || char === "*" || char === "/";
}
