import React from "react";
import { Input, Button, Layout } from "antd";
import Auth from "../UI/Auth";
import {
  UserOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
  FormOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { USER_REGISTER_SAGA } from "../../redux/consts/taskManagement";

const Register = (props) => {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;

  return (
    <Auth>
      <form onSubmit={handleSubmit} className="container">
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: window.innerHeight }}
        >
          <div className="w-75">
            <h3 className="text-center mb-3">Register</h3>
            <Input
              size="large"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              prefix={<UserOutlined />}
            />
            {errors.email && touched.email && (
              <div className="text-danger">{errors.email}</div>
            )}
            <Input
              type="password"
              size="large"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              className="mt-3"
              prefix={<LockOutlined />}
            />
            {errors.password && touched.password && (
              <div className="text-danger">{errors.password}</div>
            )}
            <Input
              type="text"
              size="large"
              name="name"
              onChange={handleChange}
              placeholder="Name"
              className="mt-3"
              prefix={<FormOutlined />}
            />
            {errors.name && touched.name && (
              <div className="text-danger">{errors.name}</div>
            )}
            <Input
              type="number"
              size="large"
              name="phoneNumber"
              onChange={handleChange}
              placeholder="Phone Number"
              className="mt-3"
              prefix={<PhoneOutlined />}
            />
            {errors.phoneNumber && touched.phoneNumber && (
              <div className="text-danger">{errors.phoneNumber}</div>
            )}
          </div>
          <Button
            htmlType="submit"
            size="middle"
            className="mt-4 w-75"
            style={{ backgroundColor: "rgb(102,117,223)", color: "#fff" }}
          >
            Register
          </Button>

          <h6 className="mt-3 mb-0">
            Already have an account?
            <a href="/login"> Log in</a>
          </h6>
        </div>
      </form>
    </Auth>
  );
};

const RegisterWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
    name: "",
    phoneNumber: 12345,
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string().min(6, "Password must has at least 6 characters"),
    name: Yup.string().min(4, "Name must has at least 6 characters"),
    phoneNumber: Yup.string()
      .min(6, "Phone Number must has at least 6 numbers")
      .max(12, "Phone Number must not exceed 12 numbers"),
  }), //validate from field

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({ type: USER_REGISTER_SAGA, userInfo: values });
  },

  displayName: "Login",
})(Register);

export default connect()(RegisterWithFormik);
