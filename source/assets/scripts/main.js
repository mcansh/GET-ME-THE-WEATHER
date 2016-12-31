// @codekit-prepend 'jquery-3.1.1.min'
// @codekit-prepend 'tokens'

let latitude,
    longitude,
    url,
    reverseGeocode,
    geocode,
    search,
    conditionsIcon;

function coordsToLocation() {
  $.ajax({
    type: 'GET',
    url: reverseGeocode,
    success: function(location) {
      /* eslint-disable */
      console.log('got location from latitude/longitude');
      /* eslint-disable */
      $('.location').show().attr('placeholder', location.results[0].address_components[2].short_name);

    },
    error: function() {
      /* eslint-disable */
      console.log('error during conversion');
      /* eslint-disable */
    }
  });
}

function getWeather() {
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'jsonp',
    success: function(data) {
      $('#loading').fadeOut(300);
      /* eslint-disable */
      console.log('got your weather');
      /* eslint-disable */

      let temp = Math.round(data.currently.temperature);

      $('.temp').show().text(`It's currently ${temp} degrees outside.`);

      let conditions = data.currently.summary;
      $('.conditions').show().text(`It's ${conditions}.`);

      $('.later').show().text(data.hourly.summary);

      window.conditionsIcon = data.currently.icon;

      $('.icon').attr('class','icon').addClass(conditionsIcon);

      let wind = Math.round(data.currently.windSpeed);

      $('.wind').show().text(`The wind is ${wind} mph right now`);

    },
    error: function() {
      /* eslint-disable */
      console.log('Error gathering weather, please refresh and try again.');
      console.log('or hit api limit, come back tomorrow');
      /* eslint-disable */
      $('#loading h1').text(`Sorry, hit api limit, come back tomorrow...`)
    }
  });
}

function doEverything() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      window.longitude = position.coords.longitude;
      window.latitude = position.coords.latitude;
      /* eslint-disable */
      console.log(`latitude: ${latitude}`);
      console.log(`longitude: ${longitude}`);
      /* eslint-disable */

      $('.lat').text(window.latitude);
      $('.long').text(window.longitude);

      window.url = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}`;
      console.log(url);

      window.reverseGeocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAc2pRb6K0kKlYCmaGrkyPTpYqjHoseUm0`;

      coordsToLocation();

      getWeather();

    },
    function(error) {
      if (error.code == error.PERMISSION_DENIED) {
        $('#loading h1').text('I need your location')
      }
    });
  }
  else {
    $('#loading h1').text('geolocation not supported, please upgrade your browser');
  }
}

doEverything();


$('input').keyup(function() {
  search = $(this).val();
});


function submitForm() {
  $('form').submit(function(event) {
    event.preventDefault();
    searchToLocation(search);
    /* eslint-disable */
    console.log(`converting search: ${search} to lat, long`);
    /* eslint-disable */
  });
}

function searchToLocation(search) {

}

document.onkeydown=function(){
  if(window.event.keyCode=='13'){
    submitForm();
  }
}
