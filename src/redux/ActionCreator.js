import * as actTypes from './ActionType.js';
import axios from 'axios';

export const selectCategory = category => {
    return {
        type: actTypes.CATEGORY_SELECT,
        payload: category,
    }
}
export const commentAdd = (comment, response) => {
    return {
        type: actTypes.ADD_COMMENT,
        payload: {
            comment: comment,
            key: response.data.name,
        }
    }
}
export const addFailed = error => {
    return {
        type: actTypes.ADD_COMMENT_FAILED,
        payload: error
    }
}

export const addComment = bookingObj => dispatchEvent => {
    axios.post("https://hotel-booking-app-ah-default-rtdb.asia-southeast1.firebasedatabase.app/bookings.json", bookingObj)
        .then(response => {
            dispatchEvent(commentAdd(bookingObj, response))
        })
        .catch(error => {
            dispatchEvent(addFailed(error.message))
        });
}


const commentsLoad = comments => {
    return {
        type: actTypes.LOAD_COMMENT,
        payload: comments
    }
}
const commentsLoadFailed = error => {
    return {
        type: actTypes.LOAD_COMMENT_FAILED,
        payload: error
    }
}
export const asyncFetchComments = () => dispatch => {
    axios.get('https://hotel-booking-app-ah-default-rtdb.asia-southeast1.firebasedatabase.app/bookings.json')
        .then(response => dispatch(commentsLoad(response.data)))
        .catch(error => dispatch(commentsLoadFailed(error.message)));
}