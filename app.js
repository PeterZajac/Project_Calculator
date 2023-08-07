const buttons = document.querySelectorAll("button");
const displayInput = document.querySelector(".display");
const displayResult = document.querySelector(".result");

let input = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonValue = button.value;

    if (buttonValue === "clear") {
      input = "";
      displayInput.innerText = " ";
      displayResult.innerText = "  ";
    } else if (buttonValue === "equal") {
      const result = eval(input);
      const roundedResult = parseFloat(result.toFixed(3));
      displayResult.innerText = roundedResult;
      displayInput.innerText = " ";
      input = displayResult.innerText;
    } else {
      input += buttonValue;
      displayInput.innerText = input;
    }
  });
});

// if (
//   displayInput.innerText === "+" ||
//   displayInput.innerText === "-" ||
//   displayInput.innerText === "*" ||
//   displayInput.innerText === "/"
// ) {
//   displayInput.classList.add("operator");
// } else {
//   displayInput.classList.remove("operator");
// }
