
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('customers').style.display = 'none';

/* ----------------------------Page------------------------------------*/

    // Menu Toggle
    let toggle = document.querySelector('.toggle');
    let navigation = document.querySelector('.navigation');
    let main = document.querySelector('.main');

    // Para main customers
    let toggle2 = document.getElementById('toggle_customers');
    let main2 = document.getElementById('customers');
        

    toggle.onclick  = function() {
        navigation.classList.toggle('active');
        main.classList.toggle('active');
        main2.classList.toggle('active');
    }

    toggle2.onclick  = function() {
    navigation.classList.toggle('active');
    main.classList.toggle('active');
    main2.classList.toggle('active');
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


function sendDataToBackendAjax(dato,ruta,event) {

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
};
var dato=document.getElementById("models").value
sendDataToBackendAjax(dato,'ajax')
grafico1 =  renderGraph1(api_url+'dif');
grafico2 = renderGraph2(api_url+'dif');



async function actualizarCards(url) {
    
    const data = await getapi(url);
    document.getElementById('dv').innerHTML= data['dailyViews'];
    document.getElementById('sales').innerHTML= data['sales'];
    document.getElementById('comments').innerHTML= data['comments'];
    document.getElementById('earn').innerHTML= data['earning'];
}

actualizarCards(api_url+'dif');

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
    actualizarCards(api_url+'dif');
};


// Funcion de cambio de Pagina
showdash_= true;
console.log(showdash_)

function showdash(){
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('customers').style.display = 'none';
};

function showcustomer(){
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('customers').style.display = 'block';
};
