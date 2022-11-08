console.log("i am called after config.js");
const L = window.L;
console.log(window.config);
var access = window.config.ACESS_TOKEN;

var map = L.map('map').setView([51.505, 0.1276], 13)



   var osm = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?' + access, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic2FtamFwaGlhIiwiYSI6ImNreWhrbDhodDIyenEyb3A4dWNwN3U5ZzAifQ.f8QrvZ5MpbiosFe_0oYcxA'
}).addTo(map);

var marker = L.marker([51.5,-0.09]).addTo(map); 

var circle =L.circle([51.508, - 0.11], {
    color: 'red',
    fillColor: '#ae',
    fillOpacity: 0.5,
    radius: 500,
}).addTo(map);

var polygon = L.polygon ([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047],
]).addTo(map)


marker.bindPopup ("I am here haha<br>I am a popup").openPopup();
circle.bindPopup("I am a circle");
polygon.bindPopup("I am a polygon");

if (!navigator.geolocation){
    console.log("Your browser doesn't support geolocation feature!")
} else {
    setInterval (() => {
        navigator.geolocation.getCurrentPosition(getPosition)

    }, 5000)
}

var marker, circle;

function getPosition(position){
//console.log(position)
var lat = position.coords.latitude
var long = position.coords.longitude 
var accuracy =position.coords.accuracy

if(marker) {
    map.removeLayer(marker)
}

if(circle) {
    map.removeLayer(circle)
}

marker =L.marker([lat, long])
circle= L.circle([lat, long], {radius: accuracy})

var featureGroup = L.featureGroup ([marker, circle]).addTo(map)
map.fitBounds (featureGroup.getBounds())

console.log("Your coordinates is: Lat: "+ lat +" Long: "+ long+ " Accuracy: "+ accuracy)
}

