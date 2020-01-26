import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Beers.css";
import { FiStar } from "react-icons/fi";
import { GoStar } from "react-icons/go";

class Beers extends React.Component {
  state = {
    isClicked: true
  };

  handleClick = (id, isClicked) => {
    
    this.props.handleFavorite(id, isClicked);

    this.setState({
      isClicked: !this.state.isClicked
    });
  };

  render() {
    const { id, src, title, abv, description, isClicked = this.state.isClicked } = this.props;

    return (
      <div className="col-3">
        <div id={id} className="card mb-3 p-3">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={src} className="card-img" alt="beer"></img>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  {title}
                  <span
                    className="float-right"
                    onClick={() => this.handleClick(id, isClicked)}
                  >
                    {/* {this.state.isClicked ? (<GoStar />) : (<FiStar />)} */}
                    {isClicked ? <FiStar /> : <GoStar />}
                  </span>
                </h5>
                <p className="card-text">ABV : {abv}</p>
                <p className="card-text">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Beers;
