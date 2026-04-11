import { createContext, useContext, useReducer } from 'react';
import { appReducer, initialAppState, APP_ACTIONS } from '../reducers/appReducer';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  const addCrop = (crop) => dispatch({ type: APP_ACTIONS.ADD_CROP, payload: crop });
  const deleteCrop = (id) => dispatch({ type: APP_ACTIONS.DELETE_CROP, payload: id });
  const addProduct = (product) => dispatch({ type: APP_ACTIONS.ADD_PRODUCT, payload: product });
  const deleteProduct = (id) => dispatch({ type: APP_ACTIONS.DELETE_PRODUCT, payload: id });
  const setWeather = (data) => dispatch({ type: APP_ACTIONS.SET_WEATHER, payload: data });
  const setDiseaseResult = (result) => dispatch({ type: APP_ACTIONS.SET_DISEASE_RESULT, payload: result });
  const clearDiseaseResult = () => dispatch({ type: APP_ACTIONS.CLEAR_DISEASE_RESULT });
  const deleteUser = (id) => dispatch({ type: APP_ACTIONS.DELETE_USER, payload: id });

  return (
    <AppContext.Provider value={{
      ...state,
      addCrop,
      deleteCrop,
      addProduct,
      deleteProduct,
      setWeather,
      setDiseaseResult,
      clearDiseaseResult,
      deleteUser,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
