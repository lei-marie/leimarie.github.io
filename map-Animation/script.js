mapboxgl.accessToken = '#';

var marker = [];
var latCord = 0;
var lngCord = 0;
var i = 0;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/navigation-night-v1', // style URL
    center: [-70.98509573, 42.4669638 ], // starting position [lng, lat]
    zoom: 13 // starting zoom
    });


 async function run(){
     const locations = await getBusLocations();
     console.log(locations);
     console.log(new Date);
    
     latCord = data[0].attributes.latitude;
     lngCord = data[0].attributes.longitude;
     console.log(latCord, lngCord)

    for(i; i<data.length; i++){
        const el = document.createElement('div');
        el.className = 'marker';
        
        marker = new mapboxgl.Marker(el).setLngLat([lngCord, latCord]).addTo(map);

    
    }
    setTimeout(run, 15000);
}
map.on('load', () => {
    map.addSource('route', {
    'type': 'geojson',
    'data': {
    'type': 'Feature',
    'properties': {},
    'geometry': {
    'type': 'LineString',
    'coordinates': []
}
}
});
map.addLayer({
'id': 'route',
'type': 'line',
'source': 'route',
'layout': {
'line-join': 'round',
'line-cap': 'round'
},
'paint': {
'line-color': '#888',
'line-width': 8
}
});
});


// const marker = ([0,0], {icon: myIcon}).addTo(map)'

// const api_url = 'https://api-v3.mbta.com/vehicles?page%5Blimit%5D=10" -H "accept: application/vnd.api+json';

// let firstTime = true;

// async function getData(){
//     const response = await fetch(api_url);
//     const data = await response.json();
//     const { latitude, longitude } = data;

//     marker.setLatLng([latitude, longitude]);
//     if(firstTime) {
//         map.setView([latitude, longitude], 12);
//         firstTime = false;
//     }
// }

// getData();

// setInterval(getData, 1000);
async function getBusLocations(){
    const url = 'https://api-v3.mbta.com/vehicles?page%5Blimit%5D=1&filter%5Broute_type%5D=1" -H "accept: application/vnd.api+json';
    const response = await fetch(url);
    const json = await response.json();
    data = json.data;
    return data;
}

run();

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');
