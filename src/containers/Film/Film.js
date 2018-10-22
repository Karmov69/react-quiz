import React, { Component } from "react";
import classes from "./Film.css";


class Film extends Component {

  addFilmHandler(e){
    e.preventDefault();
    
  }
  changeHandler(value) {
    
  }

  

  render() {
    return (
        <div className={classes.Film}>
          <h1>Добавьте 3 фильма</h1>
          <form>
            <input type="text" placeholder="Введите название фильма" onChange= {event => this.changeHandler(event.target.value)}/>
          
            <button onClick={this.addFilmHandler}>Добавить</button>
          </form>
        </div>
      )
  }
}

export default Film
