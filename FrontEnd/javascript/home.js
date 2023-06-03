const fetchImages = async (category = null) => {
    try {
      const response = await fetch("http://localhost:5678/api/works");
      const data = await response.json();
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = ""; // Réinitialise le contenu de la galerie avant d'afficher les nouvelles images
  
      const filteredData = category ? data.filter(image => image.category.name === category.name) : data;
  
      filteredData.forEach(image => {
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
      console.log("Une erreur s'est produite lors de la récupération des images :", error);
    }
  };
  
  const filtreCategories = async () => {
    const containerFiltres = document.querySelector(".all_filters"); // Cacher la partie filtre si l'utilisateur est connecté
  
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();
    console.log(categories); // affiche mes catégories
  
    const tousLesProjets = createFilterButton("Tous");
    tousLesProjets.addEventListener("click", async () => {
      await fetchImages();
      setActiveButton(tousLesProjets);
    });
    containerFiltres.appendChild(tousLesProjets);
  
    const setActiveButton = button => {
      const buttons = containerFiltres.querySelectorAll(".filtre");
      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
    };
  
    categories.forEach(category => {
      const button = createFilterButton(category.name);
      button.addEventListener("click", async () => {
        await fetchImages(category);
        setActiveButton(button);
      });
      containerFiltres.appendChild(button);
    });
  
    setActiveButton(tousLesProjets);
  };
  
  const createFilterButton = text => {
    const button = document.createElement("button");
    button.classList.add("filtre");
    button.textContent = text;
    return button;
  };
  
  fetchImages();
  filtreCategories();
  