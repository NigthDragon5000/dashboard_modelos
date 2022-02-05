
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('upload').style.display = 'none';
    document.getElementById('logout').style.display = 'none';

    document.getElementById('showdashlabel').style.fontWeight ='bold';
    document.getElementById('showuploadlabel').style.fontWeight ='normal';
    document.getElementById('showlogout').style.fontWeight ='normal';

    document.getElementById('showdashlabel').style.fontSize = '1.2em';
    document.getElementById('showuploadlabel').style.fontSize ='initial';
    document.getElementById('showlogout').style.fontSize ='initial';


/* ----------------------------Page------------------------------------*/

    // Menu Toggle
    let toggle = document.querySelector('.toggle');
    let navigation = document.querySelector('.navigation');
    let main = document.querySelector('.main');

    // Para upload
    let toggle2 = document.getElementById('toggle_upload');
    let main2 = document.getElementById('upload');

    // Para logout
    let toggle3 = document.getElementById('toggle_logout');
    let main3 = document.getElementById('logout');
        

    toggle.onclick  = function() {
        navigation.classList.toggle('active');
        main.classList.toggle('active');
        main2.classList.toggle('active');
        main3.classList.toggle('active');
    }

    toggle2.onclick  = function() {
        navigation.classList.toggle('active');
        main.classList.toggle('active');
        main2.classList.toggle('active');
        main3.classList.toggle('active');
    }

    toggle3.onclick  = function() {
        navigation.classList.toggle('active');
        main.classList.toggle('active');
        main2.classList.toggle('active');
        main3.classList.toggle('active');
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
var importancia = document.getElementById('importancia').getContext('2d');
var iv = document.getElementById('iv').getContext('2d');
var ks_line = document.getElementById('ks_graph').getContext('2d');
var corr_bar = document.getElementById('corr_bar').getContext('2d');
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
    const myChart = new Chart(importancia, {
        type: 'polarArea',
        data: {
            labels: data['variables_importantes'],
            datasets: [{
                label: 'Importancia Variables',
                data:  data['importancia'] ,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
            }]
        },
        options: {
           responsive: true,
           plugins: {
            title: {
                display: true,
                text: 'Variables mas importantes'
            }
        }
        }
    });
    return myChart;
}

async function renderGraph2(url) {

    const data = await getapi(url);
    const myChart2 = new Chart(iv, {
        type: 'bar',
        data: {
            labels: data['ivs_variables'],
            datasets: [{
                label: 'IV',
                data: data['ivs'],
                backgroundColor: [
                    'RGBA( 173, 216, 230, 1 )',
                     /*
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    */
                   /*
                    'rgba(153, 102, 255, 1)',
                    */
                    /*
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                    */
                    
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



async function renderGraphLine(url) {

    const data = await getapi(url);
    const myChart3 = new Chart(ks_line, {
        type: 'line',
        data: {
            labels: data['labels_ks_historical'],
            datasets: [{
                label: 'KS',
                data: data['ks_historical'],
                backgroundColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1,
                pointRadius: 8,
            }]
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                    }
                }]
            },
        },
        });
        return myChart3;
}



async function renderGraphHBar(url) {

    const data = await getapi(url);
    console.log(data['corr_variables'])
    const myChart4 = new Chart(corr_bar, {
        type: 'bar',
        data: {
            labels: data['corr_variables'],
            datasets: [{
                label: 'Corr',
                data: data['corr_values'],
                backgroundColor: [
                   // 'rgba(54, 162, 235, 1)'
                    'RGBA( 173, 216, 230, 1 )'
                ],
            }]
        },
        options: {
            responsive: true,
            indexAxis: 'y',
            plugins: {
                legend: {
                  position: 'right',
                },
                title: {
                  display: true,
                  text: 'Correlaciones'
                }
              }

         },
        });
        return myChart4;
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
grafico3 = renderGraphLine(api_url+'dif');
grafico4 = renderGraphHBar(api_url+'dif');

async function actualizarCards(url) {
    
    const data = await getapi(url);
    document.getElementById('ks').innerHTML= data['ks'];
    document.getElementById('gini').innerHTML= data['gini'];
    document.getElementById('variables').innerHTML= data['variables'];
    document.getElementById('tiering').innerHTML= data['tiering'];
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


function showdash(){
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('upload').style.display = 'none';
    document.getElementById('logout').style.display = 'none';

    document.getElementById('showdashlabel').style.fontWeight ='bold';
    document.getElementById('showuploadlabel').style.fontWeight ='normal';
    document.getElementById('showlogout').style.fontWeight ='normal';

    document.getElementById('showdashlabel').style.fontSize = '1.2em';
    document.getElementById('showuploadlabel').style.fontSize ='initial';
    document.getElementById('showlogout').style.fontSize ='initial';
 
};

function showupload(){
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('upload').style.display = 'block';
    document.getElementById('logout').style.display = 'none';

    document.getElementById('showdashlabel').style.fontWeight ='normal';
    document.getElementById('showuploadlabel').style.fontWeight ='bold';
    document.getElementById('showlogout').style.fontWeight ='normal';

    document.getElementById('showdashlabel').style.fontSize = 'initial';
    document.getElementById('showuploadlabel').style.fontSize ='1.2em';
    document.getElementById('showlogout').style.fontSize ='initial';


};

function showlogout(){
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('upload').style.display = 'none';
    document.getElementById('logout').style.display = 'block';


    document.getElementById('showdashlabel').style.fontWeight ='normal';
    document.getElementById('showuploadlabel').style.fontWeight ='normal';
    document.getElementById('showlogout').style.fontWeight ='bold';

    document.getElementById('showdashlabel').style.fontSize = 'initial';
    document.getElementById('showuploadlabel').style.fontSize ='initial';
    document.getElementById('showlogout').style.fontSize ='1.2em';
};

