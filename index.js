var stage = document.getElementById('stage');
$stage = jQuery(stage);

var features = ["map-container", "music-container"]
var requestedFeature = "map-container";

$(document).ready(function (){
  // create a manager for that element
  var manager = new Hammer.Manager(stage);

  var Pan = new Hammer.Pan({
      pointers: 2,
  });
  var Swipe = new Hammer.Swipe({
      pointers: 2,
  });

  Swipe.recognizeWith([Pan])

  manager.add(Pan);
  manager.add(Swipe)

  manager.on('swipe', function (e){
    featureIndex = features.indexOf(requestedFeature);
    previousFeature = requestedFeature;

    //swipe left
    if(e.direction === 2){
      if(featureIndex != (features.length - 1))
        requestedFeature = features[features.indexOf(requestedFeature) + 1];
    }
    //swipe right 
    else if(e.direction === 4){
      if(features.indexOf(requestedFeature) != 0)
        requestedFeature = features[features.indexOf(requestedFeature) - 1];
    }

    changeViewTo(requestedFeature, previousFeature);
  });

  function changeViewTo(requestedFeature, previousFeature) {
    previousFeatureDomElem = $('.' + previousFeature);
    requestedFeatureDomElem = $('.' + requestedFeature);

    previousFeatureDomElem.addClass("d-none");
    requestedFeatureDomElem.removeClass("d-none");
  }

  function initMap() {
      var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 18,
          center: {lat: 32.2319, lng: -110.9501},
          styles: [
              {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
              {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
              {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
              {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#263c3f'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#6b9a76'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
              },
              {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
              },
              {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{color: '#2f3948'}]
              },
              {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
              }
            ],
            disableDefaultUI: true,
      });
  }

  initMap();

  var knob = $('.knob');
  var angle = 0;
  var minangle = 0;
  var maxangle = 270;
  
  function moveKnob(direction) {
  
      if(direction == 'up') {
          if((angle + 2) <= maxangle) {
              angle = angle + 2;
              setAngle();
          }
      }
  
      else if(direction == 'down') {
          if((angle - 2) >= minangle) {
              angle = angle - 2;
              setAngle();
          }
      }
  
  }
  
  function setAngle() {
  
      // rotate knob
      knob.css({
          '-moz-transform':'rotate('+angle+'deg)',
          '-webkit-transform':'rotate('+angle+'deg)',
          '-o-transform':'rotate('+angle+'deg)',
          '-ms-transform':'rotate('+angle+'deg)',
          'transform':'rotate('+angle+'deg)'
      });
  
      // highlight ticks
      var activeTicks = (Math.round(angle / 10) + 1);
      $('.tick').removeClass('activetick');
      $('.tick').slice(0,activeTicks).addClass('activetick');
  
      // update % value in text
      var pc = Math.round((angle/270)*100);
      $('.current-value').text(pc+'%');
  
  }
  
  // mousewheel event - firefox
  knob.bind('DOMMouseScroll', function(e){
      if(e.originalEvent.detail > 0) {
          moveKnob('down');
      } else {
          moveKnob('up');
      }
      return false;
  });
  
  // mousewheel event - ie, safari, opera
  knob.bind('mousewheel', function(e){
      if(e.originalEvent.wheelDelta < 0) {
          moveKnob('down');
      } else {
          moveKnob('up');
      }
      return false;
  });
  
});