$(document).ready(function () {
  var containerContext = $('#container-content');
  $('.modal').modal();

  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });
        
  
  // agregar mensaje
  $('#message').click(function(){
    $('#title-message').val('');
    $('#text-message').val('');
  });

  $('#public-message').click(function(){
    var titleMessage = $('#title-message').val();
    var textMessage = $('#text-message').val();
    var appen = `<div class="row">
                   <div class="col s12 m8 push-m2 publications">
                     <h3>${titleMessage}</h3>
                     <p>${textMessage}</p>
                   </div>
                </div>`
   containerContext.append(appen);
  });

  // agregar imagen
  $('#fileButton').change(function() {
    var titleImage = $('#title-image').val();
    var reader = new FileReader();
    reader.onload = function(event) {
      var appen = `<div class="row">
                   <div class="col s12 m8 push-m2 publications">
                   <h3>${titleImage}</h3>
                   <img src="_pub_" alt="" class="img-pub">
                   </div>
                </div>`
      var appenReplace = appen.replace('_pub_', event.target.result);
      containerContext.append(appenReplace);
    };
    reader.readAsDataURL(this.files[0]);
  });


  // agregar evento

  $('#public-date').click(function(){
    var titleDate = $('#title-date').val();
    var date = $('#date').val();
    function localizacion(posicion){
      var latitude = posicion.coords.latitude;
      var longitude = posicion.coords.longitude;
      // console.log(longitude);
      var appen = `<div class="row">
                   <div class="col s12 m8 push-m2 publications">
                   <h3>${titleDate}</h3>
                   <p>${date}</p>
                   <img src="_pub_" alt="" class="img-pub">
                   </div>
                </div>`
     var urlImage = 'https://maps.googleapis.com/maps/api/staticmap?center='+ latitude + ',' + longitude + '&zoom=16&size=2000x1200&markers=color:red%7C'+latitude+','+longitude+'&key=AIzaSyDnxULnKl1u7sIJVCbUgVlm44D69GE2AFA'
     var appenReplace = appen.replace('_pub_', urlImage);
     containerContext.append(appenReplace); 
    }

    function error(){
      console.log('paso algooo');
    }
    navigator.geolocation.getCurrentPosition(localizacion,error);

  });

  $('#fileButtonVideo').change(function() {
    var titleVideo = $('#title-video').val();
    var file = $('#fileButtonVideo').val();
    // console.log(file);
    var allowedExtensions = /(.mp3|.midi|.wav|.WMA)$/i;
    if(!allowedExtensions.exec(file)){
      // console.log('no es mp3')
      var reader = new FileReader();
    reader.onload = function(event) {
      var appen = `<div class="row">
                   <div class="col s12 m8 push-m2 publications">
                   <h3>${titleVideo}</h3>
                   <video src="_pub_" alt="" class="img-pub" controls></video>
                   </div>
                </div>`
      var appenReplace = appen.replace('_pub_', event.target.result);
      containerContext.append(appenReplace);
    };
    reader.readAsDataURL(this.files[0]);
    } else {
      // console.log('si es mp3')
      var reader = new FileReader();
    reader.onload = function(event) {
      var appen = `<div class="row">
                   <div class="col s12 m8 push-m2 publications">
                   <h3>${titleVideo}</h3>
                   <audio src="_pub_" controls></audio>
                   </div>
                </div>`
      var appenReplace = appen.replace('_pub_', event.target.result);
      containerContext.append(appenReplace);
    };
    reader.readAsDataURL(this.files[0]);
    }
  });
});