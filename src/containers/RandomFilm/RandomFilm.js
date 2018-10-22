import React, { Component } from "react";
import classes from "./RandomFilm.css";
import axios from "axios";

class RandomFilm extends Component {
  state = {
    films: [],
    randFilm: "",
    users:[]
  };

  componentDidMount = () => {
    axios
      .get("https://react-quiz-4129b.firebaseio.com/films.json")
      .then(response => {
        let films = [];

        for (const i in response.data) {
          if (response.data.hasOwnProperty(i)) {
            films.push(response.data[i]);
          }
        }
        this.setState({ films });
      })
      .catch(e => {
        console.log(e);
      });
  };

  filmList = () => {
    return this.state.films.map((film, index) => {
      return <li key={index}>{film.filmName}</li>;
    });
  };

  getRandomFilmHandler = () => {
    let max = this.state.films.length;
    let number = Math.floor(Math.random() * (max - 0) + 0);
    this.setState({ randFilm: this.state.films[number].filmName });
  };

  getUsers = () => {
    // axios
    //   .get("https://react-quiz-4129b.firebaseio.com/authentication/users")
    //   .then(response => {
    //     let users = [];

    //     for (const i in response.data) {
    //       if (response.data.hasOwnProperty(i)) {
    //         users.push(response.data[i]);
    //       }
    //     }
    //     this.setState({ users });
    //     console.log(users);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
  };

  render() {
    return (
      <div className={classes.RandomFilm}>
        <div>
          <h1>Рандомный фильм</h1>
          <ul>{this.filmList()}</ul>
          <button onClick={this.getRandomFilmHandler}>
            Получить рандомный фильм
          </button>
          <hr />
          <p>Фильм: {this.state.randFilm}</p>
          <p>{this.getUsers()}</p>
        </div>
      </div>
    );
  }
}

export default RandomFilm;
