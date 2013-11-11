$(function() {
  $('.overlay .button').click(function() {
    $('#email').focus();
  });
});

function checkScroll(event){
  if($(window).scrollTop() >= lockPoint){
    $body.addClass("hlock");
  }else{
    $body.removeClass('hlock');
  }
}

var $lockBar = $('#navheader'), $body = $('body'), lockPoint = $lockBar.offset().top;
$(window).scroll(function() {
  checkScroll();
});
