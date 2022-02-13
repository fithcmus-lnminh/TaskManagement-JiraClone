import React, { useState, useEffect } from "react";
import Index from "../UI/Index";
import { Table, Button, Space, Tag } from "antd";
import parse from "html-react-parser";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { GET_LIST_PROJECT_SAGA } from "../../redux/consts/taskManagement";

const ProjectManagement = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  const projectList = useSelector((state) => state.projectReducer.projectList);

  useEffect(() => {
    dispatch({ type: GET_LIST_PROJECT_SAGA });
  }, []);

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
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      width: "20%",
      sorter: (a, b) =>
        a.projectName.toLowerCase() < b.projectName.toLowerCase() ? -1 : 1,
      sortOrder: sortedInfo.columnKey === "projectName" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      width: "15%",
      sorter: (a, b) =>
        a.creator.name.toLowerCase() < b.creator.name.toLowerCase() ? -1 : 1,
      sortOrder: sortedInfo.columnKey === "creator" && sortedInfo.order,
      ellipsis: true,
      render: (text, record, index) => (
        <Tag color="geekblue">{record.creator.name}</Tag>
      ),
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      width: "15%",
      sorter: (a, b) =>
        a.categoryName.toLowerCase() < b.categoryName.toLowerCase() ? -1 : 1,
      sortOrder: sortedInfo.columnKey === "categoryName" && sortedInfo.order,
      ellipsis: true,
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
        <div className="header mt-1">
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
          dataSource={projectList}
          onChange={handleChange}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </Index>
  );
};

export default ProjectManagement;
