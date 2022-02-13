import React, { useState } from "react";
import Index from "../UI/Index";
import { Table, Button, Space } from "antd";
import parse from "html-react-parser";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const data = [
  {
    members: [],
    creator: {
      id: 1189,
      name: "string",
    },
    id: 3270,
    projectName: "ngocdon",
    description: "<p>fhjhfjhfjdfdf</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "ngocdon",
    deleted: false,
  },
  {
    members: [],
    creator: {
      id: 1195,
      name: "dungpv",
    },
    id: 3271,
    projectName: "Khóa 4: Bài tập Jira clone: comment, user",
    description:
      "<p>1 - Chức năng comment task (Th&ecirc;m, Sửa, X&oacute;a)<br />2 - Chức năng đăng k&yacute; v&agrave; quản l&yacute; người d&ugrave;ng<br />&nbsp; &nbsp; + Đăng k&yacute; - signup (C&oacute; valid)<br />&nbsp; &nbsp; + Quản l&yacute; người d&ugrave;ng (t&igrave;m kiếm, th&ecirc;m, sửa, x&oacute;a)</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "khoa-4-bai-tap-jira-clone-comment-user",
    deleted: false,
  },
  {
    members: [
      {
        userId: 1239,
        name: "handsomethanh",
        avatar: "https://ui-avatars.com/api/?name=handsomethanh",
      },
      {
        userId: 1066,
        name: "Thoa Nguyen",
        avatar: "https://ui-avatars.com/api/?name=Thoa Nguyen",
      },
    ],
    creator: {
      id: 1239,
      name: "handsomethanh",
    },
    id: 3277,
    projectName: "DEMO",
    description: "<p>ahihi</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "demo",
    deleted: false,
  },
  {
    members: [
      {
        userId: 1278,
        name: "nguyenthimon",
        avatar: "https://ui-avatars.com/api/?name=nguyenthimon",
      },
    ],
    creator: {
      id: 1189,
      name: "string",
    },
    id: 3278,
    projectName: "thimon",
    description: "<p>hihiihh</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "thimon",
    deleted: false,
  },
  {
    members: [],
    creator: {
      id: 1255,
      name: "zeloff",
    },
    id: 3279,
    projectName: "what your name",
    description: "<p>hỏi t&ecirc;n bạn l&agrave; g&igrave;</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "what-your-name",
    deleted: false,
  },
  {
    members: [],
    creator: {
      id: 827,
      name: "Tien Doaasd12344adf",
    },
    id: 3280,
    projectName: "zvzvvz",
    description: "<p>&acirc;fafafa</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "zvzvvz",
    deleted: false,
  },
  {
    members: [],
    creator: {
      id: 1270,
      name: "Lê Nhật Minh",
    },
    id: 3281,
    projectName: "NEW PROJECT",
    description: "<p>abcxyz</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "new-project",
    deleted: false,
  },
];

const ProjectManagement = () => {
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  const handleChange = (pagination, filters, sorter) => {
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: "descend",
        columnKey: "age",
      },
    });
  };

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "10%",
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      width: "35%",
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === "age" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === "age" && sortedInfo.order,
      ellipsis: true,
      render: (text, order, index) => <div>{parse(text)}</div>,
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (text, record) => (
        <Space size="middle">
          <a>
            <EditOutlined />
          </a>
          <a>
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <Index>
      <div className="container">
        <div className="header mt-4">
          <nav aria-label="breadcrumb">
            <ol
              className="breadcrumb pl-0 mb-0"
              style={{ backgroundColor: "white" }}
            >
              <li className="breadcrumb-item">Projects</li>
              <li className="breadcrumb-item">singularity 1.0</li>
              <li className="breadcrumb-item active" aria-current="page">
                Project Management
              </li>
            </ol>
          </nav>
        </div>
        <h3 className="mb-4" style={{ fontWeight: "bold" }}>
          Project Management
        </h3>
        <Space style={{ marginBottom: 16 }}>
          <Button onClick={setAgeSort}>Sort age</Button>
          <Button onClick={clearFilters}>Clear filters</Button>
          <Button onClick={clearAll}>Clear filters and sorters</Button>
        </Space>
        <Table
          columns={columns}
          rowKey={"id"}
          dataSource={data}
          onChange={handleChange}
        />
      </div>
    </Index>
  );
};

export default ProjectManagement;
