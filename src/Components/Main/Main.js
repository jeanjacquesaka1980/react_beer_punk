import React from "react";
import "bootstrap/dist/css/bootstrap.css";

// import library
import beerList from "../../library/library";

// import components
import Research from "../Research/Research";
import Beers from "../Beers/Beers";
import Favorite from "../Favorite/Favorite";

// import { FiStar } from "react-icons/fi";
// import { GoStar } from "react-icons/go";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayBeers: "",
      searchInput: "",
      favorited: ""
      // isClicked: false
    };
    this.beers = [];
    this.newBeersList = [];
  }

  handleSearch = e => {
    this.setState({
      searchInput: e.target.value
    });
  };

  componentDidMount() {
    fetch("https://api.punkapi.com/v2/beers?per_page=10")
      .then(response => {
        return response.json();
      })
      .then(datas => {
        const BEERS = [];

        datas.map(el => {
          const ID = el.id;
          const SRC = el.image_url;
          const TITLE = el.name;
          const ABV = el.abv;
          const DESCRIPTION = el.description;
          let { isfavorited = false } = this.props;

          const LIST_BEERS = new beerList(
            ID,
            SRC,
            TITLE,
            ABV,
            DESCRIPTION,
            isfavorited
          );
          this.beers.push(LIST_BEERS);

          BEERS.push(
            <Beers
              isfavorited={isfavorited}
              handleFavorite={this.handleFavorite}
              key={ID}
              id={ID}
              src={SRC}
              title={TITLE}
              abv={ABV}
              description={DESCRIPTION.slice(0, 200) + "..."}
            />
          );
        });

        console.log(BEERS);

        this.setState({
          displayBeers: BEERS
        });
      });
  }

  handleSearchValidation = () => {
    let beersList = [];

    const SEARCH_INPUT = this.state.searchInput;

    fetch(`https://api.punkapi.com/v2/beers?beer_name=${SEARCH_INPUT}`)
      .then(response => {
        return response.json();
      })
      .then(datas => {
        datas.map(el => {
          const ID = el.id;
          const SRC = el.image_url;
          const TITLE = el.name;
          const ABV = el.abv;
          const DESCRIPTION = el.description;
          let { isfavorited = false } = this.props;

          const LIST_BEERS = new beerList(
            ID,
            SRC,
            TITLE,
            ABV,
            DESCRIPTION,
            isfavorited
          );

          beersList.push(LIST_BEERS);
        });

        const BEERS = [];
        beersList.map(el => {
          BEERS.push(
            <Beers
              isfavorited={el.isfavorited}
              handleFavorite={this.handleFavorite}
              key={el.id}
              id={el.id}
              src={el.src}
              title={el.title}
              abv={el.abv}
              description={el.description.slice(0, 200) + "..."}
            />
          );
        });

        this.setState({
          displayBeers: BEERS
        });

        beersList.map((el, index) => {
          this.beers.map(el2 => {
            if (el2.id === el.id) {
              beersList.splice(index, 1);
            }
          });
        });
        this.beers = this.beers.concat(beersList);
        console.log(beersList)
        console.log(this.beers)
      });
  };

  handleFavorite = (id, isClicked) => {
    const { favoriteBeers =  isClicked } = this.props;

    const FAVORITED_BEERS = [];

    if (favoriteBeers){
      console.log("ok")
    }

    this.beers.forEach(el => {
      if (el.id === id) {
        !el.isfavorited ? (el.isfavorited = true) : (el.isfavorited = false);
      }
    });
    console.log(this.beers);

    this.beers.forEach(el => {
      if (el.isfavorited) {
        FAVORITED_BEERS.push(
          <Beers
            isfavorited={el.isfavorited}
            handleFavorite={this.handleFavorite}
            id={el.id}
            key={el.id}
            src={el.src}
            title={el.title}
            abv={el.abv}
            description={el.description.slice(0, 200) + "..."}
          />
        );
      }
    });
    this.setState({
      favorited: FAVORITED_BEERS
    });
  };

  render() {
    return (
      <>
        <Research
          onChange={this.handleSearch}
          onClick={this.handleSearchValidation}
        />
        <main className="container-fluid">
          <div className="row">{this.state.displayBeers}</div>
        </main>
        <Favorite>{this.state.favorited}</Favorite>
      </>
    );
  }
}

export default Main;
