var dom      = require('domquery'),
    render   = require('./render'),
    current  = require('./current'),
    playlist = require('./playlist'),
    view;

module.exports = {
  setup: setup
};

function onSongChange(start, stop){
  stop && stop.view.removeClass('selected');

  if(start){
    current.pause(false);
    start.view.addClass('selected');
    view.attr('src', start.url());
  }
}

function onPause(pause){
  if(pause){
    view[0].pause();
    return;
  }

  view[0].play();
}

function setup(){
  current.playing.subscribe(onSongChange);
  current.pause.subscribe(onPause);

  view = dom(render('player.html'))
    .on('ended', playlist.next)
    .insert('.container');
}
