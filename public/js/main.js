

console.log('Your Page is fully Operational')

var search = document.querySelector('.search-btn');
var temp = document.querySelector('#temp');
var sum = document.querySelector('#sum');
var local = document.querySelector('#local');
var error = document.querySelector('.error');
var hideTable = document.querySelector('.table');


search.addEventListener('click',()=>{
    var location = document.querySelector('.search-field');
    location = location.value;
    if(location === ''){alert('Please Insert Location');
    }else {
    forecastinit(location);}
    
});

forecastinit = function(location) {
fetch('http://localhost:3000/weather?address='+location).then(response=>{
    response.json().then((data)=>{
    if(data.error){
    hideTable.classList.toggle('table-hide');
    return error.textContent = data.error;
    
        }
    error.textContent = ""
    hideTable.classList.toggle('table-hide');
    temp.textContent = data.forcast.temperature;
    sum.textContent = data.forcast.summary;
    local.textContent = data.location;
        })
});
};
