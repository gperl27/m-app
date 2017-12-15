
var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');

// Instantiate the socket client (`io`)
// (for now, you must explicitly pass in the socket.io client when using this library from Node.js)
var io = sailsIOClient(socketIOClient);

// Set some options:
// (you have to specify the host and port of the Sails backend when using this library from Node.js)
io.sails.url = 'http://localhost:1337';


export const FETCH_USER = 'FETCH_USER';
export const LOADING_USER = 'LOADING_USER';
export const LOADED_USER = 'LOADED_USER';
export const SELECT_DATE = 'SELECT_DATE';

const initialState = {
  user: null,
  selectedDate: null,
  loading: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        user: action.payload
      }

    case LOADING_USER: {
      return {
        ...state,
        loading: true
      }
    }

    case LOADED_USER: {
      return {
        ...state,
        loading: false
      }
    }

    case SELECT_DATE: {
      return {
        ...state,
        selectedDate: action.payload
      }
    }

    default:
      return state
  }
}

export const selectDate = (date) => {
  return {
    type: SELECT_DATE,
    payload: date
  }
}


export const startWS = () => {
  return (dispatch) => {
    // Add a connect listener
    io.socket.on('user', (msg) => {
      console.log(msg);
    })

    io.socket.get('/user/1', function (resData, jwres) {
      console.log(resData, 'fetch');
      dispatch(getUser(resData));
    });

    // io.socket.post('/user/1/selectedDate', { selectedDate: new Date()}, function (resData, jwres) {
    //   console.log(resData, 'selected date');
    //   dispatch(getUser(resData));
    // });
  }
}


export const postWS = (data) => {
  return (dispatch) => {
    io.socket.patch('/user/1', data, function (resData, jwRes) {
      dispatch(getUser(resData));
    });
  }
}

export const updateUserEvent = (id, data) => {
  return (dispatch) => {
    io.socket.patch(`/event/${id}`, data, function (resData, jwRes) {
      io.socket.get('/user/1', function (resData, jwres) {
        console.log(resData, 'fetch');
        dispatch(getUser(resData));
      });
    });
  }
}

export const newUserEvent = (data) => {
  return (dispatch) => {
    io.socket.post(`/event`, data, function (resData, jwRes) {
      console.log(resData, 'CREATED EVENT');
      io.socket.get('/user/1', function (resData, jwres) {
        console.log(resData, 'user with NEW EVENT');
        dispatch(getUser(resData));
      });
    });
  }
}

export const updateTodolist = (id, data) => {
  return (dispatch) => {
    io.socket.patch(`/todolist/${id}`, data, function (resData, jwRes) {
      io.socket.get('/user/1', function (resData, jwres) {
        dispatch(getUser(resData));
      });
    });
  }
}

export const createNewList = (data) => {
  return (dispatch) => {
    io.socket.post(`/todolist`, data, function (resData, jwRes) {
      io.socket.get('/user/1', function (resData, jwres) {
        dispatch(getUser(resData));
      });
    });
  }
}

export const deleteList = (id) => {
  return (dispatch) => {
    io.socket.delete(`/todolist/${id}`, function (resData, jwRes) {
      io.socket.get('/user/1', function (resData, jwres) {
        dispatch(getUser(resData));
      });
    });
  }
}

export const getUser = (user) => {
  return dispatch => {
    dispatch({
      type: FETCH_USER,
      payload: user
    })

    dispatch(loadedUser());
  }
}

export const loadingUser = () => ({ type: LOADING_USER })
export const loadedUser = () => ({ type: LOADED_USER })
