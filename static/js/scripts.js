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
