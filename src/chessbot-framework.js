// chessbot-framework.js v1.0.0
// https://github.com/urobot2011/chessbot-framework.js/
//
// Copyright (c) 2023 urobot2011(esp32-urobot2011, urobot2011chess)
// Released under the MIT license
// https://github.com/urobot2011/chessbot-framework.js/blob/master/LICENSE.md

class chessbotFramework {
  constructor(board, game, eventFunction, botname, relativename) {
    console.log('chessbot-framework.js v1.0.0');
    this.board = board;
    this.game = game;
    this.eventFunction = eventFunction;
    this.botcolor = "b";
    this.botname = botname;
    this.relativename = this.relativename;
    
    this.event_start = "start";
    this.event_renamebot = "renamebot";
    this.event_renamerelative = "renamerelative";
    
    this.start_bool = 0;
  }
  chessbotStart(id = 'myBoard') {
    this.onDragStart = function (source, piece, position, orientation) {
      if (game.game_over()) return false;
      if (piece.search(/^${botcolor}/) !== -1) return false;
    };
    this.onDrop = function (source, target) {
      var move = game.move({
        from: source,
        to: target,
        promotion: 'q'
      });
      
      if (move === null) return 'snapback';
      this.eventFunction["makeMove"]();
    };
    this.onSnapEnd = function () {
      board.position(game.fen());
    };
    this.pieceTheme = function (piece) {
      if (piece.search(/w/) !== -1) {
        return 'https://urobot2011.github.io/SaveMartin/MartyBot/chessboardjs/img/chesspieces/wikipedia/' + piece + '.png';
      }
      return 'https://urobot2011.github.io/SaveMartin/MartyBot/chessboardjs/img/chesspieces/wikipedia/' + piece + '.png';
    };
    var config = {
      pieceTheme: this.pieceTheme,
      draggable: true,
      position: 'start',
      onDragStart: this.onDragStart,
      onDrop: this.onDrop,
      onSnapEnd: this.onSnapEnd
    };
    board = Chessboard(id, config);
  }
  event(eventArr) {
    if(eventArr[0] == this.event_start){
      this.start_bool = 1;
      game.load("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
      board.position("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
      board.orientation('white');
      if(this.botcolor == "b"){
        game.header('White', this.relativename);
        game.header('Black', this.botname);
      } else if(this.botcolor == "w"){
        game.header('Black', this.relativename);
        game.header('White', this.botname);
      }
      if(this.botcolor == "w"){
        board.position("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
        board.orientation('black');
        window.setTimeout(this.eventFunction["makeMove"](), 250);
      }
      this.eventFunction["updateStatus"]();
    }
    if(eventArr[0] == this.event_renamebot){
      this.botname = eventArr[1];
    }
    if(eventArr[0] == this.event_renamerelative){
      this.relativename = eventArr[1];
    }
  }
}
