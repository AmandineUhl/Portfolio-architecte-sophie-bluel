
function modale1() {
const modale = document.getElementById("modale");
const modalWindow2 = getElementById("modal_window_2");
const accessModale = document.getElementById("boutonModif");
const modalClosed = document.getElementById("nav_closed");
const nextModale = document.getElementById("add_pictures");
const works = document.getElementById("works");



accessModale.addEventListener('click', () => {
  modale.setAttribute("aria-hidden", "false");
});

modalClosed.addEventListener('click', () => {
  modale.setAttribute("aria-hidden", "true");
});

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    modale.setAttribute("aria-hidden", "true");
  }
});


nextModale.addEventListener('click',() => {
  
});

fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(datas => {
    works.innerHTML = '';
    datas.forEach(data => {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");

      img.src = data.imageUrl;
      figcaption.textContent = "éditer";

      figure.appendChild(img);
      figure.appendChild(figcaption);
      works.appendChild(figure);
    });
  });

}

modale1();

function modal2() {


}