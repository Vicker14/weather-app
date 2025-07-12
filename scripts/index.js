const container = document.querySelector('.container');
const locationInfo = document.querySelector('#target-info')
const form = document.querySelector('form');
const input = document.querySelector('form input');
const currentLocationButton = document.querySelector('.current-location');
const changeLocationButton = document.querySelector('#change-location')
const loadingIcon = document.querySelector('#loading-ico');
let targetLocation;

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

    

    fetch();

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