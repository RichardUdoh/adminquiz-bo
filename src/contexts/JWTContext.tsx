import { createContext, ReactNode, useEffect, useReducer } from 'react';
// import axios from 'utils/axios';
import { isValidToken, setSession } from '../utils/jwt';
import axios from '../utils/axios';

// ----------------------------------------------------------------------

type JWTContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: { name: string };
  method: 'jwt';
  login: (response: { refresh_token: string; token: string }) => Promise<void>;
  logout: () => Promise<void>;
};

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const jwtReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };

    default:
      return state;
  }
};

const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(jwtReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('token');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const user = await axios.get(`/admin/accounts/me`);

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user: user.data.data
            }
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (response: { data: { user: any; accessToken: string } }) => {
    const { accessToken, user } = response.data;
    setSession(accessToken);

    dispatch({
      type: 'LOGIN',
      payload: {
        user
      }
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
