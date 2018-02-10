!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=7)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.units=t.favoriteCities=t.currentUserPosition=t.defaultCoordinates=t.appSettings=void 0;var r={container:document.getElementById("container"),apiUrl:"https://api.darksky.net/forecast/",proxy:"https://cors-anywhere.herokuapp.com/",apiKey:"c0edd7e111d453106e09ff75c17397b8",appURL:"https://iammiro.github.io/Weather-app/dist/",init:{method:"GET",mode:"cors",cache:"default"}};t.appSettings=r;var o=new Map;t.currentUserPosition=o;var i=new Map;t.favoriteCities=i;var a=new Map;t.units=a;var c=[50.4501,30.5241];t.defaultCoordinates=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getForecastFromApi=void 0;var r=n(0),o=n(4),i=function(e,t){var n="".concat(r.appSettings.proxy).concat(r.appSettings.apiUrl).concat(r.appSettings.apiKey,"/").concat(e,",").concat(t,"?units=").concat(r.units.get("units"));fetch(n,r.appSettings.init).then(function(e){return e.json()}).then(o.renderForecast).catch(function(e){console.log(e)})};t.getForecastFromApi=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.setCoordinatesToMapStorage=void 0;var r=n(0),o=function(e,t){r.currentUserPosition.set("latitude",e),r.currentUserPosition.set("longitude",t)};t.setCoordinatesToMapStorage=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.addHistoryState=void 0;var r=n(0),o=function(e,t){history.pushState("data to be passed","Weather App","".concat(r.appSettings.appURL,"?lat=").concat(e,"&lang=").concat(t))};t.addHistoryState=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.renderForecast=t.renderForecastItem=t.renderForecastImgItem=void 0;var r=n(0),o=function(e,t){document.getElementById(e).src=t};t.renderForecastImgItem=o;var i=function(e,t){document.getElementById(e).innerHTML=t};t.renderForecastItem=i;var a=function(e){e.daily.data.forEach(function(e,t){var n=new Date(1e3*e.time),a=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],c=a[n.getDay()];o("icon-".concat(t),"".concat(r.appSettings.appURL,"/img/").concat(e.icon,".svg")),i("header-".concat(t),"".concat(c)),i("under-header-".concat(t),"&#9790; ".concat(Math.round(e.temperatureMin),"˚ &#8594; &#9788; ").concat(Math.round(e.temperatureMax),"˚ ").concat(r.units.get("temperature"),".")),i("summary-".concat(t),"".concat(e.summary)),i("temperature-".concat(t),"".concat(Math.round(e.temperatureMin),"˚ &#10141; ").concat(Math.round(e.temperatureMax),"˚ ").concat(r.units.get("temperature"),".")),i("windSpeed-".concat(t),"Wind:<br><br> ".concat(Math.round(e.windSpeed)," ").concat(r.units.get("speed"))),i("humidity-".concat(t),"Humidity:<br><br> ".concat(Math.round(e.humidity)," %")),i("dewPoint-".concat(t),"Dew Pt:<br><br> ".concat(Math.round(e.dewPoint),"˚")),i("uvIndex-".concat(t),"UV Index:<br><br> ".concat(Math.round(e.uvIndex))),i("pressure-".concat(t),"Pressure:<br><br> ".concat(Math.round(e.pressure)," hPa"))})};t.renderForecast=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createForecastTemplate=t.createRecentlyViewedCitiesBlockItem=void 0;var r=n(0),o=n(4),i=function(e){a(document.getElementById("recently-viewed-cities-block"),"div","".concat(e)),(0,o.renderForecastItem)("".concat(e),"".concat(e))};t.createRecentlyViewedCitiesBlockItem=i;var a=function(e,t,n,r){var o=document.createElement(t);o.id=n,o.classList=r,e.appendChild(o)},c=function(){var e=document.createElement("div");e.id="forecast-wrapper";for(var t=0;t<8;t++){var n=document.createElement("section");n.className="individual-day-forecast-wrapper";var o=document.createElement("section");o.className="individual-day-forecast-footer-wrapper",a(n,"div","header-".concat(t),"forecast-header"),a(n,"img","icon-".concat(t),"forecast-icon"),a(n,"div","under-header-".concat(t),"forecast-day-temperature"),a(n,"div","summary-".concat(t),"forecast-summary"),a(n,"div","temperature-".concat(t),"forecast-temperature"),a(o,"div","windSpeed-".concat(t),"forecast-wind-speed forecast-item"),a(o,"div","humidity-".concat(t),"forecast-humidity forecast-item"),a(o,"div","dewPoint-".concat(t),"forecast-dew-point forecast-item"),a(o,"div","uvIndex-".concat(t),"forecast-uv-index forecast-item"),a(o,"div","pressure-".concat(t),"forecast-pressure forecast-item"),n.appendChild(o),e.appendChild(n)}r.appSettings.container.appendChild(e)};t.createForecastTemplate=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getParamFromUrl=t.getCoordinatesFromUrl=void 0;var r=n(0),o=n(3),i=n(2),a=function(){var e=new URL(window.location.href),t=new URLSearchParams(e.search.slice(1));t.set("lat",r.currentUserPosition.get("latitude")),t.set("lang",r.currentUserPosition.get("longitude")),(0,o.addHistoryState)(r.currentUserPosition.get("latitude"),r.currentUserPosition.get("longitude"))};t.getCoordinatesFromUrl=a;var c=function(){var e=new URL(window.location.href),t=e.searchParams.get("lat"),n=e.searchParams.get("lang");t&&n?(0,i.setCoordinatesToMapStorage)(t,n):((0,i.setCoordinatesToMapStorage)(r.defaultCoordinates[0],r.defaultCoordinates[1]),(0,o.addHistoryState)(r.currentUserPosition.get("latitude"),r.currentUserPosition.get("longitude")))};t.getParamFromUrl=c},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=(r(n(8)),r(n(9)),n(22)),i=n(1),a=n(23),c=n(6),s=n(0),u=n(25),d=n(5),l=document.getElementById("currentPos"),p=document.getElementById("submit"),g=document.getElementById("address");window.onpopstate=function(){(0,c.getParamFromUrl)(),(0,i.getForecastFromApi)(s.currentUserPosition.get("latitude"),s.currentUserPosition.get("longitude"))},l.addEventListener("click",o.getCurrentUserPosition),p.addEventListener("click",a.handlingUserInput),g.addEventListener("keyup",function(e){13===e.which&&(0,a.handlingUserInput)()});!function(){(0,u.setUnits)("si"),(0,c.getParamFromUrl)(),(0,d.createForecastTemplate)(),(0,i.getForecastFromApi)(s.currentUserPosition.get("latitude"),s.currentUserPosition.get("longitude")),(0,c.getParamFromUrl)()}()},function(e,t){},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"ClearDay",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"ClearNight",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(t,"Cloudy",{enumerable:!0,get:function(){return a.default}}),Object.defineProperty(t,"Target",{enumerable:!0,get:function(){return c.default}}),Object.defineProperty(t,"Fog",{enumerable:!0,get:function(){return s.default}}),Object.defineProperty(t,"Magnifier",{enumerable:!0,get:function(){return u.default}}),Object.defineProperty(t,"PartyCloudyDay",{enumerable:!0,get:function(){return d.default}}),Object.defineProperty(t,"PartyCloudyNight",{enumerable:!0,get:function(){return l.default}}),Object.defineProperty(t,"Rain",{enumerable:!0,get:function(){return p.default}}),Object.defineProperty(t,"Sleet",{enumerable:!0,get:function(){return g.default}}),Object.defineProperty(t,"Snow",{enumerable:!0,get:function(){return f.default}}),Object.defineProperty(t,"Wing",{enumerable:!0,get:function(){return m.default}});var o=r(n(10)),i=r(n(11)),a=r(n(12)),c=r(n(13)),s=r(n(14)),u=r(n(15)),d=r(n(16)),l=r(n(17)),p=r(n(18)),g=r(n(19)),f=r(n(20)),m=r(n(21))},function(e,t,n){e.exports=n.p+"img/clear-day.svg"},function(e,t,n){e.exports=n.p+"img/clear-night.svg"},function(e,t,n){e.exports=n.p+"img/cloudy.svg"},function(e,t,n){e.exports=n.p+"img/cross-shaped-target.svg"},function(e,t,n){e.exports=n.p+"img/fog.svg"},function(e,t,n){e.exports=n.p+"img/magnifier.svg"},function(e,t,n){e.exports=n.p+"img/partly-cloudy-day.svg"},function(e,t,n){e.exports=n.p+"img/partly-cloudy-night.svg"},function(e,t,n){e.exports=n.p+"img/rain.svg"},function(e,t,n){e.exports=n.p+"img/sleet.svg"},function(e,t,n){e.exports=n.p+"img/snow.svg"},function(e,t,n){e.exports=n.p+"img/wind.svg"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getCurrentUserPosition=void 0;var r=n(2),o=n(3),i=n(1),a=function(){navigator.geolocation.getCurrentPosition(function(e){var t=e.coords;(0,r.setCoordinatesToMapStorage)(t.latitude,t.longitude),(0,o.addHistoryState)(t.latitude,t.longitude),(0,i.getForecastFromApi)(t.latitude,t.longitude)},function(e){return console.warn("ERROR(".concat(e.code,"): ").concat(e.message))},{enableHighAccuracy:!0,timeout:5e3,maximumAge:0})};t.getCurrentUserPosition=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.handlingUserInput=void 0;var r=n(1),o=n(24),i=n(2),a=n(6),c=n(0),s=function(){var e=new google.maps.Geocoder,t=document.getElementById("address").value;e.geocode({address:t},function(e,t){"OK"===t?((0,i.setCoordinatesToMapStorage)(e[0].geometry.location.lat(),e[0].geometry.location.lng()),(0,a.getCoordinatesFromUrl)(),(0,o.setCityToRecentlyViewedCities)(c.currentUserPosition.get("latitude"),c.currentUserPosition.get("longitude")),(0,r.getForecastFromApi)(c.currentUserPosition.get("latitude"),c.currentUserPosition.get("longitude")),(0,a.getParamFromUrl)()):alert("Geocode was not successful for the following reason: "+t)})};t.handlingUserInput=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.setCityToRecentlyViewedCities=void 0;var r=n(0),o=n(3),i=n(1),a=n(5),c=n(2),s=function(e,t){var n=document.getElementById("address").value;r.favoriteCities.set("".concat(n),[e,t]);var s=r.favoriteCities.get("".concat(n)),u=s[0],d=s[1];(0,a.createRecentlyViewedCitiesBlockItem)(n),document.getElementById("current-city").innerText=n,document.getElementById("".concat(n)).addEventListener("click",function(){(0,c.setCoordinatesToMapStorage)(u,d),(0,o.addHistoryState)(u,d),(0,i.getForecastFromApi)(r.currentUserPosition.get("latitude"),r.currentUserPosition.get("longitude"))})};t.setCityToRecentlyViewedCities=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.setUnits=void 0;var r=n(1),o=n(0),i=function(e){"si"===e?(o.units.set("units","si"),o.units.set("temperature","C"),o.units.set("speed","m/s"),o.units.set("visibility","km")):"us"===e&&(o.units.set("units","us"),o.units.set("temperature","F"),o.units.set("speed","mph"),o.units.set("visibility","mi"))};t.setUnits=i,document.getElementById("us-unit").addEventListener("click",function(){i("us"),(0,r.getForecastFromApi)(o.currentUserPosition.get("latitude"),o.currentUserPosition.get("longitude"))}),document.getElementById("si-unit").addEventListener("click",function(){i("si"),(0,r.getForecastFromApi)(o.currentUserPosition.get("latitude"),o.currentUserPosition.get("longitude"))})}]);