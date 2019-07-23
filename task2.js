const Football = (function() {
  let player = 0;
  let goalkeeper = 0;
  let isGameStarted = false;

  function catching() {
    let random = Math.floor(Math.random() * 4 + 1);
    switch (random){
      case 1:
        $('#catcher').toggleClass('goalkeeper');
        $('#catcher').toggleClass('catch1');
        $('.catch1').animate({left:120,top:-50},600);
        return 'leftTop';
      case 2:
        $('#catcher').toggleClass('goalkeeper');
        $('#catcher').toggleClass('catch2');
        $('.catch2').animate({left:120},600);
        return 'leftBot';
      case 3:
        $('#catcher').toggleClass('goalkeeper');
        $('#catcher').toggleClass('catch3-4');
        $('.catch3-4').animate({left:370,top:-20},600);
        return 'rightTop';
      case 4:
        $('#catcher').toggleClass('goalkeeper');
        $('#catcher').toggleClass('catch3-4');
        $('.catch3-4').animate({left:350},600);
        return 'rightBot';
    }
  }

  function rebuting() {
    if($('#catcher').hasClass('catch1')){
      $('#catcher').toggleClass('catch1');
    }else if ($('#catcher').hasClass('catch2')) {
      $('#catcher').toggleClass('catch2');
    }else{
      $('#catcher').toggleClass('catch3-4');
    }
    $('.ball').animate({top:400, left: '50%'},500);
    $('#catcher').animate({left:'50%',top:100},500);
    $('#catcher').toggleClass('goalkeeper');
  }

  function notification (goal, score) {
    setTimeout(function () {
        if (goal == false) {
            alert(`The goalkeeper's ball!`);
        } else {
            alert('GOAL!');
        }
        if (score == 10) {
            if (goal == false) {
                alert('Goalkeeper wins!');
            } else {
                alert('You win!');
            }
            isGameStarted = false;
        }
        rebuting();
    }, 800)
  }

  function gaming(event) {
    event.preventDefault();
    let t = event.target;

    if(t.className.match('target')){
      if(isGameStarted == false){
        alert('Restart the game');
        return;
      }
      let test1 = catching();
      let test2 = t.className.slice(0, t.className.length - 7);
      $('.ball').animate({top:event.pageY,left:event.pageX},700);
      if(test1 == test2){
        goalkeeper +=1;
        $('#goalkeeper').html(goalkeeper);
        notification(false, goalkeeper);
      }else{
        player +=1;
        $('#player').html(player);
        notification(true, player);
      }
    }
  }

  function restart() {
    $('#restart').click(function () {
      isGameStarted = true;
      goalkeeper = 0;
      $('#goalkeeper').html(goalkeeper);
      player = 0;
      $('#player').html(player);
    })
  }

  function start() {
    $('#start').click(function () {
      isGameStarted = true;
      $('.ball').toggle(10);
      $('#start').toggle(10);
      $('#restart').toggle(10);
      $('.gate').on('click', gaming);
      restart();
    })
  }

  return{
    game:start
  }
})();
Football.game();
