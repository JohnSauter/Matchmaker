import { useReducer } from "react";
import { UPDATE_USER, INVALIDATE_USER } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_USER:
      if (action.user === null) {
        return {
          ...state,
          user: null,
          user_valid: true,
        };
      } else {
        return {
          ...state,
          user: { ...action.user },
          user_valid: true,
        };
      }

    case INVALIDATE_USER:
      return {
        ...state,
        user_valid: false,
      };

    default:
      return state;
  }
};

export function useAppReducer(initialState) {
  return useReducer(reducer, initialState);
}
