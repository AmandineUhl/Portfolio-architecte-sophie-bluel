
// Fonction pour afficher la première modal
function modal1() {
  const modal1 = document.getElementById("modal1");
  const modale2 = document.getElementById("modal2");
  const main = document.querySelector("#main_modal");
  const accessModale = document.getElementById("boutonModif");
  const modalClosed = document.getElementById("nav_closed");
  const nextModale = document.getElementById("add_pictures");

  accessModale.addEventListener("click", () => {
    modal1.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "false");
  });

  modalClosed.addEventListener("click", () => {
    modal1.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      modal1.setAttribute("aria-hidden", "true");
      main.setAttribute("aria-hidden", "true");
    }
  });

  document.addEventListener("click", function (event) {
    if (event.target == main) {
      main.setAttribute("aria-hidden", "true");
      modale2.setAttribute("aria-hidden", "true");
    }
  });

  nextModale.addEventListener("click", () => {
    modal2();
  });

  chargeImageModal();

}

modal1();



// Fonction pour charger les images de la galerie
function chargeImageModal() {
  const works = document.getElementById("works");
  works.innerHTML = "";

  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        const deleteIcon = document.createElement("i");

        img.src = item.imageUrl;
        figcaption.textContent = "éditer";
        deleteIcon.className = "fa-solid fa-trash-can";

        figure.appendChild(img);
        figure.appendChild(figcaption);
        figure.appendChild(deleteIcon);
        works.appendChild(figure);

        deleteIcon.addEventListener("click", (event) => {
          event.preventDefault();
          const imageId = item.id;
          const token = sessionStorage.getItem("token");

          fetch(`http://localhost:5678/api/works/${imageId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              if (response.ok) {
                figure.remove();
                fetchImages();
              }
            })
            .catch((error) => {
              console.error("Erreur lors de la suppression de l'image :", error);
            });
        });
      });
    })
    .catch((error) => {
      console.error("Erreur lors du chargement des images :", error);
    });
}



function modal2() {
  const modal1 = document.getElementById("modal1");
  const modal2 = document.getElementById("modal2");
  const main = document.querySelector("#main_modal");
  const modalClosed = document.getElementById("nav_closed2");
  const navPreview = document.getElementById("nav_previewsly");

  modal1.setAttribute("aria-hidden", "true");
  modal2.setAttribute("aria-hidden", "false");

  modalClosed.addEventListener("click", () => {
    modal2.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");
    emptyForm()
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      modal2.setAttribute("aria-hidden", "true");
      main.setAttribute("aria-hidden", "true");
      emptyForm()
    }
  });

  navPreview.addEventListener("click", () => {
    modal2.setAttribute("aria-hidden", "true");
    modal1.setAttribute("aria-hidden", "false");
    emptyForm()
  });

  
}

//preview

const imageInput = document.getElementById("input-photo");
const imagePreviewContainer = document.querySelector(".window_add");
const icon = document.querySelector(".icon");
const add = document.querySelector(".add");
const size = document.querySelector(".size");

imageInput.addEventListener("change", () => {
  if (imageInput.files && imageInput.files[0]) {
    const file = imageInput.files[0];
    const maxSizeInBytes = 4 * 1024 * 1024; // 4 Mo

    if (file.size > maxSizeInBytes) {
      alert("L'image ne doit pas dépasser 4 Mo.");

      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imgElement = document.createElement("img");
      imgElement.src = e.target.result;
      imagePreviewContainer.classList.remove("hidden");
      imagePreviewContainer.appendChild(imgElement);
      icon.style.display = "none";
      size.style.display = "none";
      add.style.display = "none";

      showCategory();
    };

    reader.readAsDataURL(file);
  }
});



const apiCategories = async () => {
  
  try {
    await fetch("http://localhost:5678/api/categories")
      .then((response) => response.json())
      
      .then((categoriesResponse) => {
        categories = categoriesResponse;
      });
  } catch (error) {
    console.log("Erreur à l'affichage des catégories :", error);
  }
};

async function showCategory() {
  const selectCategory = document.querySelector("#categorie");
  const imagePreviewContainer = document.querySelector(".window_add");
  const imgElement = imagePreviewContainer.querySelector("img");

  if (imgElement) {
    try {
      await apiCategories();
      for (let category of categories) {
        let option = document.createElement("option");
        option.value = category.id;
        option.innerText = category.name;
        selectCategory.appendChild(option);
      }
    } catch (error) {
      console.log(
        "Erreur lors de la récupération des catégories de la liste d'option :",
        error
      );
    }
  }
}


// valider

document.getElementById("buton_send").addEventListener("click", function() {
  const title = document.getElementById("input-texte").value;
  const category = document.getElementById("categorie").value;
  const image = document.getElementById("input-photo").files[0];
  const errorTitleText = document.querySelector(".error-title-form");

  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", image);
  
  if (!title) {
    
    errorTitleText.classList.add("active");


  } else {
    // Sinon, effectuer la requête API
    fetch("http://localhost:5678/api/works/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
    .then((response) => {
      if (response.ok) {
        
        errorTitleText.classList.remove("active");
  

        fetchImages();
        chargeImageModal();
        modal2();
        emptyForm();
      
        console.log("La requête a été traitée avec succès.");
        
        
      } else {
        console.error("Une erreur s'est produite lors du traitement de la requête.");
      }
    })
    .catch((error) => {
      console.error("Une erreur s'est produite lors de l'envoi de la requête :", error);
    });
  }
});

function emptyForm() {
  const imagePreviewContainer = document.querySelector(".window_add");
  const imgElement = imagePreviewContainer.querySelector("img");
  imagePreviewContainer.removeChild(imgElement);

  icon.style.display = "flex";
  size.style.display = "flex";
  add.style.display = "flex";

  const selectCategory = document.querySelector("#categorie");
  while (selectCategory.firstChild) {
    selectCategory.removeChild(selectCategory.firstChild);
  }

  const form = document.getElementById("formulaire");
  form.reset();
}














  
