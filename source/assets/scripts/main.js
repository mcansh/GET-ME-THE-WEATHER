// @codekit-prepend 'jquery-3.1.1.min'

let latitude,
    longitude,
    key = `8d82c87ab61ad64f2381f998a385bd14`,
    url,
    reverseGeocode,
    geocode,
    zip,
    conditionsIcon;

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

    $.ajax({
      type: 'GET',
      url: reverseGeocode,
      success: function(location) {
        /* eslint-disable */
        console.log('got location from latitude/longitude');
        /* eslint-disable */

        $('.location').show().val(location.results[0].address_components[2].short_name);

      },
      error: function() {
        /* eslint-disable */
        console.log('error during conversion');
        /* eslint-disable */
      }
    });

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

        $('icon').attr('class', 'icon').addClass(conditionsIcon);

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

  });
}
else {
  $('#content-wrapper').text('geolocation not supported, please upgrade your browser');
}

$('input').keyup(function() {
  zip = $(this).val();
});


function submitForm() {
  $('form').submit(function(event) {
    event.preventDefault();
    zipToLocation(zip);
    /* eslint-disable */
    console.log(`converting zip code: ${zip} to lat, long`);
    /* eslint-disable */
  });
}

function zipToLocation() {
  window.geocode = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}`
  console.log(geocode);

  $.ajax({
    type: 'GET',
    url: geocode,
    success: function(location) {
      window.latitude = location.results[0].geometry.location.lat;
      window.longitude = location.results[0].geometry.location.lng;
      let city = location.results[0].address_components[1].short_name;


      $('.location').show().val(city);

      window.url = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}`;

      /* eslint-disable */
      console.log(`got ${city} from latitude/longitude`);
      /* eslint-disable */

    },
    error: function() {
      /* eslint-disable */
      console.log('error during conversion');
      /* eslint-disable */
    }
  });

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

      $('icon').attr('class', 'icon').delay(2).addClass(conditionsIcon);

      let wind = Math.round(data.currently.windSpeed);

      $('.wind').show().text(`The wind is ${wind} mph right now`);

    },
    error: function() {
      /* eslint-disable */
      console.log('Error gathering weather, please refresh and try again.');
      /* eslint-disable */
    }
  });
}

document.onkeydown=function(){
  if(window.event.keyCode=='13'){
    submitForm()
  }
}
