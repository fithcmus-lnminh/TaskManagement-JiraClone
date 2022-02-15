import React, { useState } from "react";
import { Drawer, Button, Select, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  SHOW_DRAWER,
  HIDE_DRAWER,
} from "../../../redux/consts/taskManagement/index";

const Modal = () => {
  const { title, visible, ComponentContent, callbackSubmit } = useSelector(
    (state) => state.drawerReducer
  );
  const dispatch = useDispatch();

  const showDrawer = () => {
    dispatch({ type: SHOW_DRAWER });
  };

  const onClose = () => {
    dispatch({ type: HIDE_DRAWER });
  };

  return (
    <>
      <Drawer
        title={title}
        width={700}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={callbackSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {ComponentContent}
      </Drawer>
    </>
  );
};

export default Modal;
