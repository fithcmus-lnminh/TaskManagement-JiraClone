import { DeleteOutlined } from "@ant-design/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { REMOVE_USER_FROM_PROJECT } from "../../../redux/consts/taskManagement";

const UserTable = (props) => {
  const dispatch = useDispatch();

  return (
    <table
      className="table"
      style={{
        display: "table",
        borderCollapse: "collapse",
        border: "none",
      }}
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Avatar</th>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.record.members?.slice(props.start, props.end).map((item, index) => {
          return (
            <tr>
              <td
                style={{
                  display: "table-cell",
                  verticalAlign: "middle",
                }}
              >
                {item.userId}
              </td>
              <td
                style={{
                  display: "table-cell",
                  verticalAlign: "middle",
                }}
              >
                <img
                  src={item.avatar}
                  width="35"
                  height="35"
                  style={{ borderRadius: "50%" }}
                />
              </td>
              <td
                style={{
                  display: "table-cell",
                  verticalAlign: "middle",
                }}
              >
                {item.name}
              </td>
              <td
                style={{
                  display: "table-cell",
                  verticalAlign: "middle",
                }}
              >
                <button
                  onClick={() => {
                    dispatch({
                      type: REMOVE_USER_FROM_PROJECT,
                      userProject: {
                        userId: item.userId,
                        projectId: props.record.id,
                      },
                    });
                  }}
                  className="btn btn-danger pt-0 px-2"
                >
                  <DeleteOutlined />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserTable;
