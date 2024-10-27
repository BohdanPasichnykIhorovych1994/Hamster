let hamster = document.getElementById("hamster");
let moneyDiv = document.getElementById("money");
let levelDiv = document.getElementById("level");
let passiveDiv = document.getElementById("passive");
let setupDiv = document.getElementById("setup");
let punchlineDiv = document.getElementById("punchline");

let clickCount = 0;
let money = 0;
let currentLevelIndex = 0;
let levels = [
  {
    level: 1,
    conditionMax: 5,
    passiveIncome: 1,
  },
  {
    level: 2,
    conditionMax: 20,
    passiveIncome: 2,
  },
  {
    level: 3,
    conditionMax: 35,
    passiveIncome: 3,
  },
  {
    level: 4,
    conditionMax: 55,
    passiveIncome: 4,
  },
  {
    level: 5,
    conditionMax: 70,
    passiveIncome: 5,
  },
  {
    level: 6,
    conditionMax: 100,
    passiveIncome: 6,
  },
];
function calcLevel() {
  for (let i = 0; i < levels.length; i++) {
    if (money > levels[i].conditionMax) {
      addNextLevel();
      currentLevelIndex++;
    } else {
      break;
    }
  }
}
function addNextLevel() {
  if (currentLevelIndex >= levels.length - 1) {
    console.log();
    let lastEl = levels[levels.length - 1];
    levels.push({
      level: lastEl.level + 1,
      conditionMax: (lastEl.level + 1) * lastEl.level * 15,
      passiveIncome: lastEl.passiveIncome + 1,
    });
  }
}

async function getJoke() {
  let joke = await fetch("https://official-joke-api.appspot.com/random_joke");
  let result = await joke.json();
  console.log(result);
  return result;
}
// getJoke();
// async function showJoke() {
//   let joke = await getJoke();
//   console.log(joke.setup);
// }
// Ip1bEQW8CYjXSub6geT5tG8fphcOKgo0SMY;
async function getCrypto() {
  let result = await fetch("https://jsonplaceholder.typicode.com/posts");
  result = await result.json();
  console.log(result);
  return result.slice(35, 38);
}
// getCrypto();
async function showLine() {
  let crypto = await getCrypto();
  let line = document.createElement("div");
  let lineBox = document.createElement("div");
  lineBox.classList.add("line-box");
  line.classList.add("line");
  // let index = 3;
  for (let i = 0; i < crypto.length; i++) {
    // let motherBlock = document.createElement("div");
    // motherBlock.classList.add("motherBlock");
    let block = document.createElement("span");
    // motherBlock.appendChild(block);
    block.classList.add("block12");
    block.innerText = `${crypto[i].title.split(" ")[0].toString()} : ${crypto[
      i
    ].id.toString()} `;
    line.append(block);
  }
  lineBox.append(line);
  document.body.prepend(lineBox);
  console.log(crypto);
}
showLine();
const saveData = () => {
  localStorage.setItem("money", money);
  localStorage.setItem("currentLevelIndex", currentLevelIndex);
};

const loadData = () => {
  const storedMoney = localStorage.getItem("money");
  // const storedLevelIndex = localStorage.getItem("currentLevelIndex");

  if (storedMoney) {
    moneyDiv.innerText = storedMoney.toString();
    money = +storedMoney;
    console.log(typeof storedMoney);
  }

  // if (storedLevelIndex) {
  //     currentLevelIndex = parseInt(storedLevelIndex);
  // }
  calcLevel();
  levelDiv.innerText = `Level ${levels[currentLevelIndex].level} ${money}/${levels[currentLevelIndex].conditionMax}`;
};

loadData();

hamster.addEventListener("click", async (event) => {
  clickCount++;
  if (!(clickCount % 10)) {
    console.log("ти клікнув 10 раз");
    let block = document.createElement("div");
    block.classList.add("block");
    block.style.top = event.clientY + "px";
    block.style.left = event.clientX + "px";
    document.body.append(block);

    let joke = await getJoke();

    let blockJokeSetup = document.createElement("div");
    blockJokeSetup.classList.add("blockJokeSetup");
    blockJokeSetup.style.top = event.clientY + "px";
    blockJokeSetup.style.left = event.clientX + "px";
    blockJokeSetup.innerText = joke.setup;
    document.body.append(blockJokeSetup);
    setTimeout(() => {
      block.remove();
    }, 3000);

    setTimeout(() => {
      blockJokeSetup.remove();
    }, 10000);

    setTimeout(() => {
      let blockJokePunchline = document.createElement("div");
      blockJokePunchline.classList.add("blockJokePunchline");
      blockJokePunchline.style.top = event.clientY + "px";
      blockJokePunchline.style.left = event.clientX + "px";
      blockJokePunchline.innerText = joke.punchline;
      document.body.append(blockJokePunchline);
    }, 4000);
  }
  money += 1;
  moneyDiv.innerText = money.toString();

  if (
    money >= levels[currentLevelIndex].conditionMax &&
    currentLevelIndex < levels.length - 1
  ) {
    addNextLevel();
    currentLevelIndex++;
  }

  levelDiv.innerText = `Level ${levels[currentLevelIndex].level} ${money}/${levels[currentLevelIndex].conditionMax}`;

  let block = document.createElement("div");
  block.classList.add("block");
  block.style.top = event.clientY + "px";
  block.style.left = event.clientX + "px";
  document.body.append(block);
});

let passive = () => {
  money += levels[currentLevelIndex].passiveIncome;
  passiveDiv.innerText = `+ ${levels[currentLevelIndex].passiveIncome}`;
  moneyDiv.innerText = money.toString();
  addNextLevel();

  if (
    money >= levels[currentLevelIndex].conditionMax &&
    currentLevelIndex < levels.length - 1
  ) {
    console.log(currentLevelIndex);
    console.log(levels.length - 1);
    addNextLevel();
    currentLevelIndex++;
  }

  levelDiv.innerText = `Level ${levels[currentLevelIndex].level} ${money}/${levels[currentLevelIndex].conditionMax}`;

  // saveData();
};

let pass = setInterval(passive, 2000);
window.onbeforeunload = function (e) {
  saveData();
};
