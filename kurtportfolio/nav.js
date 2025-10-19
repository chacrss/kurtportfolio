function initHoriSelector(navId, selectorClass) {
  function animate() {
    var tabs = $(navId);
    var activeItem = tabs.find(".active");
    if (!activeItem.length) return;

    var pos = activeItem.position();
    var height = activeItem.innerHeight();
    var width = activeItem.innerWidth();

    $(selectorClass).css({
      top: pos.top + "px",
      left: pos.left + "px",
      height: height + "px",
      width: width + "px",
    });
  }

  // Initial animation
  animate();

  // Click event
  $(navId).on("click", "li", function () {
    $(navId + " ul li").removeClass("active");
    $(this).addClass("active");
    animate();
  });

  // Window resize
  $(window).on("resize", function () {
    setTimeout(animate, 500);
  });

  // Navbar toggler for mobile
  $(".navbar-toggler").click(function () {
    $(".navbar-collapse").slideToggle(300);
    setTimeout(animate, 300);
  });
}

// Active link based on page
$(document).ready(function () {
  initHoriSelector("#navbarSupportedContent", ".hori-selector");

  var path = window.location.pathname.split("/").pop();
  if (!path) path = "index.html";

  var target = $('#navbarSupportedContent ul li a[href="' + path + '"]');
  if (target.length) target.parent().addClass("active");
});
