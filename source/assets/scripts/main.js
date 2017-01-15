// @codekit-prepend 'tokens'

let latitude,
    longitude,
    url = `https://crossorigin.me/https://api.darksky.net/forecast/${key}/42.637118199999996,-83.0359869`,
    reverseGeocode,
    geocode,
    search,
    conditionsIcon,
    loadingText = document.querySelector('#loading h1'),
    welcomeText = document.querySelector('#welcome h1');

let weather = [];

fetch(url)
  .then(blob => blob.json())
  .then(data => weather.push(...data));
