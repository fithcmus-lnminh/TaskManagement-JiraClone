import {
  HIDE_DRAWER,
  OPEN_FORM_CREATE_TASK,
  OPEN_FORM_EDIT_PROJECT,
  SET_SUBMIT_EDIT_PROJECT,
  SHOW_DRAWER,
} from "../consts/taskManagement";

const initialState = {
  title: "Default title",
  visible: false,
  ComponentContent: <p>Default Content</p>,
  callbackSubmit: () => {},
};

export const drawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DRAWER:
      return { ...state, visible: true, title: action.title };
    case HIDE_DRAWER: {
      return { ...state, visible: false };
    }
    case OPEN_FORM_EDIT_PROJECT: {
      return {
        ...state,
        visible: true,
        ComponentContent: action.Component,
        title: action.title,
      };
    }
    case SET_SUBMIT_EDIT_PROJECT: {
      return { ...state, callbackSubmit: action.submitFn };
    }

    default:
      return state;
  }
};
