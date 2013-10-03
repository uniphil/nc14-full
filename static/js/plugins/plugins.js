// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

/////////////////////////////////////
// CSS-Tricks smooth-scroll plugin //
/////////////////////////////////////
// from http://css-tricks.com/snippets/jquery/smooth-scrolling/

function filterPath(string) {
  return string
    .replace(/^\//,'')
    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
    .replace(/\/$/,'');
}
var locationPath = filterPath(location.pathname);
var scrollElem = scrollableElement('html', 'body');

$('a[href*=#]').each(function() {
  var thisPath = filterPath(this.pathname) || locationPath;
  if (locationPath == thisPath &&
      (location.hostname == this.hostname || !this.hostname) &&
      this.hash.replace(/#/,'') ) {
    var $target = $(this.hash), target = this.hash;
    if (target) {
      var targetOffset = $target.offset().top;
      $(this).click(function(event) {
        event.preventDefault();
        $(scrollElem).animate({scrollTop: targetOffset}, 400, function() {
          location.hash = target;
        });
      });
    }
  }
});

// use the first element that is "scrollable"
function scrollableElement(els) {
  for (var i = 0, argLength = arguments.length; i <argLength; i++) {
    var el = arguments[i],
        $scrollElement = $(el);
    if ($scrollElement.scrollTop()> 0) {
      return el;
    } else {
      $scrollElement.scrollTop(1);
      var isScrollable = $scrollElement.scrollTop()> 0;
      $scrollElement.scrollTop(0);
      if (isScrollable) {
        return el;
      }
    }
  }
  return [];
}


////////////////////
// LEP Switcheroo //
////////////////////
(function() {
  var Switcher = function(lep_box) {
    var width = lep_box.width();
    var tab_height = 198;  //$(".about-lep-tabs").height()
    var padding_cheat = 26;
    var boxes = $("#learn, #innovate, #connect", lep_box);
    boxes.wrap('<div>').each(function() {
      $this = $(this);
      $this.parent().attr("id", $this.attr("id") + "-wrap");
    });
    $(".about-lep-tabs a", lep_box).click(function() {
      $(".about-lep-tabs a", lep_box).removeClass("selected");
      $(this).addClass("selected");
      switch($(this).attr("href")) {
        case "#learn":
          $("#learn-wrap").css({width: width});
          $("#innovate-wrap").css({width: width});
          break;
        case "#innovate":
          $("#learn-wrap").css({width: 0});
          $("#innovate-wrap").css({width: width});
          break;
        case "#connect":
          $("#learn-wrap").css({width: 0});
          $("#innovate-wrap").css({width: 0});
          break;
      }
    });
    var max_height = 0;
    boxes.each(function() {
      var test_h = $(this).height();
      if (test_h > max_height){
        max_height = test_h;
      }
    });
    max_height += padding_cheat * 2;
    $('.about-lep-tabs', lep_box).css({'margin-bottom': max_height - padding_cheat - 1});
    boxes.height(max_height);
  };

  var switcher_el = $('.about-lep');
  if (switcher_el.length > 0) {
    new Switcher(switcher_el);
  }
})();
