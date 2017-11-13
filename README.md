# Video Player

![alt text](https://help.github.com/assets/images/site/be-social.gif)

## Overview
* Simple JQUERY based JS to run the video player
  * Loads URL's using the REST API from Spring Boot Video Uploads: REST ENDPOINT:  http://159.203.192.45:8080//videos
  * Select videos from drop down.  Load video, and dispaly the meta data in JSON fromat.
* Plays Video Scrubbing Thumbnails
* Includes JSON, Thumbs, Sprite, and Test Video.
* Download,  Start local webserver and bring up player.html.
* Note, will not load remote Thumb, JSON files due to CORS.
  * Thus, deploy and configure on local server 
  * Or see test demo at [Player Demo](http://159.203.192.45/player.html#)
