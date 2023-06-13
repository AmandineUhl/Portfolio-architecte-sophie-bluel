function modal1() {
  const modal1 = document.getElementById("modal1");
  const main = document.querySelector("#main_modal");
  const accessModale = document.getElementById("boutonModif");
  const modalClosed = document.getElementById("nav_closed");
  const nextModale = document.getElementById("add_pictures");
  const works = document.getElementById("works");

  // Gestion de la navigation

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

  nextModale.addEventListener("click", () => {
    modal2();
  });

  // Affichage de la galerie

  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((datas) => {
      works.innerHTML = "";
      datas.forEach((data) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        img.src = data.imageUrl;
        figcaption.textContent = "éditer";

        figure.appendChild(img);
        figure.appendChild(figcaption);
        works.appendChild(figure);

        const deleteIcon = document.createElement("i");
        deleteIcon.className = "fa-solid fa-trash-can";
        figure.appendChild(deleteIcon);

        works.appendChild(figure);
        

        //supression image par image

        deleteIcon.addEventListener("click", () => {
          const imageId = datas.id;
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
              }
            })
            .catch((error) => {
              console.error(
                "Erreur lors de la suppression de l'image :",
                error
              );
            });
        });

        //supression de toute la galerie

        const allSupprime = document.getElementById("all_supprime");

        allSupprime.addEventListener("click", () => {
          const imageId = datas.id;
          const token = sessionStorage.getItem("token");

          fetch(`http://localhost:5678/api/works/${imageId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              if (response.ok) {
                works.innerHTML = "";
              }
            })
            .catch((error) => {
              console.error(
                "Erreur lors de la suppression de la galerie :",
                error
              );
            });
        });
      });
    });
}

modal1();

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
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      modal2.setAttribute("aria-hidden", "true");
      main.setAttribute("aria-hidden", "true");
    }
  });

  navPreview.addEventListener("click", () => {
    modal2.setAttribute("aria-hidden", "true");
    modal1.setAttribute("aria-hidden", "false");
  });
}

//preview 

const imageInput = document.getElementById('input-photo');
const imagePreviewContainer = document.querySelector('.window_add');

imageInput.addEventListener('change', () => {
  if (imageInput.files && imageInput.files[0]) {
    const file = imageInput.files[0];
    const maxSizeInBytes = 4 * 1024 * 1024; // 4 Mo

    if (file.size > maxSizeInBytes) {
      alert("L'image ne doit pas dépasser 4 Mo.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imgElement = document.createElement('img');
      imgElement.src = e.target.result;
      imagePreviewContainer.classList.remove('hidden');
      imagePreviewContainer.appendChild(imgElement);
    };

    reader.readAsDataURL(file);
  }
});

