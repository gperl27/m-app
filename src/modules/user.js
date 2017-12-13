
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

const initialState = {
  user: null,
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

    default:
      return state
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
  }
}


export const postWS = () => {
  return (dispatch) => {
    io.socket.patch('/user/1', { name: 'Timmy Mendez' }, function (resData, jwRes) {
      dispatch(getUser(resData));
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
