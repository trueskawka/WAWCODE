var Toilets = function() {
  var map;

  var my_mark;

  var my_lat;
  var my_long;
  var dst_lat;
  var dst_long;
  var is_travelling = false;
  var first_time = true;

  var inf = new google.maps.InfoWindow();

  var cancelRoute = function () {
    map.cleanRoute();
    $('#instructions').empty();
    $('#instructions-panel').addClass('hidden');
    $('#toggle-instructions').text('Pokaż wskazówki');
    $('#navigationoptions').addClass('hidden');

    is_travelling = false;
  }

  $('#cancel-route').on("click", cancelRoute);

  $('#toggle-instructions').on("click", function() {
    if ($('#instructions-panel').hasClass('hidden')) {
      $('#instructions-panel').removeClass('hidden');
      $('#toggle-instructions').text('Ukryj wskazówki');
      /*
      $('#toggle-instructions').removeClass('btn-info');
      $('#toggle-instructions').addClass('btn-danger');
      */
    } else {
      $('#instructions-panel').addClass('hidden');
      $('#toggle-instructions').text('Pokaż wskazówki');
    }

  });

  function initMap() {
    map = new GMaps({
      el: '#map',
      lat: 52.14,
      lng: 21.0,
      height: '500px',
      zoom: 12,
      zoomControl: true,
      zoomControlOpt: {
        style: 'SMALL',
        position: 'TOP_LEFT'
      },
      panControl: false
    });
  }

  function drawUserMark() {
    my_mark.setPosition(new google.maps.LatLng(my_lat, my_long));
  }

  function drawRoute() {
    map.cleanRoute();
    if (is_travelling) {
      $('#navigationoptions').removeClass('hidden');
      $('#instructions').removeClass('hidden');
      $('#instructions').empty();
      map.travelRoute({
        origin: [
          my_lat, my_long
        ],
        destination: [
          dst_lat, dst_long
        ],
        travelMode: 'walking',
        step: function(e) {


          $('#instructions').append('<li>' + e.instructions + '</li>');
          $('#instructions li:eq(' + e.step_number + ')').delay(1 * e.step_number).fadeIn(200, function() {
            map.drawPolyline({
              path: e.path,
              strokeColor: '#131540',
              strokeOpacity: 1.0,
              strokeWeight: 6
            });


          });
        }
      });
    }
  }

  /* This uses callbacks, I will just put everything in there so there will be no problem with asynch */
  function locateUser() {
    GMaps.geolocate({
      success: function(position) {
        if (first_time) {
          map.setCenter(position.coords.latitude, position.coords.longitude);
          first_time = false;
        }
        my_lat = position.coords.latitude;
        my_long = position.coords.longitude;

        drawUserMark();
        drawRoute();

      },
      error: function(error) {
        alert('Geolocation failed: ' + error.message);
      },
      not_supported: function() {
        alert("Your browser does not support geolocation");
      },
      always: function() {}
    });
  }

  var gMarkers_disabled = [],
    gMarkers_mom = [],
    gMarkers_free = [];
  var toitoi = [],
    cafe = [],
    mac = [],
    parkride = [],
    stops = [],
    rest = [],
    malls = [];

  is_travelling = false;
  initMap();
  my_mark =  map.addMarker({
    lat: 0,
    lng: 0,
    zIndex: 99999
  });
  locateUser();

  var marker_icon_toilet = {
    url: 'icon.png',
    size: new google.maps.Size(30, 49),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(15, 35),
    scaledSize: new google.maps.Size(30, 49)
  };

  var marker_icon_rest = {
    url: 'rest-icon.png',
    size: new google.maps.Size(30, 49),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(15, 35),
    scaledSize: new google.maps.Size(30, 49)
  };

  var marker_icon_mac = {
    url: 'mac-icon.png',
    size: new google.maps.Size(30, 49),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(15, 35),
    scaledSize: new google.maps.Size(30, 49)
  };

  var marker_icon_park = {
    url: 'park-icon.png',
    size: new google.maps.Size(30, 49),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(15, 35),
    scaledSize: new google.maps.Size(30, 49)
  };

  var marker_icon_gall = {
    url: 'gall-icon.png',
    size: new google.maps.Size(30, 49),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(15, 35),
    scaledSize: new google.maps.Size(30, 49)
  };

  var marker_icon_cafe = {
    url: 'cafe-icon.png',
    size: new google.maps.Size(30, 49),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(15, 35),
    scaledSize: new google.maps.Size(30, 49)
  };

  function navigateClick() {
    is_travelling = true;
    drawRoute();
    $('#instructions').empty();
    $('#instructions-panel').slideDown(200, function() {});
  }

  $(".toilet").each(function() {
    var marker_icon;

    switch ($(this).attr("type")) {
      case 'toilets':
        marker_icon = marker_icon_toilet;
        break;

      case 'cafe':
        marker_icon = marker_icon_cafe;
        break;

      case 'pub':
      case 'restaurant':
        marker_icon = marker_icon_rest;
        break;

      case 'fast_food':
        marker_icon = marker_icon_mac;
        break;

      case 'mall':
        marker_icon = marker_icon_gall;
        break;

      case 'parking':
      case 'subway':
      case 'station':
        marker_icon = marker_icon_park;
        break;

      default:
        marker_icon = marker_icon_toilet;
        break;
    }

    var contentString = '<div class="infowindow">' +
      $(this).attr('name') + '<br>' +
      $(this).attr('address') +
      '<br><button type="button" class="btn btn-success btn-sm navigate" id="navigate">Nawiguj</button></div>';

    var infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

    var assigner = function() {
      if (($(this).attr('data-lat') != dst_lat) || (($(this).attr('data-lon') != data_lon)))
      {
        dst_lat = $(this).attr('data-lat');
        dst_long = $(this).attr('data-lon');
        cancelRoute();
      }
    }

    var marker = map.addMarker({
      lat: $(this).attr('data-lat'),
      lng: $(this).attr('data-lon'),
      icon: marker_icon,
      click: assigner.bind(this)
    });

    marker.addListener('click', function() {
      inf.close();
      infoWindow.open(marker.map, marker);
      inf = infoWindow;
    });

    google.maps.event.addListenerOnce(infoWindow, 'domready', function() {
      $("#navigate").click(navigateClick); //function() {$('#navigationoptions').removeClass('hidden');});
    });

    if ($(this).attr('disabledfriendly') == 'false') {
      gMarkers_disabled.push(marker);
    }

    if ($(this).attr('momfriendly') == 'false') {
      gMarkers_mom.push(marker);
    }

    if ($(this).attr('price') != 0) {
      gMarkers_free.push(marker);
    }

    switch ($(this).attr('type')) {
      case 'toilets':
        toitoi.push(marker);
        break;

      case 'cafe':
        cafe.push(marker);
        break;

      case 'pub':
      case 'restaurant':
        rest.push(marker);
        break;

      case 'fast_food':
        mac.push(marker);
        break;

      case 'parking':
        parkride.push(marker);
        break;

      case 'subway':
      case 'station':
        stops.push(marker);
        break;

      case 'mall':
        malls.push(marker);
        break;
    }

  });

  var disableMarkers = function(vector) {
    if ($("#free").is(":checked") && $("#disabled").is(":checked") && $("#przewijak").is(":checked")) {
      var dism = $(vector).not(gMarkers_mom).get();
      var dismd = $(dism).not(gMarkers_disabled).get();
      var dismdf = $(dismd).not(gMarkers_free).get();
      $.each(dismdf, function(index, obj) {
        var marker = map.addMarker(obj);
      });
    } else if ($("#disabled").is(":checked") && $("#free").is(":checked")) {
      var disd = $(vector).not(gMarkers_disabled).get();
      var disdf = $(disd).not(gMarkers_free).get();
      $.each(disdf, function(index, obj) {
        var marker = map.addMarker(obj);
      });
    } else if ($("#disabled").is(":checked") && $("#przewijak").is(":checked")) {
      var disd = $(vector).not(gMarkers_disabled).get();
      var disdm = $(disd).not(gMarkers_mom).get();
      $.each(disdm, function(index, obj) {
        var marker = map.addMarker(obj);
      });
    } else if ($("#free").is(":checked") && $("#przewijak").is(":checked")) {
      var disd = $(vector).not(gMarkers_free).get();
      var disdm = $(disd).not(gMarkers_mom).get();
      $.each(disdm, function(index, obj) {
        var marker = map.addMarker(obj);
      });
    } else if ($("#disabled").is(":checked")) {
      var disd = $(vector).not(gMarkers_disabled).get();
      $.each(disd, function(index, obj) {
        var marker = map.addMarker(obj);
      });
    } else if ($("#free").is(":checked")) {
      var disf = $(vector).not(gMarkers_free).get();
      $.each(disf, function(index, obj) {
        var marker = map.addMarker(obj);
      });
    } else if ($("#przewijak").is(":checked")) {
      var dism = $(vector).not(gMarkers_mom).get();
      $.each(dism, function(index, obj) {
        var marker = map.addMarker(obj);
      });
    } else {
      $.each(vector, function(index, obj) {
        var marker = map.addMarker(obj);
      });
    }
  }

  $("#disabled").change(function() {
    if (this.checked) {
      map.removeMarkers(gMarkers_disabled);
    } else {
      disableMarkers(gMarkers_disabled);
    }
  });

  $("#free").change(function() {
    if (this.checked) {
      map.removeMarkers(gMarkers_free);
    } else {
      disableMarkers(gMarkers_free);
    }
  });

  $("#przewijak").change(function() {
    if (this.checked) {
      map.removeMarkers(gMarkers_mom);

    } else {
      disableMarkers(gMarkers_mom);
    }
  });

  $("#mac").change(function() {
    if (!this.checked) {
      map.removeMarkers(mac);
    } else {
      disableMarkers(mac);
    }
  });

  $("#rest").change(function() {
    if (!this.checked) {
      map.removeMarkers(rest);
    } else {
      disableMarkers(rest);
    }
  });
  $("#toitoi").change(function() {
    if (!this.checked) {
      map.removeMarkers(toitoi);
    } else {
      disableMarkers(toitoi);
    }
  });

  $("#cafe").change(function() {
    if (!this.checked) {
      map.removeMarkers(cafe);
    } else {
      disableMarkers(cafe);
    }
  });

  $("#parkride").change(function() {
    if (!this.checked) {
      map.removeMarkers(parkride);
    } else {
      disableMarkers(parkride);
    }
  });

  $("#stops").change(function() {
    if (!this.checked) {
      map.removeMarkers(stops);
    } else {
      disableMarkers(stops);
    }
  });

  $("#malls").change(function() {
    if (!this.checked) {
      map.removeMarkers(malls);
    } else {
      disableMarkers(malls);
    }
  });

  setInterval(locateUser, 8000);

}
