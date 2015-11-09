(function () {
  "use strict";

  if (typeof window.Minesweeper === 'undefined') {
    window.Minesweeper = {};
  }

  var Game = React.createClass({
    getInitialState: function () {
      var board = new Minesweeper.Board(10, 10);
      return ({ board: board, isWon: false, isOver: false});
    },

    updateGame: function (tile, flagging) {
      if (flagging) {
        tile.toggleFlag();
      } else {
        tile.explore();
      }

      if (this.state.board.won()) {
        this.setState({ board: this.state.board, isWon: true, isOver: true});
      } else if (this.state.board.lost()) {
        this.setState({ board: this.state.board, isWon: false, isOver: true});
      } else {
        this.setState({ board: this.state.board });
      }
    },

    restartGame: function () {
      var board = new Minesweeper.Board(10, 5);
      this.setState({ board: board, isWon: false, isOver: false});
    },

    render: function () {
      var modal = function () {
        if (this.state.isOver) {
          var text;
          if (this.state.isWon) {
            text = "You Won!!";
          } else {
            text = "You Lost :(";
          }
          return (
            <section id="modal" className="modal is-active">
              <div className="modal-content">
                <h1>{text}</h1>
                <button onClick={this.restartGame}>Restart Game</button>
              </div>
              <div className="modal-screen"></div>
            </section>
          );
        } else {
          return "";
        }
      }.bind(this);

      return (
        <div>
          {modal()}
          <Board board={this.state.board} updater={this.updateGame}/>
        </div>
      );
    }
  });

  var Tile = React.createClass({
    handleClick: function (e) {
      e.preventDefault();
      this.props.updater(this.props.tile, e.altKey);
    },

    render: function () {
      var text,
          className = "tile";

      if (this.props.tile.explored) {
        if (this.props.tile.bombed) {
          text = "💣";
          className += " bombed revealed";
        } else {
          text = this.props.tile.adjacentBombCount();
          text = (text === 0 ? "" : text);
          className += " revealed";
        }
      } else if (this.props.tile.flagged) {
        text = "⚑";
        className += " flagged";
      }

      return (<div onClick={this.handleClick} className={className}>{text}</div>);
    }
  });

  var Board = React.createClass({
    render: function () {
      var className = "";

      if (this.props.board.won()) {
        className += "won ";
      } else if (this.props.board.lost()) {
        className += "lost ";
      }

      return (<div className={className + "board group"}>
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
