const loadingIcon = document.querySelector('#loading-ico');

const iconSet = {
    'snow' : 'img/snow.svg',
    'rain' : 'img/rain.svg',
    'fog': 'img/fog.svg',
    'wind' : 'img/wind.svg',
    'cloudy' : 'img/cloudy.svg',
    'partly-cloudy-day' : 'img/cloudy.svg',
    'partly-cloudy-night': 'img/cloudy.svg',
    'clear-day' : 'img/clear-day.svg',
    'clear-night': 'img/clear-night.svg'
}

const container = document.querySelector('.container');

const form = document.querySelector('form');
const currentLocationButton = document.querySelector('.current-location');
const input = document.querySelector('form input');

const locationInfo = document.querySelector('#location-info');
const temperatureDiv = document.querySelector('.temperature');
const changeLocationButton = document.querySelector('#change-location');
const weatherIco = document.querySelector('.weather-ico');

let targetLocation;


async function getDataObject(url) {
    const response =  await fetch(url);
    const data = await response.json();

    console.log(data.days[0]);
    return data.days[0];
}

currentLocationButton.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                targetLocation = position.coords;
                input.value = `${targetLocation.latitude}, ${targetLocation.longitude}`
            },
            () => {
                alert("We could'n get your location");
            }
        )
    } else {
        alert('Geolocalization not supported');
    }
})

form.addEventListener("submit", (e) => {
    e.preventDefault();

    form.classList.add('hidden');
    container.classList.add('hidden')
    loadingIcon.classList.remove('hidden')

    const coordinates = input.value.split(',');
    const latitude = coordinates[0];
    const longitude = coordinates[1];
    const dataUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?unitGroup=uk&include=days&key=XWKXRNAGYM298KKFAXBE6VYL2&contentType=json`

    getDataObject(dataUrl)
    .then((response) => {
        temperatureDiv.textContent = `${response.temp} ºC`;
        weatherIco = iconSet[response.icon]
    });

    setTimeout(() => {
        loadingIcon.classList.add('hidden')
        container.classList.remove('hidden');
        locationInfo.classList.remove('hidden');
    }, 1000);

})

changeLocationButton.addEventListener('click', () => {
    locationInfo.classList.add('hidden');
    input.value = "";
    form.classList.remove('hidden');
})