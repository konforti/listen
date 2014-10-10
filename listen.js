(function () {
  var
      name = "listen-node",
      els = document.getElementsByClassName( name ),
      a, b, c;

  for ( var i = 0; b = els[i]; ++i ) {
    a = document.createElement( 'audio' );
    c = document.createElement( 'i' );

    a.src = b.getAttribute( "data-src" );
    a.setAttribute( "data-playing", "false" );

    b.id = name + "-" + i;
    b.style.display = "inline-block";
    b.style.background = "rgba(0, 0, 0, 0.05)";
    b.style.padding = "1px 5px";
    b.style.borderRadius = "4px";
    b.style.cursor = "pointer";

    c.style.fontSize = '0.7em';
    c.style.border = '0.5em solid transparent';
    c.style.borderLeft = '0.75em solid';
    c.style.display = "inline-block";
    c.style.marginLeft = "5px";

    b.insertBefore( c, b.firstChild );
    b.appendChild( a );
  }

  function lPlay( a, c ) {
    a.play();
    a.setAttribute( "data-playing", "true" );
    c.style.border = 0;
    c.style.borderLeft = "0.75em double";
    c.style.borderRight = "0.5em solid transparent";
    c.style.height = "1em";
  }

  function lPause( a, c ) {
    a.pause();
    a.setAttribute( "data-playing", "false" );
    c.style.border = '0.5em solid transparent';
    c.style.borderLeft = '0.75em solid';
    c.style.height = "auto";
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

