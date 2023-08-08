const buttons = document.querySelectorAll(".container button");
const displayInput = document.querySelector(".display");
const displayResult = document.querySelector(".result");
const historyRecords = document.querySelector(".historyRecords");
const historyRecordsBackground = document.querySelector(
  ".historyRecordsBackground"
);
const clearHistoryButton = document.querySelector(".clearHistoryRecordsButton");
const toggleHistory = document.querySelector(".showHistory");
const history = document.querySelector(".history");

let input = "";
clearHistoryButton.addEventListener("click", () => {
  // Po kliknutí na tlačidlo clear, sa mi vyaže localStorage ale aj
  localStorage.clear();
  historyRecords.innerHTML = "";
});

toggleHistory.addEventListener("click", () => {
  historyRecordsBackground.classList.toggle("toggleShow");
});

//Funkcia na uloženie hodnoty do local storage
const saveToLocalStorage = (key, value) => {
  const savedKey = JSON.stringify(key);
  const savedValue = JSON.stringify(value);
  localStorage.setItem(savedKey, savedValue);
};

const addToHistory = (key, value) => {
  const newRecordToHistory = document.createElement("p");
  newRecordToHistory.textContent = `${key} = ${value}`;
  historyRecords.appendChild(newRecordToHistory);
};

document.addEventListener("DOMContentLoaded", () => {
  const storedPriklad = localStorage.getItem("storedPriklad");
  const storedVysledok = localStorage.getItem("storedVysledok");
  if (storedPriklad && storedVysledok) {
    addToHistory(storedPriklad, storedVysledok);
  }
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
      saveToLocalStorage(displayInput.textContent, displayResult.textContent);
      addToHistory(displayInput.textContent, displayResult.textContent);
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
