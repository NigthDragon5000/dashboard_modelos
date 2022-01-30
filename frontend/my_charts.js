
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


/* ----------------------------Graph------------------------------------*/


// api url
const ctx = document.getElementById('myChart').getContext('2d');
const earning = document.getElementById('earning').getContext('2d');
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
  
}

renderGraph1(api_url);
renderGraph2(api_url);



