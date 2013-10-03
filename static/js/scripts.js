$(function() {
  $('.overlay .button').click(function() {
    $('#email').focus();
  });
});

function checkScroll(event){
  console.log($(window).scrollTop(), lockPoint)
  if($(window).scrollTop() >= lockPoint){
    $lockBar.addClass("hlock");
    $main.addClass("mlock");
  }else{
    $lockBar.removeClass('hlock');
    $main.removeClass('mlock');
  }
}

$('#navheader').removeClass('hlock');
var $lockBar = $('#navheader'), $main = $('main'), lockPoint = $lockBar.offset().top + 60;
$(window).scroll(function() {
  checkScroll();
});
