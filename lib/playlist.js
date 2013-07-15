var dom     = require('domquery'),
    shuffle = require('shuffle-array'),
    current = require('./current'),
    content = require('../content'),
    render  = require("./render"),
    newSong = require('./song'),
    songs   = [];

module.exports = {
  next: next,
  prev: prev,
  songs: songs,
  setup: setup
};

function next(){
  songs[(current.index() + 1) % songs.length].play();
}

function prev(){
  songs.slice(current.index() - 1)[0].play();
}

function setup(){
  dom('.container').add(render('playlist.html'));

  var album, title, song, ind;
  for ( album in content ) {
    for ( title in content[album] ) {
      songs.push(song = newSong(content[album][title], title)) - 1;
    }
  }

  songs = shuffle(songs);
  var i = -1, len = songs.length;
  while ( ++i < len ){
    songs[i].index(i);
    songs[i].show();
  }
}
