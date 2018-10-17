import axios from "../../axios/axios-quiz";
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR
} from "./actionTypes";

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart);
    try {
      const response = await axios.get("quizes.json");
      const quizes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({ id: key, name: `Тест №${index + 1}` });
      });
      dispatch(fetchQuizesSuccess(quizes));
    } catch (error) {
      dispatch(fetchQuizesError());
    }
  };
}

export default function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart());

    try {
      const response = await axios.get(`quizes/${quizId}.json`);
      const quiz = response.data;
      dispatch(fetchQuizSuccess(quiz));
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchQuizesStart() {
  return { type: FETCH_QUIZES_START };
}
export function fetchQuizesSuccess(quizes) {
  return { type: FETCH_QUIZES_SUCCESS, quizes };
}
export function fetchQuizesError(e) {
  return { type: FETCH_QUIZES_ERROR, error: e };
}

export function fetchQuizSuccess(quiz) {
  return {
    type: "",
    quiz
  };
}
