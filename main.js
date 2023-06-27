// async function getData() {
//   const response = await fetch("films.json");
//   const data = await response.json();
//   return data;
// }

// async function showHint(inputText) {
//   const ul = document.querySelector(".help");
//   if (inputText.length == 0 || inputText == " ") {
//     ul.innerHTML = "";
//     return;
//   }
//   inputText = inputText.toLowerCase();
//   inputText = inputText.trim();

//   const data = await getData();

//   const res = data.docs.filter((item) =>
//     item.name.toLowerCase().includes(inputText)
//   );

//   let html = ``;

//   res.forEach((item) => {
//     html += `
//       <li class="help__item">${item.name}</li>
//     `;
//   });

//   ul.innerHTML = html;
// }

// const debounce = (func, delay) => {
//   let timeoutId;
//   return (...args) => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => {
//       func.call(this, ...args);
//     }, delay);
//   };
// };

// showHintDebonced = debounce(showHint, 700);

// document.querySelector("input").addEventListener("input", (e) => {
//   showHintDebonced(e.target.value);
// });

function randNum(min, max) {
  const randNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randNum;
}

function qwe(arr) {
  let previousItem = null;

  return function () {
    if (arr.length < 2) return arr[0];

    while (true) {
      let index = randNum(0, arr.length - 1);
      let res = arr[index];
      console.log("res " + res + "; prev:" + previousItem);

      if (res != previousItem) {
        previousItem = res;
        return res;
      }
    }
  };
}

let mas = [54, 98, 12];
let zxc = qwe(mas);

document.querySelector(".btn").addEventListener("click", () => {
  // let link = document.createElement("a");
  // link.href = "qwe.html";
  // link.click();
  window.location.href = "qwe.html";
});

if (window.location.href == "") console.log("YES");
console.log(window.location.href);
