window.onload = datos, id;

function datos(){
    fetch('/user/data',{
        method: 'GET'
    }).then(response=> response.json())
    
    .then(data=>{
        // console.log('Datos del usuario',data);
        // console.log(data.userData.username);
        // console.log(data.userData.type);
        navUser(data.userData.username, data.userData._id);
        id(data.userData._id);
    })
    .catch(error =>console.log('ERROR', error));
}


function navUser(username, id){
    var tag = document.getElementById('username');
    var icon = document.getElementById('userIcon');
    icon.setAttribute('href',`/user/mngmnt/${id}`);
    tag.innerHTML=username;
}
function id(id){
  var up = document.getElementById('up');
  up.setAttribute('value', `${id}`);
}

//funcionalidad del navbar
 var inicio = document.getElementById('inicio');
   var canciones = document.getElementById('canciones');
   var playlists = document.getElementById('playlists');


     inicio.onclick = function(){
        inicio.classList.add('active');    
      }
      canciones.onclick = function(){
        canciones.classList.add('active');    
      }
      playlists.onclick = function(){
        playlists.classList.add('active');   
      }