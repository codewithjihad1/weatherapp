// dom references here
const inputCityName = document.getElementById('input-address');
infoText = document.getElementById('info-text'),
locationBtn = document.getElementById('location-btn'),
userInput = document.getElementById('user-input'),
weatherDeatil = document.getElementById('weather-details'),
temperature = weatherDeatil.querySelector(".numb"),
weather = weatherDeatil.querySelector(".weather"),
loca = weatherDeatil.querySelector(".location span"),
feelsLike = weatherDeatil.querySelector(".numb-2"),
humidity = weatherDeatil.querySelector(".numb-3"),
backBtn = document.querySelector(".title h2 i"),
wIcon = document.getElementById("wIcon");
let api;


// Location btn event handlers 
locationBtn.addEventListener('click', () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser does not support geolocation!");
    }
})


// Listen keyup event on input address field
inputCityName.addEventListener('keyup', e => {
    if(e.key == 'Enter' && inputCityName.value != '') {
        requestApi(inputCityName.value);
    }
})

// Back button handlers
backBtn.addEventListener('click', () => location.reload());


// Api request funtion declaration
function requestApi(city) {
    infoText.innerText = "Getting weather details...";
    infoText.classList.add("pandding-info");
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ba99a3f576b7dc61e9fc19ce4df5dddf`;
    fetch(api)
    .then(response => response.json())
    .then(result => weatherDeatils(result))
}

// Weather details show function declaration
function weatherDeatils(info) {
    let id = info.weather[0].id;
    if(info.message) {
        infoText.innerText = info.message;
        infoText.classList.add('error-message');
    }else {
        userInput.style.display = 'none';
        weatherDeatil.style.display = 'flex';
        if(id == 800) {
            wIcon.src = "img/clear.svg";
        }else if(id >= 200 && id <= 232) {
            wIcon.src = "img/storm.svg";
        }else if(id >= 600 && id <= 622) {
            wIcon.src = "img/snow.svg";
        }else if(id >= 700 && id <= 781) {
            wIcon.src = "img/haze.svg";
        }else if((id >= 300 && id <= 321) || (id >= 500 && id <= 521)) {
            wIcon.src = "img/rain.svg";
        }
        temperature.innerText = parseInt(info.main.temp);
        weather.innerText = info.weather[0].description;
        loca.innerText = info.name;
        feelsLike.innerText = parseInt(info.main.feels_like);
        humidity.innerText = info.main.humidity;
        backBtn.classList.add("active");
    }
}

// location success function declaration
function onSuccess(success) {
    const {latitude, longitude} = success.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=ba99a3f576b7dc61e9fc19ce4df5dddf`;
    fetch(api)
    .then(response => response.json())
    .then(result => weatherDeatils(result))
}
// location failure function declaration
function onError(error) {
    infoText.innerText = error.message;
    infoText.classList.add('error-message');
}