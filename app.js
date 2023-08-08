const buttons = document.querySelectorAll(".container button");
const displayInput = document.querySelector(".display");
const displayResult = document.querySelector(".result");
const historyRecords = document.querySelector(".historyRecords");
const historyRecordsBackground = document.querySelector(
  ".historyRecordsBackground"
);
const clearHistoryButton = document.querySelector(".clearHistoryRecordsButton");
const toggleHistory = document.querySelector(".showHistory");

let input = "";

toggleHistory.addEventListener("click", () => {
  historyRecordsBackground.classList.toggle("toggleShow");
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonValue = button.value;

    if (buttonValue === "clear") {
      input = "";
      displayInput.innerText = input;
      displayResult.innerText = "  ";
    } else if (buttonValue === "equal") {
      const result = eval(input);
      const roundedResult = parseFloat(result.toFixed(3));
      displayResult.innerText = roundedResult;
      displayInput.innerText = input;
      input = displayResult.innerText;
    } else if (buttonValue === "history") {
      saveToLocalStorage(displayInput.innerText, displayResult.innerText);
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
const validInput = (buttonValue, currentInput) => {
  // Zabezpečenie, aby nedochádzalo k viacnásobným desatinným bodkám
  if (
    (buttonValue === "." && currentInput.includes(".")) ||
    ((buttonValue === "*" || buttonValue === "/" || buttonValue === ".") &&
      currentInput === "") // Zabezpečenie, aby sa príklad nezačínal s * / .
  ) {
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
};

// Funkcia na kontrolu, či je znak operátor (+, -, *, /)
const isOperator = (char) => {
  return char === "+" || char === "-" || char === "*" || char === "/";
};

//Funkcia na uloženie hodnoty do local storage
const saveToLocalStorage = (key, value) => {
  localStorage.setItem(JSON.stringify(key), JSON.stringify(value));
};
