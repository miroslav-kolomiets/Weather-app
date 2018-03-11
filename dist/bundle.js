!function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=5)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.forecast=t.favoriteCities=t.units=t.recentlyViewedCities=t.currentUserPosition=t.defaultCoordinates=t.appSettings=void 0;var i={container:document.getElementById("container"),apiUrl:"https://api.darksky.net/forecast/",proxy:"https://cors-anywhere.herokuapp.com/",apiKey:"c0edd7e111d453106e09ff75c17397b8",init:{method:"GET",mode:"cors",cache:"default"}};t.appSettings=i;var r=new URL(window.location.href);i.appURL="http://localhost:8080"===r?r.origin+"/":"https://iammiro.github.io/Weather-app/dist/";var o=new Map;t.forecast=o;var a=new Map;t.currentUserPosition=a;var s=new Map;t.recentlyViewedCities=s;var c=window.localStorage;t.favoriteCities=c;var u=new Map;t.units=u,u.set("units","si"),u.set("temperature","C"),u.set("speed","m/s"),u.set("visibility","km");var l=[50.4501,30.5241];t.defaultCoordinates=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getForecastFromApi=void 0;var i=n(0),r=n(23),o=new r.RenderTemplate,a=function(e,t){var n="".concat(i.appSettings.proxy).concat(i.appSettings.apiUrl).concat(i.appSettings.apiKey,"/").concat(e,",").concat(t,"?units=").concat(i.units.get("units"));fetch(n,i.appSettings.init).then(function(e){return e.json()}).then(function(e){return e.daily}).then(function(e){o.render(e)}).catch(function(e){console.log(e)})};t.getForecastFromApi=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.setCoordinatesToMapStorage=void 0;var i=n(0),r=function(e,t){i.currentUserPosition.set("latitude",e),i.currentUserPosition.set("longitude",t)};t.setCoordinatesToMapStorage=r},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function o(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}Object.defineProperty(t,"__esModule",{value:!0}),t.HandlingURL=void 0;var a=n(0),s=n(2),c=function(){function e(){i(this,e),this.parsedUrl=new URL(window.location.href)}return o(e,[{key:"getCoordinatesFromUrl",value:function(){var e=new URLSearchParams(this.parsedUrl.search.slice(1));return e.set("lat",a.currentUserPosition.get("latitude")),e.set("lang",a.currentUserPosition.get("longitude")),this.addHistoryState(a.currentUserPosition.get("latitude"),a.currentUserPosition.get("longitude")),e}},{key:"getParamFromUrl",value:function(){var e=this.parsedUrl.searchParams.get("lat"),t=this.parsedUrl.searchParams.get("lang");e&&t?(0,s.setCoordinatesToMapStorage)(e,t):((0,s.setCoordinatesToMapStorage)(a.defaultCoordinates[0],a.defaultCoordinates[1]),this.addHistoryState(a.currentUserPosition.get("latitude"),a.currentUserPosition.get("longitude")))}},{key:"addHistoryState",value:function(e,t){history.pushState("","Weather App","".concat(a.appSettings.appURL,"?lat=").concat(e,"&lang=").concat(t))}}]),e}();t.HandlingURL=c},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function o(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}Object.defineProperty(t,"__esModule",{value:!0}),t.RecentlyCities=void 0;var a=n(0),s=n(3),c=n(1),u=n(2),l=function(){function e(){i(this,e),this.state={isValid:!0},this.showRecentCityForecast=this.showRecentCityForecast.bind(this),this.host=document.getElementById("recently-viewed-cities-block"),this.host.addEventListener("click",this.showRecentCityForecast),this.url=new s.HandlingURL}return o(e,[{key:"setCityToRecentlyViewedCities",value:function(e,t){var n=this,i=document.getElementById("address").value;a.recentlyViewedCities.set("".concat(i),[e,t]);var r=a.recentlyViewedCities.get("".concat(i)),o=r[0],s=r[1];this.render(i),document.getElementById("".concat(i)).addEventListener("click",function(){(0,u.setCoordinatesToMapStorage)(o,s),n.url.addHistoryState(o,s),(0,c.getForecastFromApi)(a.currentUserPosition.get("latitude"),a.currentUserPosition.get("longitude"))})}},{key:"showRecentCityForecast",value:function(e){console.log(e.target.id);for(var t=0;t++;t>a.recentlyViewedCities.length)e.target&&e.target.matches("#".concat(address))&&((0,u.setCoordinatesToMapStorage)(lat,lang),this.url.addHistoryState(lat,lang),(0,c.getForecastFromApi)(a.currentUserPosition.get("latitude"),a.currentUserPosition.get("longitude")),console.log("test"))}},{key:"render",value:function(e){var t=this.state.isValid;return this.host.innerHTML+='<li id="'.concat(e,'" class="').concat(t?"recently":"recently-invalid",'">').concat(e,"</li>"),this.host}}]),e}();t.RecentlyCities=l},function(e,t,n){"use strict";(new(n(6).App)).render()},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function a(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;var s=(i(n(7)),i(n(11)),n(1)),c=n(24),u=n(3),l=n(0),d=n(25),f=n(4),g=n(26),h=n(27),p=function(){function e(){r(this,e),this.state={city:"Kiev",onSubmit:this.onSearchSubmit()},this.form=new c.LocationSearch({city:this.state.city,onSubmit:this.onSearchSubmit()}),this.current=new g.CurrentUserLocation,this.fav=new h.FavoriteCities,this.recent=new f.RecentlyCities,this.url=new u.HandlingURL,this.units=new d.SetUnits,this.onSearchSubmit=this.onSearchSubmit.bind(this)}return a(e,[{key:"onSearchSubmit",value:function(e){this.updateState({city:e}),console.log(this.state)}},{key:"updateState",value:function(e){this.state=Object.assign({},this.state,e)}},{key:"render",value:function(){this.form.render(),this.current.render(),this.fav.render(),this.units.render(),this.url.getParamFromUrl(),(0,s.getForecastFromApi)(l.currentUserPosition.get("latitude"),l.currentUserPosition.get("longitude")),this.fav.getListOfFavoriteCitiesFromLocalStorage()}}]),e}();t.App=p},function(e,t){},function(e,t,n){e.exports=n.p+"img/search.svg"},function(e,t,n){e.exports=n.p+"img/add.svg"},function(e,t,n){e.exports=n.p+"img/target.svg"},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"ClearDay",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(t,"ClearNight",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"Cloudy",{enumerable:!0,get:function(){return a.default}}),Object.defineProperty(t,"Target",{enumerable:!0,get:function(){return s.default}}),Object.defineProperty(t,"Fog",{enumerable:!0,get:function(){return c.default}}),Object.defineProperty(t,"Magnifier",{enumerable:!0,get:function(){return u.default}}),Object.defineProperty(t,"PartyCloudyDay",{enumerable:!0,get:function(){return l.default}}),Object.defineProperty(t,"PartyCloudyNight",{enumerable:!0,get:function(){return d.default}}),Object.defineProperty(t,"Rain",{enumerable:!0,get:function(){return f.default}}),Object.defineProperty(t,"Sleet",{enumerable:!0,get:function(){return g.default}}),Object.defineProperty(t,"Snow",{enumerable:!0,get:function(){return h.default}}),Object.defineProperty(t,"Wing",{enumerable:!0,get:function(){return p.default}}),Object.defineProperty(t,"Search",{enumerable:!0,get:function(){return v.default}}),Object.defineProperty(t,"Add",{enumerable:!0,get:function(){return y.default}});var r=i(n(12)),o=i(n(13)),a=i(n(14)),s=i(n(10)),c=i(n(15)),u=i(n(16)),l=i(n(17)),d=i(n(18)),f=i(n(19)),g=i(n(20)),h=i(n(21)),p=i(n(22)),v=i(n(8)),y=i(n(9))},function(e,t,n){e.exports=n.p+"img/clear-day.svg"},function(e,t,n){e.exports=n.p+"img/clear-night.svg"},function(e,t,n){e.exports=n.p+"img/cloudy.svg"},function(e,t,n){e.exports=n.p+"img/fog.svg"},function(e,t,n){e.exports=n.p+"img/magnifier.svg"},function(e,t,n){e.exports=n.p+"img/partly-cloudy-day.svg"},function(e,t,n){e.exports=n.p+"img/partly-cloudy-night.svg"},function(e,t,n){e.exports=n.p+"img/rain.svg"},function(e,t,n){e.exports=n.p+"img/sleet.svg"},function(e,t,n){e.exports=n.p+"img/snow.svg"},function(e,t,n){e.exports=n.p+"img/wind.svg"},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function o(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}Object.defineProperty(t,"__esModule",{value:!0}),t.RenderTemplate=void 0;var a=n(0),s=function(){function e(){i(this,e),this.state={isValid:!0},this.host=document.getElementById("container")}return o(e,[{key:"render",value:function(e){this.host.innerHTML="";var t=this.state.isValid;e.data.forEach(function(e,n){var i=new Date(1e3*e.time),r=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],o=r[i.getDay()];return document.getElementById("container").innerHTML+='<section class="'.concat(t?"individual-day-forecast-wrapper":"individual-day-forecast-wrapper-invalid",'">\n                <div id="header-').concat(n,'" class="forecast-header">').concat(o,'</div>\n                <img id="icon-').concat(n,'" class="forecast-icon" src="').concat(a.appSettings.appURL,"/img/").concat(e.icon,'.svg">\n                <div id="under-header-').concat(n,'" class="forecast-day-temperature">&#9790; ').concat(Math.round(e.temperatureMin),"˚ &#8594; &#9788; ").concat(Math.round(e.temperatureMax),"˚ ").concat(a.units.get("temperature"),'.</div>\n                <div id="summary-').concat(n,'" class="forecast-summary">Mostly cloudy throughout the day.</div>\n                    <section class="individual-day-forecast-footer-wrapper">\n                    <div id="windSpeed-').concat(n,'" class="forecast-wind-speed forecast-item">Wind:<br><br> ').concat(Math.round(e.windSpeed)," ").concat(a.units.get("speed"),'</div>\n                    <div id="humidity-').concat(n,'" class="forecast-humidity forecast-item">Humidity:<br><br> ').concat(Math.round(e.humidity),' %</div>\n                    <div id="dewPoint-').concat(n,'" class="forecast-dew-point forecast-item">Dew Pt:<br><br> ').concat(Math.round(e.dewPoint),'˚</div>\n                    <div id="uvIndex-').concat(n,'" class="forecast-uv-index forecast-item">UV Index:<br><br> ').concat(Math.round(e.uvIndex),'</div>\n                    <div id="pressure-').concat(n,'" class="forecast-pressure forecast-item">Pressure:<br><br> ').concat(Math.round(e.pressure)," hPa</div>\n                    </section>\n                </section>"),document.getElementById("container")})}}]),e}();t.RenderTemplate=s},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function o(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}Object.defineProperty(t,"__esModule",{value:!0}),t.LocationSearch=void 0;var a=n(1),s=n(2),c=n(3),u=n(0),l=n(4),d=function(){function e(t){i(this,e),this.state={isValid:!0},this.props=t,this.handleSubmit=this.handleSubmit.bind(this),this.host=document.getElementById("input-search-container"),this.host.addEventListener("submit",this.handleSubmit)}return o(e,[{key:"updateState",value:function(e){this.state=e}},{key:"handleSubmit",value:function(e){e.preventDefault();var t=e.target.elements.search.value.trim();if(t.length){(new google.maps.Geocoder).geocode({address:t},function(e,t){this.url=new c.HandlingURL,this.res=new l.RecentlyCities,"OK"===t?((0,s.setCoordinatesToMapStorage)(e[0].geometry.location.lat(),e[0].geometry.location.lng()),this.url.getCoordinatesFromUrl(),this.res.setCityToRecentlyViewedCities(u.currentUserPosition.get("latitude"),u.currentUserPosition.get("longitude")),(0,a.getForecastFromApi)(u.currentUserPosition.get("latitude"),u.currentUserPosition.get("longitude")),this.url.getParamFromUrl()):alert("Geocode was not successful for the following reason: "+t)})}else this.updateState({isValid:!1})}},{key:"render",value:function(){var e=this.state.isValid,t=this.props.city;return this.host.innerHTML='<form class="option '.concat(e?"address":"address-invalid",'">\n                                    <label for="address" id="">\n                                        <input id="address" type="text" name="search" required class="address-input" placeholder="TYPE CITY NAME" value="').concat(t,'">\n                                    </label>\n                                    <button id="submit" class="btn-small"></button>\n                                </form>'),this.host}}]),e}();t.LocationSearch=d},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function o(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}Object.defineProperty(t,"__esModule",{value:!0}),t.SetUnits=void 0;var a=n(1),s=n(0),c=function(){function e(){i(this,e),this.setUnits=this.setUnits.bind(this),this.host=document.getElementById("units-container"),this.host.addEventListener("click",this.setUnits)}return o(e,[{key:"setUnits",value:function(e){e.target&&e.target.matches("#us-unit")?s.units.set("units","us").set("temperature","F").set("speed","mph").set("visibility","mi"):e.target&&e.target.matches("#si-unit")&&s.units.set("units","si").set("temperature","C").set("speed","m/s").set("visibility","km"),(0,a.getForecastFromApi)(s.currentUserPosition.get("latitude"),s.currentUserPosition.get("longitude"))}},{key:"render",value:function(){return this.host.innerHTML='<button id="us-unit" class="unit-button">˚F, mph</button><button id="si-unit" class="unit-button">˚C, m/s</button>',this.host}}]),e}();t.SetUnits=c},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function o(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}Object.defineProperty(t,"__esModule",{value:!0}),t.CurrentUserLocation=void 0;var a=n(1),s=n(2),c=n(3),u=function(){function e(){i(this,e),this.state={isValid:!0},this.url=new c.HandlingURL,this.getCurrentUserPosition=this.getCurrentUserPosition.bind(this),this.host=document.getElementById("input-search-container"),this.host.addEventListener("click",this.getCurrentUserPosition)}return o(e,[{key:"getCurrentUserPosition",value:function(e){var t=this;e.target&&e.target.matches("#currentPos")&&navigator.geolocation.getCurrentPosition(function(e){var n=e.coords;(0,s.setCoordinatesToMapStorage)(n.latitude,n.longitude),t.url.addHistoryState(n.latitude,n.longitude),(0,a.getForecastFromApi)(n.latitude,n.longitude),document.getElementById("address").value="".concat(n.latitude.toFixed(3),", ").concat(n.longitude.toFixed(3))},function(e){return console.warn("ERROR(".concat(e.code,"): ").concat(e.message))},{enableHighAccuracy:!0,timeout:5e3,maximumAge:0})}},{key:"render",value:function(){var e=this.state.isValid;return this.host.innerHTML+='<button id="currentPos" class="'.concat(e?"btn-small":"btn-small-invalid",'"></button>'),this.host}}]),e}();t.CurrentUserLocation=u},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function o(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}Object.defineProperty(t,"__esModule",{value:!0}),t.FavoriteCities=void 0;var a=n(0),s=n(1),c=n(3),u=n(2),l=n(4),d=function(){function e(){i(this,e),this.state={isValid:!0},this.setCityToFavoriteCities=this.setCityToFavoriteCities.bind(this),this.host=document.getElementById("favorite-cities-container"),this.host.addEventListener("click",this.setCityToFavoriteCities),this.host.addEventListener("change",this.getFavoriteCityForecastFromApi)}return o(e,[{key:"setCityToFavoriteCities",value:function(e){if(this.select=document.getElementById("favorite-cities"),e.target&&e.target.matches("#addToFav")){var t=document.getElementById("address").value;a.favoriteCities.setItem("".concat(t),"".concat(t)),this.select.innerHTML+="<option>".concat(t,"</option>")}}},{key:"getListOfFavoriteCitiesFromLocalStorage",value:function(){this.select=document.getElementById("favorite-cities");for(var e=0,t=localStorage.length;e<t;++e)this.select.innerHTML+='<option class="option">'.concat(localStorage.getItem(localStorage.key(e)),"</option>")}},{key:"getFavoriteCityForecastFromApi",value:function(){var e=document.getElementById("favorite-cities"),t=e[e.selectedIndex].value;console.log(t),document.getElementById("address").value=t;var n=t;(new google.maps.Geocoder).geocode({address:n},function(e,t){this.url=new c.HandlingURL,this.res=new l.RecentlyCities,"OK"===t?((0,u.setCoordinatesToMapStorage)(e[0].geometry.location.lat(),e[0].geometry.location.lng()),this.url.getCoordinatesFromUrl(),this.res.setCityToRecentlyViewedCities(a.currentUserPosition.get("latitude"),a.currentUserPosition.get("longitude")),(0,s.getForecastFromApi)(a.currentUserPosition.get("latitude"),a.currentUserPosition.get("longitude")),this.url.getParamFromUrl()):alert("Geocode was not successful for the following reason: "+t)})}},{key:"render",value:function(){return this.host.innerHTML='<button id="addToFav" class="btn-small"></button>\n                                <label for="favorite-cities"></label>\n                                <select id="favorite-cities"></select>',this.host}}]),e}();t.FavoriteCities=d}]);