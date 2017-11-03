/**********************************************************************
 * Code to Create thumbnails object for video-js consumption
 *  -Input params from JSON call to server or VTT file
 *********************************************************************/

/*
 * Example of thumbnails object to create for consumption by video plugin
 *
 video.thumbnails({
  0: {
    src: 'bunny_sprite.jpg',
    style: {
      width: '600px',
      height: '336px',
      left: '-50px',
      top: '-66px',
      clip: 'rect(0, 100px, 56px, 0)'
    }
  },
  1: {
    style: {
      left: '-150px',
      top: '-66px',
      clip: 'rect(0, 200px, 56px, 100px)'
    }
  },
 
*/

var spriteData = {
  name : 'bunny_sprites',
  thumbsCount : 36,
  thumbsSpacingSeconds : 1,
  thumbsWidth : 100,
  thumbsHeight : 56,
  spritePath : 'bunny_sprite.jpg',
  spriteCols : 6,
  spriteRows : 6,
  spriteWidth : 600,
  spriteHeight : 336,
  bottomOffset : 10   // distance between bottom of thumb to scrubber timeline
}

var thumbsApi = (function(){

  // Api
  return {
    getThumbNailsObj : function(){
      var thumbnails = {};
      var secondSpacing = spriteData.thumbsSpacingSeconds;
      var currentTime = 0;
      for (var currentRow = 0; currentRow < spriteData.spriteRows; currentRow++) {
        // process each row.
        for (var currentCol = 0; currentCol < spriteData.spriteCols; currentCol++) {
          // process each columns
          
          // first one needs src, width, height
          var currentThumbObj = {};
          var currentStyleObj = {}
          if(currentTime == 0){
            currentThumbObj['src'] = spriteData.spritePath;
            currentStyleObj['width'] = spriteData.spriteWidth + 'px';
            currentStyleObj['height'] = spriteData.spriteHeight + 'px';
          }
          thumbsW = spriteData.thumbsWidth;
          thumbsH = spriteData.thumbsHeight;
          currentStyleObj['left'] = -(thumbsW/2 + thumbsW * currentCol) + 'px'; 
          currentStyleObj['top'] =  -(thumbsH * (currentRow + 1) + spriteData.bottomOffset) + 'px';
          // Calculate 'clip' : rect clip(top, right, botto, left)
          var topC = (thumbsH * currentRow) + 'px';
          var rightC = (thumbsW * (currentCol + 1)) + 'px'; 
          var bottomC = (thumbsH * (currentRow + 1)) + 'px';
          var leftC = (thumbsW * currentCol) + 'px';
          var clipValue = 'rect(' + topC + ', ' + rightC + ', ' + bottomC + ', ' + leftC + ')'; 
          currentStyleObj['clip'] = clipValue;
          currentThumbObj['style'] = currentStyleObj;
          thumbnails[currentTime] = currentThumbObj;
          currentTime += secondSpacing; 
        }; // cols
      }; // rows

      return thumbnails;
      // return { 'name' : 'Greg'}

    }
  };

}(spriteData))



