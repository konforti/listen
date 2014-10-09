(function() {
  var
    name = "listen",
    els = document.getElementsByClassName(name),
    a, b, c;

  for ( var i = 0; b = els[i]; ++i ) {
    a = document.createElement( 'audio' );
    c = document.createElement( 'div' );

    a.src = b.getAttribute("data-src");
    a.setAttribute("data-playing", "false");

    b.id = name + "-" + i;
    b.style.display = "inline-block";
    b.style.background = "#eee";
    b.style.padding = "1px 5px";
    b.style.borderRadius = "4px";

    c.style.fontSize = '0.7em';
    c.style.border = '0.5em solid transparent';
    c.style.borderLeft = '0.75em solid';
    c.style.display = "inline-block";
    c.style.marginRight = "-0.25em";


    b.insertBefore( c, b.firstChild);
    b.appendChild(a);
  }

  document.addEventListener('click', function(e) {
    var a;
    if (e.target.className === name) {
      a = e.target.children[1];
      c = e.target.children[0];
    }
    else if (e.target.parentElement.className === name) {
      a = e.target.parentElement.children[1];
      c = e.target;
    }
    if (a && a.getAttribute("data-playing") === "false") {
      a.play();
      a.setAttribute("data-playing", "true");
      e.target.children[1];
      c.style.border = 0;
      c.style.borderLeft = "0.75em double";
      c.style.borderRight = "0.5em solid transparent";
      c.style.height = "1em";
    }
    else {
      a.pause();
      a.setAttribute("data-playing", "false");
      c.style.border = '0.5em solid transparent';
      c.style.borderLeft = '0.75em solid';
      c.style.height = "auto";
    }

    a.addEventListener('timeupdate', function(e) {
      var b = e.target.parentElement;
      var percent = ((this.currentTime * 100) / this.duration);
      b.style.background = "linear-gradient(to right, rgba(0, 0, 0, 0.15)" + percent + "%, rgba(0, 0, 0, 0.05)" + percent + "%)";
    });
  });
})();
