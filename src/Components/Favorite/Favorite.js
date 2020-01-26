import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Favorite.css";

class Favorite extends React.Component {


  render(){

    return (
        <div className="container-fluid mx-auto text-center">
          <div className="row">
            <h2 className="col-12">Your Favorited</h2>
            {this.props.children}
          </div>
        </div>
      );
  }
};
export default Favorite;
