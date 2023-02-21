import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { createContext, useEffect, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';
import navigationService from "../routing/NavigationService";
import mixpanel from "mixpanel-browser";


// ----------------------------------------------------------------------

// create axios instance to store token in
// const BASE_URL = 'http://127.0.0.1:8000'
// const BASE_URL = 'https://api.voxlanalytics.com'
const BASE_URL = process.env.REACT_APP_HOST_API_KEY || 'http://127.0.0.1:8000';

export const axiosInstance = axios.create({ baseURL: BASE_URL })


// initial context state
const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

// context state handlers
const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
   REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

// context creation
const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

// provider
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        console.log("a");
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          console.log("b");
          const response = await axiosInstance.get('/api/me');

          const user  = response.data;
          user.accessLevel = 1;
          console.log("User Logged in as:");
          console.log(user);
          
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const response = await axiosInstance.post('/api/login', {
      email,
      password,
    });
    const { access_token, user } = response.data;
    console.log(user);
    setSession(access_token);


    dispatch({
      type: 'LOGIN',
      payload: {
        user: user
      },
    });
  };

  const register = async (email, first_name, last_name, password, password_confirmation, token) => {
    let q = {
      "email": email,
      "password": password,
      "first_name": first_name,
      "last_name": last_name,
      "password_confirmation": password_confirmation,
    };
    if (token != null) {
      q["state"] = token;
    }
    const response = await axiosInstance.post('/api/register', q);
    const { access_token, user } = response.data;
    console.log(user);
    setSession(access_token);

    dispatch({
      type: 'REGISTER',
      payload: {
        user: user,
      },
    });

  }

  const logout = async () => {
    setSession(null);
    mixpanel.track('Log out');
    mixpanel.reset();
    dispatch({ type: 'LOGOUT' });
  };

  const refreshUser = async () => {
    const response = await GET('/api/user-profile', {});
    if (!response.success)
      return;
    const user  = response.response;   
    user.accessLevel = 1;
    dispatch({
      type: 'INITIALIZE',
      payload: {
        isAuthenticated: true,
        user
      },
    });
    return user;
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
  
    if (!context) throw new Error('Auth context must be use inside AuthProvider');
  
    return context;
  };

// token helpers

const isValidToken = (accessToken) => {
    if (!accessToken) {
      return false;
    }
  
    // ----------------------------------------------------------------------
  
    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
  
    return decoded.exp > currentTime;
  };

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken);

        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        // This function below will handle when token is expired
        // const { exp } = jwtDecode(accessToken);
        // handleTokenExpired(exp);
    } else {
        localStorage.removeItem('accessToken');
        delete axiosInstance.defaults.headers.common.Authorization;
    }
};

const DEBUG_REQUESTS = false;

export const GET = async (path, query) => {
  DEBUG_REQUESTS && console.log("GET: " + path);
  DEBUG_REQUESTS && console.log(query);
  try {
    const response = await axiosInstance.get(path, {params:query})
    return processSuccess(response);
  } catch (error) {
    return processError(error);
  }

}

export const POST = async (path, query) => {
  DEBUG_REQUESTS && console.log("POST: " + path);
  DEBUG_REQUESTS && console.log(query);
    try {
      const response = await axiosInstance.post(path, query);
      return processSuccess(response);
    } catch (error) {
      return processError(error);
    }

  }

export const PUT = async (path, query) => {
  DEBUG_REQUESTS && console.log("PUT: " + path);
  DEBUG_REQUESTS && console.log(query);
   try {
    const response = await axiosInstance.put(path, query);
    return processSuccess(response);
  } catch (error) {
    return processError(error);
  } 

}

export const DELETE = async (path, query) => {
  DEBUG_REQUESTS && console.log("DELETE: " + path);
  DEBUG_REQUESTS && console.log(query);
  try {
    const response = await axiosInstance.delete(path, {data: query});
    return processSuccess(response);
  } catch (error) {
    return processError(error);
  }

}

function processSuccess(response) {
  DEBUG_REQUESTS && console.log("response:");
  if (response.data) {
    DEBUG_REQUESTS &&  console.log(response.data);
    return {'success':true, 'response':response.data};
  } else {
    DEBUG_REQUESTS &&  console.log(response);
    return {'success':true, 'response':response};
  }
}

function processError(error) {
  if (error.response) {
    if (error.response.status == 401) {
      location.reload(false);
    } else if (error.response.status == 403) {
      alert("You do not have permission to do this!");
      location.reload(false);
    }
  }
  console.log(error.response.data);
  return {'success':false, 'response':error.response.data};
}


// // 4. Logging in
// export const login = async (params) => {
//   const response = await axiosInstance.post('/auth/login', params)
//   console.log(response.data.access_token);
//   // save tokens to storage
//   axiosInstance.defaults.headers.common = {'Authorization': `Bearer ${response.data.access_token}`}
//   return true;
// }


// // 5. Logging out
// export const logout = () => {}

// // // Now just make all requests using your axiosInstance instance
// // axiosInstance.get('/analytics/channel-groupings').then(response => { 
// //     console.log(response);
// // })
