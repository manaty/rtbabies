[
  "js/jquery-1.10.2.min.js",
  "js/include_objects.php",
  "js/rtbgame_1.0.js"
].forEach(function(src) {
  var script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.head.appendChild(script);
});
 