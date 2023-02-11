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
        window.setTimeout(this.eventFunction["makeMove"], 250);
      }
      this.eventFunction["updateStatus"];
    }
    if(eventArr[0] == this.event_renamebot){
      this.botname = eventArr[1];
    }
    if(eventArr[0] == this.event_renamerelative){
      this.relativename = eventArr[1];
    }
  }
}
