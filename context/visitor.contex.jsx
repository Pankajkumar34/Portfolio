"use client";
import { createContext, useReducer, useContext } from "react";

const VisitorContext = createContext();

const initialState = {
  data: {}, 
};

// 3️⃣ Reducer
function dataReducer(state, action) {
  switch (action.type) {
    case "ADD_DATA":
      return state.data=action.payload

    default:
      return state;
  }
}

export function VisitorProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const addData = (newObject) => {
    dispatch({
      type: "ADD_DATA",
      payload: newObject,
    });
  };

  return (
    <VisitorContext.Provider value={{ data: state.data, addData }}>
      {children}
    </VisitorContext.Provider>
  );
}

export const useData = () => useContext(VisitorContext);