const buttonConnect = document.querySelector("#submit");
const errorMessage = document.querySelector(".error-message");

buttonConnect.addEventListener("click", async (event) => {
  event.preventDefault();

  const user = {
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
  };

  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userId", data.userId);
      window.location.href = "./index.html";
    } else {
      errorMessage.textContent = "Erreur dans l’identifiant ou le mot de passe";
      buttonConnect.classList.add("shake");

      setTimeout(() => {
        buttonConnect.classList.remove("shake");
      }, 500);
    }
  } catch (error) {
    console.error(error);
  }
});
