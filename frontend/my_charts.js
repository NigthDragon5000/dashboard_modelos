
/* ----------------------------Page------------------------------------*/

    // Menu Toggle
    let toggle = document.querySelector('.toggle');
    let navigation = document.querySelector('.navigation');
    let main = document.querySelector('.main');

    toggle.onclick  = function() {
        navigation.classList.toggle('active');
        main.classList.toggle('active');
    }



    //Navigation
    let list=document.querySelectorAll('.navigation li');
    function activateLink(){
        list.forEach((item) =>
        item.classList.remove('hovered'));
        this.classList.add('hovered');
    }
    list.forEach((item) =>
    item.addEventListener('mouseover',activateLink));

    // Lista de modelos
    function generarListaModelos() {
 
        var values = ["Peque3", "Peque2", "Micro", "Consumo","Admi20M"];
     
        var select = document.createElement("select");
        select.name = "models";
        select.id = "models"
     
        for (const val of values)
        {
            var option = document.createElement("option");
            option.value = val;
            option.text = val.charAt(0).toUpperCase() + val.slice(1);
            select.appendChild(option);
        }
     
        var label = document.createElement("label");
        label.innerHTML = "Selecciona el modelo: "
        label.htmlFor = "models";
     
        document.getElementById("listamodelos").appendChild(label).appendChild(select);
    }


/* ----------------------------Graph------------------------------------*/


// api url
var ctx = document.getElementById('myChart').getContext('2d');
var earning = document.getElementById('earning').getContext('2d');
const api_url =   "http://192.168.1.131:5000/";
  
// Defining async function
async function getapi(url) {
    // Storing response
    const response = await fetch(url);
    // Storing data in form of JSON
    var data = await response.json();
    return data;
    //console.log(data);
}


// Calling that async function
 async function renderGraph1(url) {
    
    const data = await getapi(url);
    const myChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: ['Facebook','YouTube','Amazon'],
            datasets: [{
                label: 'Traffic Source',
                data:  data['traffic'] ,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
            }]
        },
        options: {
           responsive: true,
        }
    });
    return myChart;
}

async function renderGraph2(url) {

 
    const data = await getapi(url);
    const myChart2 = new Chart(earning, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June','July','August','September',
        'October','November','December'],
            datasets: [{
                label: 'Earning',
                data: data['earnings'],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
        }
        });
        return myChart2;
}

/*                             Proceso Principal                                      */

generarListaModelos()
/*
var modelo=document.getElementById("models").value
modelo = api_url+modelo
modelo = modelo.toLowerCase()
*/

//grafico1 =  renderGraph1(modelo);
//grafico2 =  renderGraph2(modelo);

/*
document.getElementById("models").onchange = function()
{
    var modelo = this.value;
    modelo = api_url+modelo
    modelo = modelo.toLowerCase()

     
    grafico1.then(function(result1) {
        result1.destroy()// "Some User token"
    })

    grafico2.then(function(result2) {
        result2.destroy()// "Some User token"
    })

    console.log(modelo);
    grafico1=renderGraph1(modelo);
    grafico2=renderGraph2(modelo);
};
*/

/*

apis= api_url+'hello'
var headers = {}
fetch(apis, {
    method : "GET",
    mode: 'cors',
    headers: headers,
    data:"hola"
})
.then((response) => {
    if (!response.ok) {
        throw new Error(response.error)
    }
    return response.json();
})
.then(data => {
    document.getElementById('messages').value = data.messages;
})
.catch(function(error) {
    document.getElementById('messages').value = error;
});


*/

function sendDataToBackendAjax(dato,ruta,event) {

    // create own form in memory
    //const formData = new FormData();

    // set values in this form
    //formData.append("I want to send this to backend");
    formData = [dato]

    fetch(api_url+"ajax", {
        method: "POST",
        async: false,
        body: formData,
        mode: 'cors',
        //headers: {'Content-Type': 'application/json'},
        //body: JSON.stringify(formData)
    })
    .then(function(response){
        data = response.json();  // get result from server as JSON
        //alert(data);
        return data; 
    })
    
    .then(function(data){ 
        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    //event.preventDefault(); // don't send in normal way and don't reload page
}

/*
 function mm(){
    //const data = await getapi(api_url+'dif');
    //console.log(data);    
    grafico1 =  renderGraph1(api_url+'dif');
    grafico2 = renderGraph2(api_url+'dif');
    return [grafico1,grafico2];
}
*/

var dato=document.getElementById("models").value
sendDataToBackendAjax(dato,'ajax')
grafico1 =  renderGraph1(api_url+'dif');
grafico2 = renderGraph2(api_url+'dif');

console.log(grafico1)

document.getElementById("models").onchange = function()
{
    var dato = this.value;
    sendDataToBackendAjax(dato,'ajax');
    grafico1.then(function(result1) {
        result1.destroy()// "Some User token"
    })

    grafico2.then(function(result2) {
        result2.destroy()// "Some User token"
    })
    
    grafico1 =  renderGraph1(api_url+'dif');
    grafico2 = renderGraph2(api_url+'dif');
};

