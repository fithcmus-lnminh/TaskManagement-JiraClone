import {
  HIDE_INPUT_MODAL,
  OPEN_INPUT_MODAL,
  SWITCH_INPUT_MODAL,
} from "../consts/taskManagement";

const initialState = {
  editInput: {
    isOpen: false,
    index: 0,
  },
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_INPUT_MODAL:
      state.editInput.isOpen = true;
      state.editInput.index = action.index;
      return { ...state };
    case HIDE_INPUT_MODAL:
      state.editInput.isOpen = false;
      state.editInput.index = action.index;
      return { ...state };
    case SWITCH_INPUT_MODAL:
      state.editInput.isOpen = !state.editInput.isOpen;
      state.editInput.index = action.index;
      return { ...state };
    default:
      return state;
  }
};
