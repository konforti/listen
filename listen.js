(function () {
  "use strict";

  var
      name = "listen-node",
      els = document.getElementsByClassName( name ),
      a, b, c;

  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".listen-node {display: inline-block; background:rgba(0, 0, 0, 0.05); padding: 1px 5px; border-radius:4px; cursor: pointer;} .listen-node i {font-size: 0.7em; border: 0.5em solid transparent; border-left: 0.75em solid; display: inline-block; margin-left: 5px;} .listen-node .playing { border: 0; border-left: 0.75em double; border-right: 0.5em solid transparent; height: 1em;}";
  document.getElementsByTagName("head")[0].appendChild(css);

  for ( var i = 0; b = els[i]; ++i ) {
    a = document.createElement( 'audio' );
    c = document.createElement( 'i' );

    a.src = b.getAttribute( "data-src" );
    a.setAttribute( "data-playing", "false" );

    b.id = name + "-" + i;
    b.insertBefore( c, b.firstChild );
    b.appendChild( a );
  }

  function _play( a, c ) {
    a.play();
    a.setAttribute( "data-playing", "true" );
    c.classList.add("playing");
  }

  function _pause( a, c ) {
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
      a.srt = parseInt( b.getAttribute( 'data-start' ) ) || 0;
      a.end = parseInt( b.getAttribute( 'data-end' ) ) || a.duration;

      if ( a && a.getAttribute( "data-playing" ) === "false" ) {
        if ( a.srt > a.currentTime || a.end < a.currentTime ) {
          a.currentTime = a.srt;
        }
        _play( a, c );
      }
      else {
        _pause( a, c );
      }

      (function loop() {
        var d = requestAnimationFrame( loop );
        var percent = (((a.currentTime - a.srt) * 100) / (a.end - a.srt));
        percent = percent < 100 ? percent : 100;
        b.style.background = "linear-gradient(to right, rgba(0, 0, 0, 0.1)" + percent + "%, rgba(0, 0, 0, 0.05)" + percent + "%)";

        if ( a.end < a.currentTime ) {
          _pause( a, c );
          cancelAnimationFrame( d );
        }
      })();
    }
  } );
})();

