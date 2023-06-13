const buttonConnect = document.querySelector('#submit');

buttonConnect.addEventListener('click', async (event) => {
  event.preventDefault();

  const user = {
    email: document.querySelector('#email').value,
    password: document.querySelector('#password').value
  };

  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userId", data.userId);
      window.location.href = './index.html';
    } else if (response.status === 401 || response.status === 404) {
      const errorMessage = await response.json();
      console.log(errorMessage);
      alert("User not found");
    }
  } catch (error) {
    console.error(error);
  }
});
