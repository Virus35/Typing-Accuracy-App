const paragraph = document.querySelector(".fill-out");
let inputValue = document.querySelector("input");
let mistakes = document.querySelector(".right-mistakes");
let time = document.querySelector(".right-time");
let cpm = document.querySelector(".right-cpm");
let wpm = document.querySelector(".right-wpm");
let reset = document.querySelector(".try-again");
let count = 0;
let count1 = 0;
let count2 = 60;
let maxTime = 60;
let isTrue = true;
let intervalId;

const randomParagraphGenerator = () => {
  randomIndex = Math.floor(Math.random() * paragraphs.length);
  paragraphs[randomIndex].split("").forEach((cur_val) => {
    let newElement = document.createElement("span");
    newElement.innerHTML = cur_val;
    paragraph.append(newElement);
  });
};

const inputFocused = () => {
  document.querySelector("input").focus();
};

document.addEventListener("keydown", (e) => {
  inputFocused();
});

document.querySelector(".padding").addEventListener("click", (e) => {
  inputFocused();
});

inputValue.addEventListener("input", (e) => {
  const allCharacters = document.querySelectorAll("span");
  let typedCharacter = inputValue.value;
  if (count < allCharacters.length && count2 > 0) {
    if (isTrue) {
      intervalId = setInterval(() => {
        if (count2 > 0) {
          time.innerHTML = `${--count2}s`;
        } else {
          clearInterval(intervalId);
        }
      }, 1000);

      isTrue = false;
    }

    if (typedCharacter[count] == null) { //when the inputfield is empty, it will not gonna execute as typed character doesnt exist
      --count;
      allCharacters[count].style.color = "black";
      allCharacters[count].style.fontWeight = "normal";
      allCharacters[count].style.backgroundColor = "white";
      allCharacters[count].style.padding = "0px";
      console.log(count);
      if (allCharacters[count].classList.contains("incorrect")) {
        mistakes.innerHTML = --count1;
        allCharacters[count].classList.remove("incorrect");
      }
    } else {
      if (allCharacters[count].innerHTML == typedCharacter[count]) {
        //   console.log("correct");
        allCharacters[count].style.color = "white";
        allCharacters[count].style.fontWeight = "bolder";
        allCharacters[count].style.backgroundColor = "green";
        allCharacters[count].style.padding = "2px";
      } else {
        allCharacters[count].style.color = "white";
        allCharacters[count].style.fontWeight = "bolder";
        allCharacters[count].style.backgroundColor = "red";
        allCharacters[count].style.padding = "2px";
        allCharacters[count].classList.add("incorrect");
        mistakes.innerHTML = ++count1;
      }
      count++;
    }

    allCharacters.forEach((cur_val) => {
      cur_val.classList.remove("active");
    });
    allCharacters[count].classList.add("active");
    cpm.innerHTML = count - count1;
    let save = Math.round(((count - count1) / 5 / (maxTime - count2)) * 60);
    if (save < 0 || !save || save == Infinity || save == NaN) {
      wpm.innerHTML = 0;
    } else {
      wpm.innerHTML = save;
    }
  } else {
    inputValue.value = "";
    clearInterval(intervalId);
  }
});

reset.addEventListener("click", (e) => {
    paragraph.innerHTML="";
  randomParagraphGenerator();
  document.querySelector("span").classList.add("active");
  inputValue.value = "";
  count = 0;
  count1 = 0;
  count2 = 60;
  maxTime = 60;
  isTrue = true;
  mistakes.innerHTML=0;
  wpm.innerHTML=0;
  cpm.innerHTML=0;
  time.innerHTML=`${60}s`;
  clearInterval(intervalId);
});

randomParagraphGenerator();
document.querySelector("span").classList.add("active");
