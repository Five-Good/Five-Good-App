/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!


    var macAddress = '01';
    var ipAddress = '01';
    var status = ''; // data.message
    var device_volume = 0.0; //data.device_volume
    var video_url = ''; // data.video_url
    // alert(Media);
    // Navigator.connection 
    // Navigator.deviceMemory
    // Navigator.geolocation 
    // Navigator.mediaDevices

    var permissions = cordova.plugins.permissions;
    permissions.requestPermission(permissions.WRITE_EXTERNAL_STORAGE, external_write_permissions_success, external_write_permissions_error);
    permissions.requestPermission(permissions.READ_EXTERNAL_STORAGE, external_read_permissions_success, external_read_permissions_error);
    permissions.requestPermission(permissions.READ_PHONE_STATE, phone_permissions_success, phone_permissions_error);
    permissions.requestPermission(permissions.INTERNET, internet_permissions_success, internet_permissions_error);
    permissions.requestPermission(permissions.ACCESS_FINE_LOCATION, location_permissions_success, location_permissions_error);
    permissions.requestPermission(permissions.LOCAL_MAC_ADDRESS, local_mac_permissions_success, local_mac_permissions_error);

    function phone_permissions_error() {
      alert('Can Not Read Phone State');
    }
    function phone_permissions_success( status ) {
      if( !status.hasPermission ) phone_permissions_error();
    }
    function external_write_permissions_error() {
      alert('Cannot Write External Storage');
    }
    function external_write_permissions_success( status ) {
      if( !status.hasPermission ) external_write_permissions_error();
    }
    function external_read_permissions_error() {
      alert('Cannot Read External Storage');
    }
    function external_read_permissions_success( status ) {
      if( !status.hasPermission ) external_read_permissions_error();
    }
    function internet_permissions_error() {
      alert('Cannot Access Internet');
    }
    function internet_permissions_success( status ) {
      if( !status.hasPermission ) internet_permissions_error();
    }
    function location_permissions_error() {
      alert('Cannot Access Device Location');
    }
    function location_permissions_success( status ) {
      if( !status.hasPermission ) location_permissions_error();
    }
    function local_mac_permissions_error() {
      alert('Cannot Access Device Location');
    }
    function local_mac_permissions_success( status ) {
      if( !status.hasPermission ) local_mac_permissions_error();
      alert(status);
      document.getElementById("macaddress").innerHTML = message;
    }

//    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
//            <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
//            <uses-permission android:name="android.permission.READ_PHONE_STATE" />

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    // document.getElementById('deviceready').classList.add('ready');
    // alert('navigator is: '+ navigator.vendor);

    // Device Plugin Required
     document.getElementById("version").innerHTML = device.cordova;
     document.getElementById("model").innerHTML = device.model;
     document.getElementById("platform").innerHTML = device.platform;
     document.getElementById("uuid").innerHTML = device.uuid;
     document.getElementById("androidVersion").innerHTML = device.version;
     document.getElementById("manufacturer").innerHTML = device.manufacturer; //device name
     document.getElementById("isvirtual").innerHTML = device.isVirtual;
     document.getElementById("serialNo").innerHTML = device.serial;


     // Geolocation
      // onSuccess Callback
    //   This method accepts a `Position` object, which contains
    //   the current GPS coordinates
    //
    function onGeoSuccess(position) {
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
                            'Longitude: ' + position.coords.longitude     + '<br />' +
                            '<hr />'      + element.innerHTML;
    }

    // onError Callback receives a PositionError object
    //
    function onGeoError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    // Options: throw an error if no update is received every 30 seconds.
    //
    var watchID = navigator.geolocation.watchPosition(onGeoSuccess, onGeoError, { timeout: 30000 });

    // ANDROID MEDIA PLAYER (DEVICE MEDIA NOT VIDEOJS)
    // play android files
//    $('#PlayAndroid').click ( function () {
//       // /storage/emulated/0/Download/videos/1.mp4
//      // var my_media = new Media('cdvfile://localhost/Download/videos/1.mp4',
//      // var my_media = new Media('/storage/emulated/0/Download/videos/1.mp4',
//      //   // success callback
//      //     function() {
//      //         alert("playAudio():Audio Success");
//      //         console.log("playAudio():Audio Success");
//      //     },
//      //     // error callback
//      //     function(err) {
//      //         alert("playAudio():Audio Error: "+err);
//      //         console.log("playAudio():Audio Error: "+err);
//      // });
//      // my_media.play({ playAudioWhenScreenIsLocked : true });
//      // my_media.setVolume('1.0');
//
//
//      // VideoPlayer.play("file:///android_asset/www/movie.mp4")
//      // VideoPlayer.play("/storage/emulated/0/Download/videos/1.mp4");
//      var video_array = [{
//        "/storage/emulated/0/Download/videos/1.mp4",
//        "/storage/emulated/0/Download/videos/2.mp4",
//        "/storage/emulated/0/Download/videos/3.mp4",
//        "/storage/emulated/0/Download/videos/4.mp4",
//        "/storage/emulated/0/Download/videos/5.mp4",
//        "/storage/emulated/0/Download/videos/6.mp4",
//        "/storage/emulated/0/Download/videos/7.mp4",
//        "/storage/emulated/0/Download/videos/8.mp4",
//        "/storage/emulated/0/Download/videos/9.mp4",
//        "/storage/emulated/0/Download/videos/10.mp4",
//        "/storage/emulated/0/Download/videos/11.mp4"
//      }];
//
//      // var the_videos;
//
//      $(video_array).each(function(index) {
//        console.log(index + ": " + $(this).text());
//        // the_videos = index;
//      });
//      VideoPlayer.play( "/storage/emulated/0/Download/videos/1.mp4",
//          {
//              volume: 1.0, // 0.0 - 1.0
//              scalingMode: VideoPlayer.SCALING_MODE.SCALE_TO_FIT_WITH_CROPPING
//          },
//          function () {
//              console.log("video completed");
//              alert("video completed");
//          },
//          function (err) {
//              console.log(err);
//              alert(err);
//          }
//      );
//    });
          

    // alert('wow');

    // IP Address || WORKS
    var params = {};
    addressimpl.request("getIPAddress", JSON.stringify(params), function(message) {
          console.info("ip address "+message);
          // alert('ip Address is : '+message);
          ipAddress = message;
        }, function() {
          console.info("failed on get ip address");
          alert("failed on get ip address");
        });

//     MAC + IP Plugin Required
     var params = {};
     addressimpl.request("getMACAddress", JSON.stringify(params), function(message) {
           console.info("mac address "+message);
           alert('mac Address is: '+message);
               macAddress = message;
//               alert(message);
               document.getElementById("macAd").innerHTML = macAddress;
               // alert(macAddress);
               document.getElementById("serialNo").innerHTML = device.serial;
         }, function() {
           console.info("failed on get mac address");
            // alert("failed on get mac address");
         });
// alert(macAddress);

    var getJSON = function(url) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('get', url, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
        var status = xhr.status;
        if (status == 200 || status == 0) {
          resolve(xhr.response);
        } else {
          reject(status);
        }
      };
      xhr.send();
    });
  };

// $('#testPHP').click(function () {
//   loadData = function (callbackFN) {
//     getJSON('js/test.json').then(function(data) {
//       callbackFN(data);
//       console.log('json data = ' + data);
//     }, function(status) {
//       console.log('Something went wrong with json Data file.');
//     });
//   }
// });

// $('#testPHP').click(function (callbackFN) {
//   getJSON('https://192.168.2.174/five_good/public/testPHP.php').then(function(data) {
//   // getJSON('js/test.json').then(function(data) {
//       // callbackFN(data);
//       console.log('json data = ' + data);
//       alert('json data = ' + data);
//       // var mydata = JSON.parse(jsondata);
//       // console.log(mydata[0].name);
//     }, function(status) {
//       console.log('Something went wrong with json Data file.');
//       alert('Something went wrong with json Data file.');
//     });
// });

  // var name_s = "some namme";
  // var uuid_s = "some id";
  // var amount_s = "some amount";
  // var proof_s = "some random proof";

//  Ajax Works with CORS Allowed
$('#testPHP').click( function () {
  $.ajax({
      type: "POST",
      url: 'https://192.168.7.14/five_good/public/testPHP.php',
      data: "device_mac_id="+ macAddress 
      +"&device_ip_address="+ ipAddress 
      +"&device_name="+ device.manufacturer 
      +"&device_model="+ device.model 
      +"&device_platform="+ device.platform 
      +"&device_manufacturer=" + device.manufacturer 
      +"&device_uuid=" + device.uuid 
      +"&device_version=" + device.version 
      +"&device_volume=0.5",
      success: function (response) {
        // $('#testResponse').html(response);
        alert('aJAX DATA is: '+response);
        console.log('aJAX DATA is: '+data);
        // console.log('aJAX DATA is: '+name_s);
      } ,
      error: function (jXHR, textStatus, errorThrown) {
        alert (errorThrown);
      }
    });
});

// Video Vertical
window.HELP_IMPROVE_VIDEOJS = false;

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('1cee39fda901f9b48558', {
  cluster: 'ap3'
});

var channel = pusher.subscribe('five-good');
channel.bind('advert', function(data) {
  alert(JSON.stringify(data));
  // alert(data.message);
  // player.updateSrc(data.message);
  status = data.message;
  device_volume = data.device_volume;
  video_url = data.video_url;

  player.updateSrc(data.video_url);
  player.src({ type: 'video/mp4', src: data.video_url });
  player.catalog.getVideo(data.video_url, function(error, video) {
    // Load the video object into the player
    player.catalog.load(video);
    player.play();
  });
});
         
// Playlist
var player = videojs('five-good-video', {
  autoplay: true,
  controls: true,
  inactivityTimeout: 0,
  preload: 'auto',
  poster: 'videos/poster.jpg',
  // playbackRates: [0.25, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4],
  fluid: true,
  plugins: {
    vjsdownload:{
      beforeElement: 'playbackRateMenuButton',
      textControl: 'Download video',
      name: 'downloadButton',
      downloadURL: '/storage/emulated/0/Download/videos/downloaded.mp4' //optional if you need a different download url than the source
    }
  }
  
}, function() {
  // this.volume(device_volume);
  console.log('Callback video-js initiated');
  alert('Callback video-js initiated');
  this.on('downloadvideo', function(){
    console.log('downloadvideo triggered');
    alert('downloadvideo triggered');
  });
});



player.playlist([
 {
  name: 'Video 1',
  sources: [{
    src: 'videos/1.mp4',
    type: 'video/mp4'
  }],
  poster: 'http://media.w3.org/2010/05/bunny/poster.png'
}, {
  name: 'Video 2',
  sources: [{
    src: 'videos/3.mp4',
    type: 'video/mp4'
  }],
  poster: 'http://media.w3.org/2010/05/bunny/poster.png'
}, {
  name: 'Video 3',
  sources: [{
    src: 'videos/4.mp4',
    type: 'video/mp4'
  }],
  poster: 'http://media.w3.org/2010/05/video/poster.png'
}, {
  name: 'Video 4',
  sources: [{
    src: 'videos/5.mp4',
    type: 'video/mp4'
  }],
  poster: 'http://media.w3.org/2010/05/video/poster.png'
}, {
  name: 'Video 5',
  sources: [{
    src: 'videos/6.mp4',
    type: 'video/mp4'
  }],
  poster: 'http://media.w3.org/2010/05/video/poster.png'
}, {
  name: 'Video 6',
  sources: [{
    src: 'videos/7.mp4',
    type: 'video/mp4'
  }],
  poster: 'http://media.w3.org/2010/05/video/poster.png'
}, {
  name: 'Video 7',
  sources: [{
    src: 'videos/8.mp4',
    type: 'video/mp4'
  }],
  poster: 'http://media.w3.org/2010/05/video/poster.png'
}, {
  name: 'Video 8',
  sources: [{
    src: 'videos/9.mp4',
    type: 'video/mp4'
  }],
  poster: 'http://media.w3.org/2010/05/video/poster.png'
}, {
  name: 'Video 9',
  sources: [{
    src: 'videos/10.mp4',
    type: 'video/mp4'
  }],
  poster: 'http://media.w3.org/2010/05/video/poster.png'
}, {
  name: 'Video 10',
  sources: [{
    src: 'videos/11.mp4',
    type: 'video/mp4'
  }],
  poster: 'http://media.w3.org/2010/05/video/poster.png'
}
]);


// Play through the playlist automatically.
player.playlist.autoadvance(0);
player.playlist.repeat(true);
player.playlist.repeat();
player.playlistUi();

player.on( 'ended', function() {
    if ( size == (player.playlist.currentItem() + 1)){
        player.playlist.first();
    }
});



// $('#screenCap').click( function () {
//   filePath = "videos/myScreenShot.jpg";
  
//   navigator.screenshot.save((error, res) =&gt; {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('File Path = ',res.filePath); //should be path/to/myScreenshot.jpg
//   }
// },'jpg',50,'myScreenShot');


// });
// // start video capture
// navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:2});
// });

// player.setVolume('0.0'); //  not a function
player.on('volumechange', () => {
    // player.volume(player.volume());
    console.log("volume is changing");
})






}