import React, { Component } from "react";
import classes from "./AddFilm.css";
import axios from "../../axios/axios-quiz";

class AddFilm extends Component {
  state = {
    inputFilmName: "",
    films: [],
    maxFilm: 3,
    currentFilmNumber: 0
  };

  handleChange = event => {
    this.setState({ inputFilmName: event.target.value });
  };

  addFilmHandler = () => {
    if (this.state.currentFilmNumber < this.state.maxFilm) {
      this.state.films.push({
        filmName: this.state.inputFilmName
      });
    }
    let countFilm = this.state.currentFilmNumber;
    this.setState({ currentFilmNumber: countFilm + 1 });
    this.setState({
      inputFilmName: ""
    });
  };

  filmList = () => {
    return this.state.films.map((film, index) => {
      return <li key={index}>
          {film.filmName} <button type="button" onClick={this.deleteFilmHandler.bind(this, film.filmName)}>
            Удалить
          </button>
        </li>;
    });
  };

  deleteFilmHandler(name) {
    const films = this.state.films;
    let newFilmsArray = [];


    for (const i in films) {
      if (films.hasOwnProperty(i)) {
        const element = films[i];
        if(element.filmName!==name) {
          newFilmsArray.push(element);
        } else {
          let count = this.state.currentFilmNumber;
          this.setState({
            films: newFilmsArray,
            currentFilmNumber: count - 1
          });
        }
      }
    }
    
  }

  sendFilms = async () => {
    await axios.post("https://react-quiz-4129b.firebaseio.com/films.json", {
      films: this.state.films,
      author: localStorage.getItem("login")
    });
  };

  render() {
    return (
      <div className={classes.AddFilm}>
        <div>
          <h1>Добавить фильм</h1>
          <form>
            {this.state.currentFilmNumber < this.state.maxFilm ? (
              <div>
                <input
                  type="text"
                  value={this.state.inputFilmName}
                  onChange={this.handleChange}
                />
                <button type="button" onClick={this.addFilmHandler}>
                  Добавить
                </button>
              </div>
            ) : null}

            <ul>{this.filmList()}</ul>

            {this.state.currentFilmNumber === this.state.maxFilm ? (
              <button type="button" onClick={this.sendFilms}>
                Отправить
              </button>
            ) : null}
          </form>
        </div>
      </div>
    );
  }
}

export default AddFilm;
