window.onload = datos;

function datos(){
    fetch('/user/data',{
        method: 'GET'
    }).then(response=> response.json())
    
    .then(data=>{
        console.log('Datos del usuario',data);
    })
    .catch(error =>console.log('ERROR', error));
}