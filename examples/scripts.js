(function() {
  var embedScript = '<script>(function(d,s,id){var js, fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src="http://konforti.net/listen/listen.js";fjs.parentNode.insertBefore(js,fjs);})(document,"script","listen-embed");';

// Update embed code.
  var embedCode = function () {
    var text = document.getElementById( 'text' ).value;
    var file = document.getElementById( 'file' ).value;
    var start = document.getElementById( 'start' ).value;
    var end = document.getElementById( 'end' ).value;
    document.getElementById( 'code' ).value = '<span class="listen-node" data-src="' + file + '" data-start="' + start + '" data-end="' + end + '">' + text + '</span>' + embedScript;
  }

  var updatePlayer = function() {
    var file = document.getElementById( 'file' ).value;
    document.getElementById( 'player' ).setAttribute( "src", file );
  }

// On changes.
  document.addEventListener( 'paste', function ( e ) {
    if ( e.target.type === 'text' ) {
      embedCode();
    }
    if (e.target.id === 'audio') {
      updatePlayer();
    }
  } );
  document.addEventListener( 'keyup', function ( e ) {
    if ( e.target.type === 'text' ) {
      embedCode();
    }
    if (e.target.id === 'audio') {
      updatePlayer();
    }
  } );

  document.addEventListener( 'click', function ( e ) {
    if ( e.target.id == 'start-btn' ) {
      document.getElementById( 'start' ).value = document.getElementById( 'player' ).currentTime.toFixed();
      embedCode();
    }
    else if ( e.target.id == 'end-btn' ) {
      document.getElementById( 'end' ).value = document.getElementById( 'player' ).currentTime.toFixed();
      embedCode();
    }
  } );

  embedCode();
  updatePlayer();
})();
