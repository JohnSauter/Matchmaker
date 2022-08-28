import React, { createContext, useContext } from "react";
import { useAppReducer } from './reducers'

const AppContext = createContext();
const { Provider } = AppContext;

const AppProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useAppReducer({
    user: null,
    user_valid: false
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
