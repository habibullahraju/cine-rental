import { useReducer, useState } from "react";
import { ToastContainer } from "react-toastify";
import { MovieContex, ThemeContex } from "./contex";
import Page from "./page/Page";
import { cardReducer, initialState } from "./reducers/cardReducer";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [state, dispatch] = useReducer(cardReducer, initialState);
  return (
    <>
      <ThemeContex.Provider value={{ darkMode, setDarkMode }}>
        <MovieContex.Provider value={{ state, dispatch }}>
          <Page />
          <ToastContainer />
        </MovieContex.Provider>
      </ThemeContex.Provider>
    </>
  );
}

export default App;
