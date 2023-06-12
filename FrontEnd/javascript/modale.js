
function modal1() {
const modal1 = document.getElementById("modal1");
const accessModale = document.getElementById("boutonModif");
const modalClosed = document.getElementById("nav_closed");
const nextModale = document.getElementById("add_pictures");
const works = document.getElementById("works");



accessModale.addEventListener('click', () => {
  modal1.setAttribute("aria-hidden", "false");
});

modalClosed.addEventListener('click', () => {
  modal1.setAttribute("aria-hidden", "true");
});

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    modal1.setAttribute("aria-hidden", "true");
  }
});


nextModale.addEventListener('click',() => {
  modal2()
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

modal1();

function modal2() {

  const modal1 = document.getElementById("modal1");
  const modal2 = document.getElementById("modal2");
  const modalClosed = document.getElementById("nav_closed2");
  const navPreview = document.getElementById("nav_previewsly");

  modal1.setAttribute("aria-hidden", "true");
  modal2.setAttribute("aria-hidden", "false");


  modalClosed.addEventListener('click', () => {
    modal2.setAttribute("aria-hidden", "true");
  });
  
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      modal2.setAttribute("aria-hidden", "true");
    }
  });

  navPreview.addEventListener('click', () => {
    modal2.setAttribute("aria-hidden", "true");
    modal1.setAttribute("aria-hidden", "false");
  });
}