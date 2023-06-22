// Fonction pour récupérer les images depuis l'API en utilisant une catégorie facultative
const fetchImages = async (category = null) => {
  try {
    // Appel à l'API pour récupérer les données des images
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();

    // Sélection de l'élément HTML qui contiendra la galerie d'images
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""; // Réinitialisation de la galerie

    // Filtrage des données en fonction de la catégorie sélectionnée (si elle existe)
    const filteredData = category
      ? data.filter((image) => image.category.name === category.name)
      : data;

    // Parcours des données filtrées pour créer les éléments HTML correspondants
    filteredData.forEach((image) => {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");

      img.src = image.imageUrl;
      figcaption.textContent = image.title;

      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
    });
  } catch (error) {
    console.log(
      "Une erreur s'est produite lors de la récupération des images :",
      error
    );
  }
};

// Fonction pour créer un bouton de filtre
const createFilterButton = (text) => {
  const button = document.createElement("button");
  button.classList.add("filtre");
  button.textContent = text;

  return button;
};

// Fonction pour gérer les catégories de filtres
const filtreCategories = async () => {
  const containerFiltres = document.querySelector(".all_filters");

  // Appel à l'API pour récupérer les catégories
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();

  // Création du bouton "Tous" pour afficher toutes les images
  const allProjects = createFilterButton("Tous");
  allProjects.addEventListener("click", async () => {
    await fetchImages();
    setActiveButton(allProjects);
  });
  containerFiltres.appendChild(allProjects);

  // Fonction pour définir le bouton actif
  const setActiveButton = (button) => {
    const buttons = containerFiltres.querySelectorAll(".filtre");
    buttons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  };

  // Création des boutons de filtre pour chaque catégorie
  categories.forEach((category) => {
    const button = createFilterButton(category.name);
    button.addEventListener("click", async () => {
      await fetchImages(category);
      setActiveButton(button);
    });
    containerFiltres.appendChild(button);
  });

  setActiveButton(allProjects); // Définition du bouton "Tous" comme actif par défaut
};

// Appel des fonctions pour afficher la galerie d'images et gérer les catégories de filtres
fetchImages();
filtreCategories();

// Gestion du login/logout

const token = sessionStorage.getItem("token");
const containerFiltres = document.querySelector(".all_filters");
const sectionHeader = document.querySelector("header");
const sectionPortfolio = document.querySelector("#portfolio H2");
const changeLog = document.querySelector(".login");

// Affichage/masquage des filtres en fonction de la présence du token
containerFiltres.style.display = token ? "none" : "block";

// Modification du texte du bouton de login/logout en fonction de la présence du token
changeLog.innerText = token ? "logout" : "login";

if (token) {
  // Création des éléments de l'en-tête pour le mode édition
  const header = document.createElement("div");
  header.id = "headerLogin";

  const texteHeader = document.createElement("p");
  texteHeader.id = "boutonEdit";
  texteHeader.innerHTML =
    '<i class="fa-solid fa-pen-to-square"></i>Mode édition';

  const boutonHeader = document.createElement("button");
  boutonHeader.innerHTML = "Publier les changements";

  sectionHeader.prepend(header);
  header.appendChild(texteHeader);
  header.appendChild(boutonHeader);

  // Création du bouton de modification dans la section du portfolio
  const modifMode = document.createElement("p");
  modifMode.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>Modifier';
  modifMode.id = "boutonModif";
  sectionPortfolio.appendChild(modifMode);

  sectionHeader.style.margin = "0";
}

// Gestion de l'événement click sur le bouton de login/logout
changeLog.addEventListener("click", () => {
  if (token) {
    sessionStorage.removeItem("token"); // Suppression du token de session lors du logout
  }
});
