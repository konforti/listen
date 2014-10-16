(function() {
  var wp = document.getElementById( 'wp' ).checked;
  var embedScript = '<script>(function(d,s,id){var js, fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src="http://konforti.net/listen/listen.js";fjs.parentNode.insertBefore(js,fjs);})(document,"script","listen-embed");</script>';
//  var embedScript = '<script async src="http://konforti.net/listen/listen.js"></script>';

  /**
   * Update embed code.
   */
  var updateCode = function () {
    var text = document.getElementById( 'text' ).value;
    var file = document.getElementById( 'file' ).value;
    var start = document.getElementById( 'start' ).value;
    var end = document.getElementById( 'end' ).value;
    var code = '';

    if ( wp ) {
      code = '[listen src="' + file + '" start="' + start + '" end="' + end + '"]' + text + '[/listen]';
    }
    else {
      code = '<span class="listen-node" data-src="' + file + '" data-start="' + start + '" data-end="' + end + '">' + text + '</span>' + embedScript;
    }

    document.getElementById( 'code' ).value = code;
  }

  /**
   * Update audio player.
   */
  var updatePlayer = function() {
    var file = document.getElementById( 'file' ).value;
    document.getElementById( 'player' ).setAttribute( "src", file );
  }

  // On changes.
  document.addEventListener( 'paste', function ( e ) {
    if ( e.target.type === 'text' ) {
      updateCode();
    }
    if (e.target.id === 'audio') {
      updatePlayer();
    }
  } );

  // On keyup.
  document.addEventListener( 'keyup', function ( e ) {
    if ( e.target.type === 'text' ) {
      updateCode();
    }
    if (e.target.id === 'audio') {
      updatePlayer();
    }
  } );

  // On click
  document.addEventListener( 'click', function ( e ) {
    if ( e.target.id == 'start-btn' ) {
      document.getElementById( 'start' ).value = document.getElementById( 'player' ).currentTime.toFixed();
      updateCode();
    }
    else if ( e.target.id == 'end-btn' ) {
      document.getElementById( 'end' ).value = document.getElementById( 'player' ).currentTime.toFixed();
      updateCode();
    }
  } );

 // On change
  document.addEventListener( 'change', function ( e ) {
    if ( e.target.id == 'wp' ) {
      wp = e.target.checked;
      updateCode();
    }
  } );

  updateCode();
  updatePlayer();
})();
