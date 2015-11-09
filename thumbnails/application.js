(function () {
  "use strict";

  if (typeof window.Minesweeper === 'undefined') {
    window.Minesweeper = {};
  }

  var Thumbnails = React.createClass({
    getInitialState: function () {
      var initialPath = "http://localhost:8000/img/carl.jpeg";
      return ({selectedImg: initialPath, activeImg: initialPath});
    },

    handleClick: function (e) {
      e.preventDefault();
      this.setState({selectedImg: e.target.src});
    },

    mouseEnter: function (e) {
      e.preventDefault();
      this.setState({ activeImg: e.target.src });
    },

    mouseLeave: function (e) {
      e.preventDefault();
      this.setState({ activeImg: this.state.selectedImg });
    },

    render: function () {

      return (
        <div>
          <div className="active">
            <img src={this.state.activeImg} />
          </div>
          <div className="gutter-images group">
            <ul>
              {
                this.props.images.map(function (img, i) {
                  return <li key={i}>
                      <img onClick={this.handleClick} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} src={"./img/" + img} />
                    </li>;
                }.bind(this))
              }
            </ul>
          </div>
        </div>
      );
    }
  });

  var images = ["carl.jpeg", "jonathan-sempai.jpg", "lily.jpg", "tommy.jpeg"];

  React.render(
    <Thumbnails images={images} />,
    document.getElementById("thumbnails")
  );

})();
