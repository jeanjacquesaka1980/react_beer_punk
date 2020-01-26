import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Research.css";

class Research extends React.Component {

  render() {
    const { onChange, onClick } = this.props;
    return (
      <header className="container mx-auto text-center">
        <div className="row">
          <div className="input-group m-3">
            <input
              onChange={onChange}
              type="text"
              className="form-control"
              placeholder="Looking for some beers ?"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            ></input>
            <div className="input-group-append">
              <button onClick={onClick} type="button" className="btn">
                Search
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Research;
