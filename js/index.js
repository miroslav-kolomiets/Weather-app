const appSettings = {
    container: document.getElementById('container'),
    apiUrl: 'https://api.darksky.net/forecast/',
    proxy: 'https://cors-anywhere.herokuapp.com/',
    apiKey: 'c0edd7e111d453106e09ff75c17397b8',
    units: 'auto',
    defaultUnit: 'C',
    init: {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }
};

//TODO:
//1. Get city name from input, convert to latitude/longitude and send it to API. Done!
//2. URL API, put coordinates in url.
//2. Save list of visited cities, save list of favorite cities, using browser history.

const currentUserPosition = new Map();

document.getElementById('submit').addEventListener('click', function () {

    const geocoder = new google.maps.Geocoder();

    let address = document.getElementById('address').value;

    geocoder.geocode({'address': address}, function (results, status) {
        if (status === 'OK') {
            currentUserPosition.set('latitude', results[0].geometry.location.lat());
            currentUserPosition.set('longitude', results[0].geometry.location.lng());
            getTodayForecast();
            getWeekForecast();
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
});

const DOMManipulation = {
    // Create the type of element you pass in the parameters
    createNode: function (element) {
        return document.createElement(element);
    },
    // Append the second parameter(element) to the first one
    append: function (parent, el) {
        return parent.appendChild(el);
    }
};

renderHTML = () => {
    const todayForecastWrapper = document.createElement('div');
    todayForecastWrapper.className = "today-forecast-wrapper";

    const todayForecastHeaderWrapper = document.createElement('div');
    todayForecastHeaderWrapper.className = "today-forecast-header-wrapper";

    let windSpeed = DOMManipulation.createNode('div');
    windSpeed.id = 'windSpeed';
    DOMManipulation.append(todayForecastHeaderWrapper, windSpeed);

    let humidity = DOMManipulation.createNode('div');
    humidity.id = 'humidity';
    DOMManipulation.append(todayForecastHeaderWrapper, humidity);

    let dewPoint = DOMManipulation.createNode('div');
    dewPoint.id = 'dewPoint';
    DOMManipulation.append(todayForecastHeaderWrapper, dewPoint);

    let uvIndex = DOMManipulation.createNode('div');
    uvIndex.id = 'uvIndex';
    DOMManipulation.append(todayForecastHeaderWrapper, uvIndex);

    let visibility = DOMManipulation.createNode('div');
    visibility.id = 'visibility';
    DOMManipulation.append(todayForecastHeaderWrapper, visibility);

    let pressure = DOMManipulation.createNode('div');
    pressure.id = 'pressure';
    DOMManipulation.append(todayForecastHeaderWrapper, pressure);

    let icon = DOMManipulation.createNode('img');
    icon.id = 'icon';
    DOMManipulation.append(todayForecastWrapper, icon);

    let summary = DOMManipulation.createNode('h1');
    summary.id = 'summary';
    DOMManipulation.append(todayForecastWrapper, summary);

    let hourlySummary = DOMManipulation.createNode('h2');
    hourlySummary.id = 'hourlySummary';
    DOMManipulation.append(todayForecastWrapper, hourlySummary);

    DOMManipulation.append(appSettings.container, todayForecastHeaderWrapper);

    DOMManipulation.append(appSettings.container, todayForecastWrapper);

};

// chooseUnits = () => {
//     if () {
//
//     } else {
//
//     }
// };

getTodayForecast = () => {
    let latitude = currentUserPosition.get('latitude');
    let longitude = currentUserPosition.get('longitude');
    let url = `${appSettings.proxy}${appSettings.apiUrl}${appSettings.apiKey}/${latitude},${longitude}?units=${appSettings.units}`;
    fetch(url, appSettings.init)
        .then((response) => response.json())
        .then(data => {
            console.log(data);

            let windSpeed = document.getElementById('windSpeed');
            windSpeed.innerHTML = `Wind: ${data.currently.windSpeed} m/s.`;
            let humidity = document.getElementById('humidity');
            humidity.innerHTML = `Humidity: ${data.currently.humidity} %.`;
            let dewPoint = document.getElementById('dewPoint');
            dewPoint.innerHTML = `Dew Pt: ${data.currently.dewPoint}˚.`;
            let uvIndex = document.getElementById('uvIndex');
            uvIndex.innerHTML = `UV Index: ${data.currently.uvIndex}.`;
            let visibility = document.getElementById('visibility');
            visibility.innerHTML = `Visibility: ${data.currently.visibility}+ km.`;
            let pressure = document.getElementById('pressure');
            pressure.innerHTML = `Pressure: ${data.currently.pressure} hPa.`;
            let icon = document.getElementById('icon');
            icon.src = `img/${data.currently.icon}.svg`;
            let summary = document.getElementById('summary');
            summary.innerHTML = `Today in: ${data.currently.temperature} ${appSettings.defaultUnit}. ${data.currently.summary}`;
            let hourlySummary = document.getElementById('hourlySummary');
            hourlySummary.innerHTML = `${data.hourly.summary}`;

        })
        .catch(function (error) {
            console.log(error);
        });
};

getWeekForecast = () => {
    let latitude = currentUserPosition.get('latitude');
    let longitude = currentUserPosition.get('longitude');
    let url = `${appSettings.proxy}${appSettings.apiUrl}${appSettings.apiKey}/${latitude},${longitude}?units=${appSettings.units}`;
    fetch(url, appSettings.init)
        .then((response) => response.json())
        .then(function (data) {
            console.log(data);

            let dailyData = data.daily.data;
            console.log(dailyData);

            const wrapper = document.createElement('div');
            wrapper.className = "wrapper";

            dailyData.forEach(function (element) {

                let dayNumber = new Date(element.time * 1000);
                let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                let day = days[dayNumber.getDay()];

                const headerWrapperMain = document.createElement('div');
                headerWrapperMain.className = "header-wrapper accordion";

                let icon = DOMManipulation.createNode('img');
                icon.src = `img/${element.icon}.svg`;
                DOMManipulation.append(headerWrapperMain, icon);

                let header = DOMManipulation.createNode('h1');
                header.innerHTML = `${day}`;
                DOMManipulation.append(headerWrapperMain, header);

                wrapper.append(headerWrapperMain);

                const innerWrapper = document.createElement('div');
                innerWrapper.className = "panel";

                let summary = DOMManipulation.createNode('h2');
                summary.innerHTML = `${element.summary}`;
                DOMManipulation.append(innerWrapper, summary);

                let temperature = DOMManipulation.createNode('h1');
                temperature.innerHTML = `${element.temperatureMin} &#10141; ${element.temperatureMax} ${appSettings.defaultUnit}.`;
                DOMManipulation.append(innerWrapper, temperature);

                const innerWrapperMain = document.createElement('div');
                innerWrapperMain.className = "inner-wrapper";

                let windSpeed = DOMManipulation.createNode('div');
                windSpeed.innerHTML = `Wind: ${element.windSpeed} m/s.`;
                DOMManipulation.append(innerWrapperMain, windSpeed);

                let humidity = DOMManipulation.createNode('div');
                humidity.innerHTML = `Humidity: ${element.humidity} %.`;
                DOMManipulation.append(innerWrapperMain, humidity);

                let dewPoint = DOMManipulation.createNode('div');
                dewPoint.innerHTML = `Dew Pt: ${element.dewPoint}˚.`;
                DOMManipulation.append(innerWrapperMain, dewPoint);

                let uvIndex = DOMManipulation.createNode('div');
                uvIndex.innerHTML = `UV Index: ${element.uvIndex}.`;
                DOMManipulation.append(innerWrapperMain, uvIndex);

                let pressure = DOMManipulation.createNode('div');
                pressure.innerHTML = `Pressure: ${element.pressure} hPa.`;
                DOMManipulation.append(innerWrapperMain, pressure);
                innerWrapper.append(innerWrapperMain);
                wrapper.append(innerWrapper);
            });
            appSettings.container.append(wrapper);

            let acc = document.getElementsByClassName("accordion");
            let i;

            for (i = 0; i < acc.length; i++) {
                acc[i].addEventListener("click", function() {
                    this.classList.toggle("active");
                    let panel = this.nextElementSibling;
                    if (panel.style.maxHeight){
                        panel.style.maxHeight = null;
                    } else {
                        panel.style.maxHeight = panel.scrollHeight + "px";
                    }
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};

let promise = new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(pos => {
            let crd = pos.coords;
            currentUserPosition.set('latitude', crd.latitude);
            currentUserPosition.set('longitude', crd.longitude);

            resolve("result");
        }, err => console.warn(`ERROR(${err.code}): ${err.message}`),
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
});

reject = () => console.log('Error');

promise
    .then(
        result => {
            // первая функция-обработчик - запустится при вызове resolve
            renderHTML();
            getTodayForecast(); // result - аргумент resolve
        },
        error => {
            // вторая функция - запустится при вызове reject
            error(); // error - аргумент reject
        }
    ).then(
    result => {
        getWeekForecast();

    },
    error => {
        error();
    }
);