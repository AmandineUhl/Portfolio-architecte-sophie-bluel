// Fonction pour afficher la modale
function modalDelete() {
  const modalDeleteImg = document.getElementById("modal_delete");
  const modalAddImg = document.getElementById("modal_add");
  const main = document.querySelector("#main_modal");
  const accessModale = document.getElementById("boutonModif");
  const modalClosed = document.getElementById("nav_closed");
  const nextModal = document.getElementById("add_pictures");

  function showModal() {
    modalDeleteImg.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "false");
  }

  function hideModal() {
    modalDeleteImg.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");
  }

  accessModale.addEventListener("click", showModal);
  modalClosed.addEventListener("click", hideModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideModal();
      
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target === main) {
      hideModal();
      modalAddImg.setAttribute("aria-hidden", "true");
    }
  });

  nextModal.addEventListener("click", modalAdd);

  chargeImageModal();
}

modalDelete();

// Fonction pour charger les images de la galerie
function chargeImageModal() {
  const works = document.getElementById("works");
  works.innerHTML = "";

  fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        const deleteIcon = document.createElement("i");
        const moveIcon = document.createElement("i");

        img.src = item.imageUrl;
        figcaption.textContent = "éditer";
        deleteIcon.className = "fa-solid fa-trash-can delete_icon";

        moveIcon.className = "fa-solid fa-arrows-up-down-left-right move_icon";

        figure.appendChild(img);
        figure.appendChild(figcaption);
        figure.appendChild(deleteIcon);
        figure.appendChild(moveIcon);
        works.appendChild(figure);

        img.addEventListener("mouseover", () => {
          moveIcon.style.opacity = "1";
        });

        img.addEventListener("mouseout", () => {
          moveIcon.style.opacity = "0";
        });

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
            .then(response => {
              if (response.ok) {
                figure.remove();
                fetchImages();
              }
            })
            .catch(error => {
              console.error(
                "Erreur lors de la suppression de l'image :",
                error
              );
            });
        });
      });
    })
    .catch(error => {
      console.error("Erreur lors du chargement des images :", error);
    });
}

// Fonction pour afficher le formulaire d'ajout d'images
function modalAdd() {
  const modalDeleteImg = document.getElementById("modal_delete");
  const modalAddImg = document.getElementById("modal_add");
  const main = document.querySelector("#main_modal");
  const modalClosed = document.getElementById("nav_closed2");
  const navPreview = document.getElementById("nav_previewsly");

  modalDeleteImg.setAttribute("aria-hidden", "true");
  modalAddImg.setAttribute("aria-hidden", "false");

  const closeModal = () => {
    modalAddImg.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "true");
    emptyForm();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      closeModal();
      emptyForm();
    }
  };

  const switchToModalDelete = () => {
    modalAddImg.setAttribute("aria-hidden", "true");
    modalDeleteImg.setAttribute("aria-hidden", "false");
    emptyForm();
  };

  modalClosed.addEventListener("click", closeModal);
  document.addEventListener("keydown", handleKeyDown);
  navPreview.addEventListener("click", switchToModalDelete);
}

// Gestion de la prévisualisation de l'image
const imageInput = document.getElementById("input-photo");
const imagePreviewContainer = document.querySelector(".window_add");
const icon = document.querySelector(".icon");
const add = document.querySelector(".add");
const size = document.querySelector(".size");

imageInput.addEventListener("change", () => {
  if (imageInput.files && imageInput.files[0]) {
    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const imgElement = document.createElement("img");
      imgElement.src = e.target.result;
      imagePreviewContainer.classList.remove("hidden");
      imagePreviewContainer.appendChild(imgElement);
      icon.style.display = "none";
      size.style.display = "none";
      add.style.display = "none";
      buttonClean();
    };

    reader.readAsDataURL(file);
  }
});

// Appel de l'API pour récupérer les catégories
const apiCategories = async () => {
  try {
    
    await fetch("http://localhost:5678/api/categories")
      .then(response => response.json())

      .then(categoriesResponse => {
        
          categories = categoriesResponse;
      });
  } catch (error) {
    console.log("Erreur à l'affichage des catégories :", error);
  }
};

// Affichage des catégories dans le menu déroulant
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

// Validation du formulaire d'ajout

document.getElementById("buton_send").addEventListener("click", () => {
  const title = document.getElementById("input-texte").value;
  const category = document.getElementById("categorie").value;
  const image = document.getElementById("input-photo").files[0];
  const errorTitleText = document.querySelector(".error-title-form");
  const token = sessionStorage.getItem("token");

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
      .then(response => {
        if (response.ok) {
          errorTitleText.classList.remove("active");

          fetchImages();
          chargeImageModal();
          modalAdd();
          emptyForm();

          console.log("La requête a été traitée avec succès.");
        } else {
          console.error(
            "Une erreur s'est produite lors du traitement de la requête."
          );
        }
      })
      .catch(error => {
        console.error(
          "Une erreur s'est produite lors de l'envoi de la requête :",
          error
        );
      });
  }
});

// Fonction pour vider le formulaire
function emptyForm(event) {
  
  const imagePreviewContainer = document.querySelector(".window_add");
  const imgElement = imagePreviewContainer.querySelector("img");
  const cleanForm = document.getElementById("clean_form");

  icon.style.display = "flex";
  size.style.display = "flex";
  add.style.display = "flex";
  cleanForm.style.display = "none";

  if (imagePreviewContainer.contains(imgElement)) {
    imagePreviewContainer.removeChild(imgElement);
  }
  const selectCategory = document.querySelector("#categorie");
  const options = selectCategory.querySelectorAll("option");
  for (let i = 1; i < options.length; i++) {
    selectCategory.removeChild(options[i]);
  }

  const form = document.getElementById("formulaire");
  form.reset();

  changeColor();
  showCategory();
  event.preventDefault();
}

// Gestion de l'affichage du bouton de nettoyage du formulaire
function buttonClean() {
  const cleanForm = document.getElementById("clean_form");
  const imagePreviewContainer = document.querySelector(".window_add");
  const imgElement = imagePreviewContainer.querySelector("img");

  if (imgElement) {
    cleanForm.style.display = "flex";
    cleanForm.addEventListener("click", emptyForm);
  }
  showCategory();
}

//gestion du changement de couleur du bouton de validation du formulaire

const inputTexte = document.getElementById("input-texte");
const categorie = document.getElementById("categorie");
const inputPhoto = document.getElementById("input-photo");
const buttonBackground = document.getElementById("buton_send");

inputTexte.addEventListener("input", changeColor);
categorie.addEventListener("input", changeColor);
inputPhoto.addEventListener("input", changeColor);

function changeColor() {
  const imagePreviewContainer = document.querySelector(".window_add");
  const imgElement = imagePreviewContainer.querySelector("img");

  const title = inputTexte.value.trim();
  const category = categorie.value.trim();

  if (imgElement && title !== "" && category !== "") {
    buttonBackground.style.backgroundColor = "#1d6154";
    buttonBackground.style.color = "white";
  } else {
    buttonBackground.style.backgroundColor = "";
    buttonBackground.style.color = "";
  }
}
