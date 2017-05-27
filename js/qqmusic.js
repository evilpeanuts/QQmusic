$(function(){
  var database=[
    {name:'Best Day Of My Life',singer:'American Authors',time:'3:14',src:'./musics/1.mp3'},
    {name:'Go Big Or Go Home',singer:'American Authors',time:'4:14',src:'./musics/2.mp3'},
    {name:'If You Feel My Love',singer:'Blaxy Girls',time:'5:12',src:'./musics/3.mp3'},
    {name:'U Make Me Wanna',singer:'Blue',time:'3:45',src:'./musics/4.mp3'},
    {name:'Roar',singer:'Katy Perry',time:'4:20',src:'./musics/5.mp3'}
  ];
  var audio=$('audio').get(0);
  var volume=($('.valume-bar').width()/$('.volume-regulate').width()).toFixed(2);
  var render=function(){
    $('.music-list').empty();
    $.each(database,function(i,v){
      $('.music-list').append('<li><span class="music-name">'+v.name+'</span><span class="singer-name">'+v.singer+'</span><span class="play-time">'+v.time+'</span></li>');
    });
    $('.open-list span').text(database.length);
  }
  render();
  $('.play-btn').on('click',function(){
    if(audio.paused){
      audio.play();
    }else{
      audio.pause();
    }
  })
  $('audio').on('play',function(){
    $('#pause').removeClass('play-btn').addClass('pause-btn');
    audio.volume = volume;
  })

  $('audio').on('pause',function(){
    $('#pause').removeClass('pause-btn').addClass('play-btn');
  })

  $('.player-bar').on('click',function(e){
    var percent = (e.offsetX/$(this).width());
    audio.currentTime = audio.duration * percent;
    // console.log(percent,audio.currentTime)
  })

  // $('.player-bar').on('mousedown',function(){
  //   $(this).on('mousemove',function(e){
  //     console.log(e)
  //     var width = (e.offsetX/$('.player-bar').width()).toFixed(2)*100+'%';
  //     $('.current-bar').css('width',width);
  //     $('.progress-bar').css('left',width);
  //   })
  //   $(this).on('mouseup',function(e){
  //     var width = (e.offsetX/$('.player-bar').width()).toFixed(2)*100+'%';
  //     $('.current-bar').css('width',width);
  //     $('.progress-bar').css('left',width);
  //   })
  // })

  $('audio').on('timeupdate',function(){
    var width = audio.currentTime/audio.duration.toFixed(2)*100+'%';
    $('.current-bar').css('width',width);
    $('.progress-bar').css('left',width);
  })

  $('.volume-regulate').on('click',function(e){
    var percent = (e.offsetX/$(this).width()).toFixed(2);
    audio.volume = percent;
  })

  $('audio').on('volumechange',function(){
    let width = (this.volume).toFixed(2)*100 + '%';
    $('.valume-op').css('left',width);
    $('.valume-bar').css('width',width);
    if(this.volume==0){
      $('.volume-icon').removeClass('volume-icon').addClass('volume-mute');
    }else{
      $('.volume-mute').removeClass('volume-mute').addClass('volume-icon');
    }
  })


  volume=($('.valume-bar').width()/$('.volume-regulate').width()).toFixed(2);
  $('.volume-icon').on('click',function(){
    if(audio.volume==0){
      audio.volume = volume;
    }else{
      audio.volume=0;
    }
  })


  current = 0;

  var changeSong=function(){
    var key = database[current];
    audio.src=key.src;
    audio.play();
    $('.music-list li').removeClass('active');
    $('.music-list li:eq('+current+')').addClass('active');
    $('.music-name-t').text(key.name);
    $('p.singer-name').text(key.singer);
    $('.play-date').text(key.time);
  }

  $('.music-list').on('click','li',function(){
    current = $(this).index();
    changeSong()
  })

   $('.next-btn').on('click',function(){
     current+=1;
     if(current==database.length){
       current=0;
     }
     changeSong();
   })
   $('.prev-btn').on('click',function(){
     current-=1;
     if(current==-1){
       current=database.length-1;
     }
     changeSong();
   })

   $('.clear-list').on('click',function(){
     console.log(1)
     database=[];
     render();
   })






})
