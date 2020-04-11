import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM
} from "../types";
import axios from "axios";

// get all posts
export const getScreams = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/screams")
    .then(res => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_SCREAMS,
        payload: []
      });
    });
};

// like a post
export const likeScream = screamID => dispatch => {
  axios
    .get(`/scream/${screamID}/like`)
    .then(res => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// unlike a post
export const unlikeScream = screamID => dispatch => {
    axios
      .get(`/scream/${screamID}/unlike`)
      .then(res => {
        dispatch({
          type: UNLIKE_SCREAM,
          payload: res.data
        });
      })
      .catch(err => console.log(err));
  };

export const deleteScream = ( screamID ) => dispatch => {
  axios.delete(`/scream/${screamID}`)
  .then(() => {
    dispatch({ type: DELETE_SCREAM, payload: screamID});
  })
  .catch(err => console.log(err));
}