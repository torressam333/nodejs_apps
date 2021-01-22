const weatherForm = document.querySelector('form');
const citySearch = document.querySelector('#city');
const errorSpan = document.querySelector('.error');
const locationText = document.querySelector('.location-text');
const forecastText = document.querySelector('.forecast-text');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const city = citySearch.value;
    const url = `${window.location.origin}/weather?address=${city}`;

    fetch(url).then(res => {
       res.json().then((data) => {
           if (data.error) {
               errorSpan.innerHTML = data.error;
               locationText.innerHTML = 'Use this site to get your weather'
               forecastText.innerHTML = '';
           }else {
               locationText.innerHTML = `You searched for ${data.location}`;
               forecastText.innerHTML = data.forecast;
               errorSpan.innerHTML = '';
           }
       });
    });
});