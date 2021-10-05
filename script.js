const btn_first = document.querySelectorAll(".side-btn");

console.log(btn_first);
console.log(apiKey)
btn_first.forEach((el) =>
  el.addEventListener("click", (e) => {
    el.classList.add("btn-color");
  })
);

//--------------------------------------------------------

//----------------------------------------------------------\
let counter = 5;
fetch(
  `https://api.nasa.gov/planetary/apod?start_date=2021-09-01&api_key=${apiKey}`
)
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
    data.slice(0, counter).forEach(renderGalaxy);
  });

function renderGalaxy(dataObject) {
  const makeEl = (e) => document.createElement(e);
  text_random = document.getElementById("body-text");
  const h2 = makeEl("h2"); // Title
  const p = makeEl("p"); // Text or Writer
  const img = makeEl("img");
  h2.textContent = dataObject.title;
  p.textContent = dataObject.explanation;
  img.src = dataObject.hdurl;
  img.style.width = "600px";
  img.style.height = "450px";
  img.style.borderRadius = "15px";
  text_random.append(img, h2, p);

  //------------------------------------
}
