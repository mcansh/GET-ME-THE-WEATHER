// @codekit-prepend 'jquery-3.1.1.min'

let latitude,
    longitude,
    key = `8d82c87ab61ad64f2381f998a385bd14`,
    url,
    geocode;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    window.longitude = position.coords.longitude;
    window.latitude = position.coords.latitude;
    console.log(`latitude: ${latitude}`);
    console.log(`longitude: ${longitude}`);

    $('.lat').text(window.latitude);
    $('.long').text(window.longitude);

    window.url = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}`;
    console.log(url);

    window.geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAc2pRb6K0kKlYCmaGrkyPTpYqjHoseUm0`;

    $.ajax({
      type: 'GET',
      url: geocode,
      success: function(location) {
        /* eslint-disable */
        console.log('converted your location to address');
        /* eslint-disable */

        $('.location').text(`Your current location is ${location.results[0].address_components[2].short_name}`);
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
        $('.temp').text(`It's currently ${temp}ºF degrees outside.`);

        let conditions = data.currently.summary;
        $('.conditions').text(`It's ${conditions}.`);

        let conditionsIcon = data.currently.icon;

        $('.icon').addClass(conditionsIcon);

        let wind = Math.round(data.currently.windSpeed);

        $('.wind').text(`The wind is ${wind} mph right now`);

      },
      error: function() {
        /* eslint-disable */
        console.log('Error gathering weather, please refresh and try again.');
        /* eslint-disable */
      }
    });

  });
}
