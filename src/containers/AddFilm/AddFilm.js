import React, { Component } from "react";
import classes from "./AddFilm.css";
import axios from "../../axios/axios-quiz";

class AddFilm extends Component {
  state = {
    inputFilmName: "",
    films: [],
    maxFilm: 3,
    currentFilmNumber: 0,
    exist: false,
    authorExist: false,
    message: ""
  };

  handleChange = event => {
    this.setState({ inputFilmName: event.target.value });
  };

  addFilmHandler = () => {
    if (this.state.currentFilmNumber < this.state.maxFilm) {
      this.state.films.push({
        filmName: this.state.inputFilmName,
        exist: false,
        id: this.state.currentFilmNumber
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
      return (
        <li key={index}>
          {film.exist ? (
            <span style={{ color: "red" }}>{film.filmName} </span>
          ) : (
            <span>{film.filmName} </span>
          )}
          <button
            type="button"
            onClick={this.deleteFilmHandler.bind(this, film.filmName)}
          >
            Удалить
          </button>
        </li>
      );
    });
  };

  deleteFilmHandler(name) {
    const films = this.state.films;
    let newFilmsArray = [];

    for (const i in films) {
      if (films.hasOwnProperty(i)) {
        const element = films[i];

        if (element.filmName !== name) {
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
    this.setState({ message: "" });
    let author = localStorage.getItem("login");

    await axios
      .get("https://react-quiz-4129b.firebaseio.com/films.json")
      .then(response => {
        for (const i in response.data) {
          if (response.data.hasOwnProperty(i)) {
            const element = response.data[i];
            if (element.author === author) {
              this.setState({ authorExist: true });
            }
          }
        }
      })
      .catch(e => {});

    this.setState({
      exist: false
    });
    if (!this.state.authorExist) {
      await axios
        .get("https://react-quiz-4129b.firebaseio.com/all-films.json")
        .then(response => {
          if (response.data) {
            let allFilms = response.data;

            if (this.state.films) {
              let filmsState = this.state.films;
              for (const iterator of filmsState) {
                let filmState = iterator.filmName;
                for (const i in allFilms) {
                  if (allFilms.hasOwnProperty(i)) {
                    const elements = allFilms[i];
                    for (const j in elements.films) {
                      if (elements.films.hasOwnProperty(j)) {
                        const film = elements.films[j].filmName;
                        if (filmState === film) {
                          let films = this.state.films;
                          let itemId = iterator.id;
                          for (const key in films) {
                            if (films.hasOwnProperty(key)) {
                              const element = films[key];
                              if (element.id === itemId) {
                                element.exist = true;
                                this.setState({
                                  message:
                                    "Данные фильмы уже есть в списке, добавьте другой!"
                                });
                              }
                            }
                          }
                          this.setState({ films, exist: true });
                        } else {
                        }
                      }
                    }
                  }
                }
              }
            } else {
            }
          } else {
            axios.post("https://react-quiz-4129b.firebaseio.com/films.json", {
              films: this.state.films,
              author: localStorage.getItem("login")
            });
            axios.post(
              "https://react-quiz-4129b.firebaseio.com/all-films.json",
              {
                films: this.state.films
              }
            );
            this.setState({
              inputFilmName: "",
              films: [],
              maxFilm: 3,
              currentFilmNumber: 0
            });
          }
        })
        .catch(e => {});

      await axios
        .get("https://react-quiz-4129b.firebaseio.com/all-films.json")
        .then(response => {
          if (!this.state.exist && response.data) {
            axios.post("https://react-quiz-4129b.firebaseio.com/films.json", {
              films: this.state.films,
              author: localStorage.getItem("login")
            });
            axios.post(
              "https://react-quiz-4129b.firebaseio.com/all-films.json",
              {
                films: this.state.films
              }
            );
            this.setState({
              inputFilmName: "",
              films: [],
              maxFilm: 3,
              currentFilmNumber: 0
            });
          }
        })
        .catch(e => {});
    } else {
      console.log("Пользователь уже существует");
      this.setState({
        message: "Для текущего сеанса, вы уже добавляли фильм!"
      });
    }

    // -----------
  };

  render() {
    return (
      <div className={classes.AddFilm}>
        <div>
          <h1>Добавить фильм</h1>
          <p>{this.state.message}</p>
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
