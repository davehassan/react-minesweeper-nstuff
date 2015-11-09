(function () {
  "use strict";

  if (typeof window.Minesweeper === 'undefined') {
    window.Minesweeper = {};
  }

  var Game = React.createClass({
    getInitialState: function () {
      var board = new Minesweeper.Board(10, 5);
      return ({ board: board, isWon: false, isOver: false});
    },

    updateGame: function () {

    },

    render: function () {
      return (
        <Board board={this.state.board} updater={this.updateGame}/>
      );
    }
  });

  var Tile = React.createClass({


    render: function () {
      var text,
          className = "tile";

      if (this.props.tile.explored) {
        if (this.props.tile.bombed) {
          text = "💣";
          className += " bombed revealed";
        } else {
          text = this.props.tile.adjacentBombCount();
          className += " revealed";
        }
      } else if (this.props.tile.flagged) {
        text = "⚑";
        className += " flagged";
      }

      return (<div className={className}>{text}</div>);
    }
  });

  var Board = React.createClass({
    render: function () {

      return (<div className="board group">
          {
            this.props.board.grid.map(function (row, i) {
              var tiles = row.map(function(tile, j) {
                return (<Tile tile={tile} updater={this.props.updater} key={[i, j]} />);
              }.bind(this));
              return (<div className="row group" key={i}>{tiles}</div>);
            }.bind(this))
          }
        </div>);
    }
  });

  React.render(
    <Game />,
    document.getElementById("minesweeper")
  );
})();
