

console.log('Your Page is fully Operational')

var search = document.querySelector('.search-btn');
var temp = document.querySelector('#temp');
var tempMax = document.querySelector('#p_tempMax');
var tempMin = document.querySelector('#p_tempMin');
var sum = document.querySelector('#sum');
var local = document.querySelector('#local');
var error = document.querySelector('.error');
var hideTable = document.querySelector('.table');
var hideMinMax = document.querySelector('#mintainer')



search.addEventListener('click', () => {
    var location = document.querySelector('.search-field');
    location = location.value;
    if (location === '') {
        alert('Please Insert Location');
    } else {
        forecastinit(location);
    }

});

forecastinit = function (location) {
    fetch('/weather?address=' + location).then(response => {
        response.json().then((data) => {
            if (data.error) {
                hideTable.classList.toggle('table-hide');
                hideMinMax.classList.toggle('.min-max');
                return error.textContent = data.error;

            }
            error.textContent = ""
            hideMinMax.classList.toggle('min-max');
            hideTable.classList.toggle('table-hide');
            temp.textContent = data.forcast.temperature;
            sum.textContent = data.forcast.summary;
            tempMax.textContent = data.forcast.temperatureMax;
            tempMin.textContent = data.forcast.temperatureMin;
            local.textContent = data.location;
        })
    });
};
