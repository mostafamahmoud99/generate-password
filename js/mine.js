const lengthSlider = document.querySelector(".pass-length input"),
  options = document.querySelectorAll(".option input"),
  passIndicator = document.querySelector(".pass-indicator"),
  copy = document.querySelector(".input-box span"),
  inputBox = document.querySelector(".input-box input"),
  generateBtn = document.querySelector(".generate-btn");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "abcdefghijklmnopqrstuvwxyz".toUpperCase(),
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~",
};

updateSlider();
function updateSlider() {
  document.querySelector(".pass-length .detalis span").innerHTML =
    lengthSlider.value;
  generatePassword();
  updatePassIndicator();
}

function updatePassIndicator() {
  passIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";
}

function generatePassword() {
  let staticPassword = "",
    randomPass = "",
    excludeDuplicute = false;
  passLength = lengthSlider.value;
  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        staticPassword += characters[option.id];
      } else if (option.id == "spaces") {
        staticPassword += `  ${staticPassword}  `;
      } else {
        excludeDuplicute = true;
      }
    }
  });

  for (let i = 0; i < passLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicute) {
      !randomPass.includes(randomChar) || randomChar == " "
        ? (randomPass += randomChar)
        : i--;
    } else {
      randomPass += randomChar;
    }
  }
  inputBox.value = randomPass;
}

function copyPassword() {
  navigator.clipboard.writeText(inputBox.value);
  copy.innerText = "check";
  setTimeout(() => {
    copy.innerText = "copy_all";
  }, 1500);
}

copy.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
