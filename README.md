Chess.ai.js
===========
`Chess.ai.js` is AI crafted for playing chess. It uses minmax and alphabeta algorithms and can be easily tweaked to play other games (ex. checkers).

Example
-------
Example using [ChessboardJS](https://github.com/oakmac/chessboardjs/) as frontend is placed in directory `example`. You can run it directly in your browser [here](https://rawgit.com/krzkaczor/Chess.ai.js/master/example/index.html).

Development
-----------
Project uses `nodejs`. To run it in browser you need to use `browserify` and create bundle (I recomend using it with `watchify`). 
To start development just type:
		
	npm install
	

To build example and create bundle:

	watchify example/js/Game.js -o example/bundle.js

To run tests:
	
	npm test


Todo
----
- missing chess game elements (castling, pawn promotion etc.)
- more complicated game state measure
- implement other AI algorithms