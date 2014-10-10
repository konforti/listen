(function () {
  var
      name = "listen-node",
      basePath = "http://konforti.net/listen/",
      els = document.getElementsByClassName( name ),
      a, b, c;

  var css=document.createElement("link");
  css.setAttribute("rel", "stylesheet");
  css.setAttribute("type", "text/css");
  css.setAttribute("href", basePath);
  if (typeof css!="undefined"){
    document.getElementsByTagName("head")[0].appendChild(css)
  }

  for ( var i = 0; b = els[i]; ++i ) {
    a = document.createElement( 'audio' );
    c = document.createElement( 'i' );

    a.src = b.getAttribute( "data-src" );
    a.setAttribute( "data-playing", "false" );

    b.id = name + "-" + i;
    b.insertBefore( c, b.firstChild );
    b.appendChild( a );
  }

  function lPlay( a, c ) {
    a.play();
    a.setAttribute( "data-playing", "true" );
    c.classList.add("playing");
  }

  function lPause( a, c ) {
    a.pause();
    a.setAttribute( "data-playing", "false" );
    c.classList.remove("playing");
  }

  document.addEventListener( 'click', function ( e ) {
    var a, b, c;
    if ( e.target.className === name ) {
      a = e.target.children[1];
      b = e.target;
      c = e.target.children[0];
    }
    else if ( e.target.parentElement && e.target.parentElement.className === name ) {
      a = e.target.parentElement.children[1];
      b = e.target.parentElement;
      c = e.target;
    }

    if (a && b && c) {
      a.start = parseInt( b.getAttribute( 'data-start' ) ) || 0,
          a.end = parseInt( b.getAttribute( 'data-end' ) ) || a.duration;

      if ( a && a.getAttribute( "data-playing" ) === "false" ) {
        if ( a.start > a.currentTime || a.end < a.currentTime ) {
          a.currentTime = a.start;
        }
        lPlay( a, c );
      }
      else {
        lPause( a, c );
      }

      a.addEventListener( 'playing', function () {

      });
      (function loop() {
        var d = requestAnimationFrame( loop );
        var percent = (((a.currentTime - a.start) * 100) / (a.end - a.start));
        percent = percent < 100 ? percent : 100;
        b.style.background = "linear-gradient(to right, rgba(0, 0, 0, 0.1)" + percent + "%, rgba(0, 0, 0, 0.05)" + percent + "%)";

        if ( a.end < a.currentTime ) {
          lPause( a, c );
          cancelAnimationFrame( d );
        }
      })();
    }
  } );
})();

