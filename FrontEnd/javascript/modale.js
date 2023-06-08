
function modale1() {
const modale = document.getElementById("modale");
const accessModale = document.getElementById("boutonModif");
const modalClosed = document.getElementById("nav_closed");
const nextModale = document.getElementById("add_pictures");
const works = document.getElementById("works");



accessModale.addEventListener('click', () => {
  modale.style.display = "flex";
});

modalClosed.addEventListener('click', () => {
  modale.style.display = "none";
});
//ajouter en dehors de la modale


nextModale.addEventListener('click',() => {
  //modal2()
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

