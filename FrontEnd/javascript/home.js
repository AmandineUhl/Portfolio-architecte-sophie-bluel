async function fetchImages() {
    try {
      const response = await fetch( "http://localhost:5678/api/works");
      const data = await response.json();
  
      const gallery = document.querySelector('.gallery');
      data.forEach(image => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
  
        img.src = image.imageUrl;
        img.setAttribute("crossorigin", "anonymous");
        figcaption.textContent = image.title;
  
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
      });
    } catch (error) {
      console.log('Une erreur s\'est produite lors de la récupération des images :', error);
    }
  }
  
  fetchImages();
  


  async function filtreCategories() {
    const containerFiltres = document.querySelector('.all_filters');
  
    // Cacher la partie filtre si l'utilisateur est connecté
    const token = localStorage.getItem('token');
    if (token) {
      containerFiltres.style.display = 'none';
      return; // Sortir de la fonction si l'utilisateur est connecté
    }
  
    // Récupérer les catégories depuis l'API
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();
  
    // Fonction pour récupérer les projets filtrés
    const fetchFilteredProjects = async (category) => {
      const response = await fetch('http://localhost:5678/api/works');
      const projects = await response.json();
      return projects.filter(image => image.category.name === category.name);
    };
  

  
    // Ajouter le bouton "Tous les projets"
    const tousLesProjets = document.createElement("button");
    tousLesProjets.classList.add('filtre');
    tousLesProjets.textContent = "Tous";
    tousLesProjets.addEventListener("click", async () => {
      fetchImages();
      setActiveButton(tousLesProjets);
    });
    containerFiltres.appendChild(tousLesProjets);
  
    // Fonction pour définir le bouton actif
      const setActiveButton = (button) => {
      const buttons = containerFiltres.querySelectorAll(".filtre");
      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
    };
  
    // Ajouter les boutons de filtrage pour chaque catégorie
    categories.forEach(categorie => {
      const button = document.createElement("button");
      button.classList.add('filtre');
      button.textContent = categorie.name;
      button.addEventListener("click", async () => {
        const filteredProjects = await fetchFilteredProjects(categorie);
        fetchImages(filteredProjects);
        setActiveButton(button);
      });
      containerFiltres.appendChild(button);
    });
  
    // Activer le bouton "Tous les projets" par défaut
    setActiveButton(tousLesProjets);
  }
  
  filtreCategories();
  