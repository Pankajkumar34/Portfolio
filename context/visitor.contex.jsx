"use client";
import { createContext, useReducer, useContext, useEffect, useState } from "react";

export const VisitorContext = createContext();

const initialState = {
  data: {},
};

function dataReducer(state, action) {
  switch (action.type) {
    case "ADD_DATA":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}

export function VisitorProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const [showPopup, setShowPopup] = useState(false);

  const addData = (newObject) => {
    dispatch({
      type: "ADD_DATA",
      payload: newObject,
    });
  };

  const loadVisitor = async () => {
    try {
      const res = await fetch("/api/visit");
      const data = await res.json();
      addData(data);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Accept Cookie Function
  const acceptCookie = () => {
    document.cookie = "cookie_consent=true; path=/; max-age=31536000"; // 1 year
    setShowPopup(false);
    loadVisitor();
  };

  // ✅ Reject Cookie Function (optional)
  const rejectCookie = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const hasConsent = document.cookie.includes("cookie_consent=true");

    if (!hasConsent) {
      setShowPopup(true);
    } else {
      loadVisitor();
    }
  }, []);

  return (
    <VisitorContext.Provider
      value={{
        data: state.data,
        showPopup,
        acceptCookie,
        rejectCookie,
      }}
    >
      {children}
    </VisitorContext.Provider>
  );
}

