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
// Delegate Rotater //
//////////////////////
(function() {
  var Rotater = function(thing) {

    var randinter = function(min, max) {
      return function() {
        return Math.floor(Math.random() * (max - min) + min);
      };
    };

    this.word_timeout = randinter(5000, 7000);
    this.clear_timeout = randinter(50, 70);
    this.type_timeout = randinter(50, 120);
    this.fade_pause = 500;

    this.world = thing;
    this.target_el = undefined;
    this.next_word = undefined;

    this.paused = true;

    this.displayed = [0, 1, 2];  // fixme

    this.rewrite_word = function() {
      if (this.paused) {
        $('.delegate-1,.delegate-2,.delegate-3', this.world).css({
          background: 'rgba(255, 255, 255, 0.2)'});
        this.paused = false;
        var $this = this;
        setTimeout(function(){$this.rewrite_word.apply($this);}, this.fade_pause);
        return;
      }
      this.paused = true;
      var next_i = (Math.ceil((Math.random() * 3)));
      this.target_el = $('.delegate-' + next_i, this.world);
      var next = Math.floor(Math.random() * window.delegate_types.length);
      this.next_word = window.delegate_types[next];
      this.erase_word();
    };

    this.erase_word = function() {
      var word = this.target_el.text();
      this.target_el.text(word.slice(0, word.length - 1));
      $this = this;
      if (word.length > 1) {
        setTimeout(function(){$this.erase_word.apply($this);}, this.clear_timeout());
      } else {
        setTimeout(function(){$this.write_word.apply($this);}, this.type_timeout());
      }
    };

    this.write_word = function() {

      var so_far = this.target_el.text();
      this.target_el.text(this.next_word.slice(0, so_far.length + 1));
      $this = this;
      if (so_far.length < this.next_word.length) {
        setTimeout(function(){$this.write_word.apply($this);}, this.type_timeout());
      } else {
        setTimeout(function(){$this.rewrite_word.apply($this);}, this.word_timeout());
        $('.delegate-1,.delegate-2,.delegate-3', this.world).css({
          background: 'white'});
      }
    };

    $this = this;
    setTimeout(function(){$this.rewrite_word.apply($this);}, this.word_timeout());

  };

  var rot_box = $(".maininner");
  if (rot_box.length > 0) {
    new Rotater(rot_box);
  }
})();
