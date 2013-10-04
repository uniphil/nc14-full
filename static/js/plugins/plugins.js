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
  if (/#learn|#innovate|#connect/.test($(this).attr('href'))) {
    return;
  }
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
    var padding_cheat = 19;
    var boxes = $("#learn, #innovate, #connect", lep_box);
    boxes.wrap('<div>').each(function() {
      $this = $(this);
      $this.parent().attr("id", $this.attr("id") + "-wrap");
    });
    $("a[href=#learn], a[href=#innovate], a[href=#connect]", lep_box).click(function() {
      $(".about-lep-tabs a", lep_box).removeClass("selected");
      $(".about-lep-tabs a[href=" + $(this).attr('href') + "]", lep_box).addClass("selected");
      $("#connect-wrap").css({width: width});
      switch($(this).attr("href")) {
        case "#learn":
          boxes.css({height: 'auto'}).height($("#learn").height());
          $("#learn-wrap").css({width: width});
          $("#innovate-wrap").css({width: width});
          $('.about-lep-tabs', lep_box).css({'margin-bottom': boxes.height() + padding_cheat});
          break;
        case "#innovate":
          boxes.css({height: 'auto'}).height($("#innovate").height());
          $("#learn-wrap").css({width: 0});
          $("#innovate-wrap").css({width: width});
          $('.about-lep-tabs', lep_box).css({'margin-bottom': boxes.height() + padding_cheat});
          break;
        case "#connect":
          boxes.css({height: 'auto'}).height($("#connect").height());
          $("#learn-wrap").css({width: 0});
          $("#innovate-wrap").css({width: 0});
          $('.about-lep-tabs', lep_box).css({'margin-bottom': boxes.height() + padding_cheat});
          break;
      }
      return false;
    });
    boxes.parent().css({width: 0});
  };

  var switcher_el = $('.about-lep');
  if (switcher_el.length > 0) {
    new Switcher(switcher_el);
  }
})();


//////////////////////
// Delegate Rotator //
//////////////////////
(function() {
  var range = function(min, max) {
    return Math.random() * (max - min) + min;
  };
  var choice = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  (function(els, words) {
    var word_time = function() { return range(1800, 2400); };
    var fade_time = 500;

    var test_excluded = function(exclusions, word) {
      if (word === undefined) {
        return false;
      }
      for(var i=0; i<exclusions.length; i++) {
        if (exclusions[i] === word) {
          return false;
        }
      }
      return true;
    };

    var fade_out = function(el) {
      el.css({opacity: 0});
      var exclusions = els.map(function() { return $(this).text(); });
      for (var next; !test_excluded(exclusions, next); next=choice(words));
      setTimeout(swap, fade_time, el, next);
    };

    var swap = function(el, word) {
      el.text(word).css({opacity: 1});
      if (el.hasClass('after-a')) {
        if (/^([aAeEiIoO]|NGO)/.test(el.text())) {
          el.prev().addClass('an');
        } else {
          el.prev().removeClass('an');
        }
      }
      setTimeout(fade_out, fade_time + word_time(), $(choice(els)));
    };

    fade_out($(choice(els)));
  })($(".maininner .d"), window.delegate_types);

})();
