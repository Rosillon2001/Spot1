window.onload = datos;

function datos(){
    fetch('/user/data',{
        method: 'GET'
    }).then(response=> response.json())
    
    .then(data=>{
        console.log('Datos del usuario',data);
        console.log(data.userData.username);
        console.log(data.userData.password);
        console.log(data.userData.type);
        navUser(data.userData.username, data.userData._id);
    })
    .catch(error =>console.log('ERROR', error));
}

function navUser(username, id){
    var tag = document.getElementById('username');
    var icon = document.getElementById('userIcon');
    icon.setAttribute('href',`/user/mngmnt/${id}`);
    tag.innerHTML=username;
}
