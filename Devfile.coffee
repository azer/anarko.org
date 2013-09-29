onejs = bin 'one/onejs'
stylus = bin 'stylus'
jsify = bin 'jsify'

all 'lib/templates.js', 'dist/index.html', 'dist/player.js', 'dist/player.css'

target 'dist/index.html', 'index.html', ->
    debug 'Building dist/player.js'
    cp 'index.html', 'dist/index.html'

target 'dist/player.js', '*.js', 'lib/*.js', 'node_modules', 'components', ->
    debug 'Building dist/player.js'
    onejs "index.js", "-o", "dist/player.js"

target 'dist/player.css', 'player.styl', ->
    debug 'Building dist/player.css'
    stylus "player.styl -o dist/"

target 'lib/templates.js', 'templates', ->
    jsify "templates/* -o lib/templates.js"

task 'deploy', ->
    mkdir '-p', 'prod'
    cp '-rf', 'dist/*', 'prod/.'
