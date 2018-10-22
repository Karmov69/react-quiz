import React, { Component } from "react";
import classes from "./AddFilm.css";
import axios from "../../axios/axios-quiz";

class AddFilm extends Component {
  state = {
    filmName: ""
  };

  handleChange = event => {
    this.setState({ filmName: event.target.value });
  };

  addFilmHandler = async () => {
    await axios.post("https://react-quiz-4129b.firebaseio.com/films.json", {
      filmName: this.state.filmName
    });
  };

  render() {
    return (
      <div className={classes.AddFilm}>
        <div>
          <h1>Добавить фильм</h1>
          <form>
            <input
              type="text"
              value={this.state.filmName}
              onChange={this.handleChange}
            />
            <button type="button" onClick={this.addFilmHandler}>
              Добавить
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddFilm;
