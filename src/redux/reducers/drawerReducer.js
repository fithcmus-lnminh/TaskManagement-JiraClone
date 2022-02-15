import { HIDE_DRAWER, SHOW_DRAWER } from "../consts/taskManagement";

const initialState = {
  visible: false,
  ComponentContent: (props) => <p>Default Content</p>,
  callbackSubmit: (props) => {},
};

export const drawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DRAWER:
      return { ...state, visible: true };
    case HIDE_DRAWER: {
      return { ...state, visible: false };
    }
    default:
      return state;
  }
};
