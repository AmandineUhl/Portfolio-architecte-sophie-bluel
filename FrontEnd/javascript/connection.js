const butonConnect = document.querySelector('#submit');

butonConnect.addEventListener('click', async (event) => {
    event.preventDefault();

    const user = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
    };

    const dataBase = JSON.stringify(user);

    const successConnection = (response) => {
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem("userId", response.userId);
        window.location.href = './index.html';
    }
    
    const errorConnection = async (response) => {
        const errorMessage = await response.json();
        console.log(errorMessage);
    }

    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: dataBase,
        });

        if (response.status === 200) {
            successConnection(response);
        } else if (response.status === 401 || response.status === 404) {
            errorConnection(response);
            alert("User not find");
        }
    } catch (error) {
        console.error(error);
        
    }
});




