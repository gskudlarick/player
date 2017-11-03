/**********************************************************************
 * Raw JS utilities methods for loading Video Player
 * -Notes:  Sequence important,  Thus put init conrols in data cb.
 *********************************************************************/


// Constants
// var API_VIDEO_LIST = "/assets/media_data.json";
var API_VIDEO_LIST = "http://159.203.192.45:8080//videos";
// var API_VIDEO_LIST = "https://159.203.192.45:8080//videos";

var jsonThumbsData;
var jsonMediaData;
var currentMediaList;
var selectedMediaData;
var myPlayer;
$(document).ready(function() {
  // Default init
  myPlayer= videojs('video-element');
  initBunnyLocal();
  initApp();
});

function initApp() {
  initData();
  initPlayTestButtons();
}

// just for initial screen
// Local Testing Showing Bunny.
function initBunnyLocal(){
  myPlayer.src('http://159.203.192.45/assets/bunny.mp4')
  $.getJSON('/assets/bunny_thumbs.json', function(data){
      myPlayer.thumbnails(data);
  });
}

/*******************************************
 * init data obj from JSON
 ******************************************/
function initData() {
  // TODO Ajax Rest API
  $.getJSON(API_VIDEO_LIST, function(data){
    currentMediaList = data;
    buildMediaDropDownList(data); 
    initMediaSelectionControls();
  });
}
/**********************************************************************
 * Click Handlers for Selecting Media from Drop Down
 *********************************************************************/
function initMediaSelectionControls(){

  // DROPDOWN SELECT EVENT
  $(".dropdown-menu li a").click(function(){
    console.log($(this).attr("value") );
    theValue= $(this).attr("value") ;
    type= $(this).attr("type") ;
    thumbsJson = type = $(this).attr("thumbs-json") ;
    mediaId = $(this).attr("mediaid");
    selectedMediaData =  findObjById(mediaId, currentMediaList);
    $('#media-url-input').val(theValue);
  });

  //  LOAD MEDIA BUTTON EVENT
  $("#load-media-btn").click(function() {
    var mediaUrl = $('#media-url-input').val();
    var videoThumbsJsonUrl = selectedMediaData.videourls.videoThumbsJsonUrl;
    myPlayer.src(mediaUrl);
    myPlayer.poster(selectedMediaData.videourls.videoPosterUrl);
    $.getJSON(videoThumbsJsonUrl, function(data){
      currentThumbData = data;
      myPlayer.thumbnails(data);
    });
    displayJson(selectedMediaData);
  });

  // POPULATE SELECT MEDIA DROP DOWN LIST  <ul class="dropdown-menu">

}

/*******************************************
 * Loop to Build the list item. <li><a href></li>
 ******************************************/
  function buildMediaDropDownList(items){
    var $menu = $(".dropdown-menu");
    $.each(items, function () {
      $menu.append(
        getMenuItem(this)
        );
    });
    //$menu.menu();

  }

// Build the specific <li> <a> </li>
  function getMenuItem(mediaItem){
  var item = $("<li role='presentation'>")
    .append(
      $("<a>", {
        mediaid: mediaItem.mediaId, 
        value : mediaItem.videourls.videoUrl,
        html: mediaItem.name,
        href: '#',
        role: 'menuitem'
      }));
    var alpha = "hello";
    return item;
};


/*******************************************
 * Click Handlers for Buttons
 * Raw Tests for POC. --Keep for debugging.
 ******************************************/
function initPlayTestButtons(){

  //Load Bunny Video Button
  $("#selectBunny").click(function(evt){
    $.getJSON("/assets/bunny_thumbs.json", function(data){
      jsonThumbsData = data;
      console.log("Using JSON DATA: " + typeof(jsonThumbsData) + ' jsonThumbsData=' + JSON.stringify(jsonThumbsData));
      myPlayer.thumbnails(data);
    });
    myPlayer.src('/assets/bunny.mp4');
    myPlayer.poster("/assets/bunny_sprite.jpg");
  });

  // Load Chucky Video Button
  $("#selectChucky").click(function(evt){
    $.getJSON("/assets/chucky_thumbs.json", function(data){
      jsonThumbsData = data;
      console.log("Using JSON DATA: " + typeof(jsonThumbsData) + ' jsonThumbsData=' + JSON.stringify(jsonThumbsData));
      myPlayer.thumbnails(data);
    });
    myPlayer.src('/assets/chucky.mp4');
    myPlayer.poster("/assets/chucky_sprite.jpg");
  });
}
/*******************************************
 * Utility Functions
 ******************************************/
function findObjById(id, list){
  var obj = null;
  list.forEach(function(element){
    if(element.mediaId == id)
      obj = element;
  })
  return obj;
}

function findByMediaId(id, list){
  for(let i=0; 1< list.length; i++) {
    if (list[i].mediaId == id)
      return list[i];
  }
}

function displayJson(obj){
  var str = JSON.stringify(obj, undefined, 4);
  var str2 = this.syntaxHighlight(str);
  document.getElementById("json-display").innerHTML = "";
  document.getElementById("json-display").appendChild(document.createElement('pre')).innerHTML = str2;
}

/**********************************************************************
 * Syntax Highlight JSON
 *  1. First convert to OBJ, then back e.g.
 *  2. see example below o fhow to Call this.
 *********************************************************************/

function syntaxHighlight(json) {
   json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
   return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
       var cls = 'number';
       if (/^"/.test(match)) {
           if (/:$/.test(match)) {
               cls = 'key';
           } else {
               cls = 'string';
           }
       } else if (/true|false/.test(match)) {
           cls = 'boolean';
       } else if (/null/.test(match)) {
           cls = 'null';
       }
       return '<span class="' + cls + '">' + match + '</span>';
   });
}

/*
        // work around for syntax JSON SYNTAX
        var jsonObj =  JSON.parse(response.text());
        var str = JSON.stringify(jsonObj, undefined, 4);
        this.returnedVideosData = str;
        this.returnedVideosData = this.syntaxHighlight(str);
        var str2 = this.syntaxHighlight(str);
         // var node = document.createElement('pre').innerHTML = str;
        document.getElementById("show-videos").innerHTML = "";
        document.getElementById("show-videos").innerHTML='<p class="p1" >From Spring Boot Rest Api Call (see Network console ) <span class="rest">http://159.203.192.45:8080//videos</span></p>'
        document.getElementById("show-videos").appendChild(document.createElement('pre')).innerHTML = str2;
*/
