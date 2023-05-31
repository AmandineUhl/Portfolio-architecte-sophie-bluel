const butonConnect = document.querySelector('#submit');
    butonConnect.addEventListener('click', function(event){
        event.preventDefault();
   

const user = {
    email : document.querySelector('#email').value,
    password : document.querySelector('#password').value
};

const dataBase = JSON.stringify(user);

fetch("http://localhost:5678/api/users/login", {
    method: 'POST',
    Headers:{'Content_type': 'aplication/json'},
    body: dataBase,
})

.then(res => {
    if (res.status == 404){
        alert("unknown user")
    } else {
        return res.json()
    };
    
})
.then(responseAuth => {

    sessionStorage.setItem("token", responseAuth.token);
    sessionStorage.setItem("userId", responseAuth.userId);
    window.location.href ='./index.html';
  
})

.catch(err => console.log(err));
});





