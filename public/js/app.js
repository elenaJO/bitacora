$(document).ready(function () {
  var containerContext = $('#container-content');
  var image;
  var opcion;
  var video;
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
  $('#public-message').click(function () {
    var titleMessage = $('#title-message').val();
    var textMessage = $('#text-message').val();
    if (titleMessage !== '' && textMessage !== '') {
      var appen = `<div class="row">
      <div class="col s12 m8 push-m2 publications">
        <h5>${titleMessage}</h5>
        <p>${textMessage}</p>
      </div>
    </div>`
      containerContext.append(appen);
      $('#title-message').val('');
      $('#text-message').val('');
      $('#more-message').modal('close');
    } else {
      alert('Ingrese mensaje');
    }
  });

  // agregar imagen
  $('#fileButton').change(function () {
    var reader = new FileReader();
    reader.onload = function (event) {
      image = event.target.result;
    };
    reader.readAsDataURL(this.files[0]);
  });

  $('#public-image').click(function () {
    if (window.FileReader && window.FileList && $('.file-path').val() !== '') {
      var titleImage = $('#title-image').val();
      var appen = `<div class="row">
                     <div class="col s12 m8 push-m2 publications">
                     <h5>${titleImage}</h5>
                     <div class="center-align">
                     <img src=${image} alt="" class="img-pub">
                     </div>
                     </div>
                  </div>`;
      containerContext.append(appen);
      $('.file-path').val('');
      $('#title-image').val('');
      $('#more-image').modal('close');
    } else {
      alert('Ingrese imagen');
    }

  });

  // agregar evento

  $('#public-date').click(function () {
    var titleDate = $('#title-date').val();
    var date = $('#date').val();
    if (titleDate !== '' && date !== '') {
      var appen = `<div class="row">
    <div class="col s12 m8 push-m2 publications">
      <h5>${titleDate}</h5>
      <p>${date}</p>
      <div id="map" class="map"></div>
     </div>
    </div>`
      containerContext.append(appen);
      initMap();
      $('#title-date').val('');
      $('#date').val('');
      $('#more-date').modal('close');
    } else {
      alert('Ingrese evento y titulo del evento');
    }
  });

  // agregar video
  $('#fileButtonVideo').change(function() {
    var file = $('#fileButtonVideo').val();
    // console.log(file);
    var allowedExtensions = /(.mp3|.midi|.wav|.WMA)$/i;
    var extensionVideos = /(.mp4)$/i;
    if (allowedExtensions.exec(file)) {
      // console.log('no es mp3')
      var reader = new FileReader();
      reader.onload = function(event) {
        opcion = 'audio';
        video = event.target.result;
      };
      reader.readAsDataURL(this.files[0]);
    } else if (extensionVideos.exec(file)) {
      // console.log('si es mp3')
      var reader = new FileReader();
      reader.onload = function(event) {
        opcion = 'video';
        video = event.target.result;
      };
      reader.readAsDataURL(this.files[0]);
    } else {
      opcion = 'ninguno';
    }
  });

  $('#public-video').click(function() {
    var titleVideo = $('#title-video').val();
    // console.log( $('#file-video').val());
    if (window.FileReader && window.FileList && $('#file-video').val() !== '') {
      if (opcion === 'video') {
        var appen = `<div class="row">
                     <div class="col s12 m8 push-m2 publications">
                     <h5>${titleVideo}</h5>
                     <div class="center-align">
                     <video src=${video} alt="" class="img-pub" controls></video>
                     </div>
                     </div>
                  </div>`;
        containerContext.append(appen); 
        $('#more-video').modal('close');
        $('.file-path').val('');
        $('#title-video').val('');
      } else if (opcion === 'audio') {
        var appen = `<div class="row">
                     <div class="col s12 m8 push-m2 publications">
                     <h5>${titleVideo}</h5>
                     <div class="center-align">
                     <audio src=${video} alt="" controls></audio>
                     </div>
                     </div>
                  </div>`;
        containerContext.append(appen);
        $('#more-video').modal('close');
        $('.file-path').val('');
        $('#title-video').val('');
      } else {
        alert('No escogiste un video');
        $('.file-path').val('');
        $('#title-video').val('');
      }
    } else {
      alert('Ingrese video');
    }
  })
});