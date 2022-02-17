import React, { useState, useEffect } from "react";
import Index from "../UI/Index";
import { Table, Button, Space, Tag, Input } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  DELETE_PROJECT_SAGA,
  EDIT_PROJECT,
  GET_LIST_PROJECT_SAGA,
  OPEN_FORM_EDIT_PROJECT,
} from "../../redux/consts/taskManagement";
import Highlighter from "react-highlight-words";
import EditProject from "../Forms/EditProject";
import { Popconfirm } from "antd";

const ProjectManagement = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });
  const [searchState, setSearchState] = useState({
    searchText: "",
    searchedColumn: "",
  });

  const projectList = useSelector(
    (state) => state.getProjectReducer.projectList
  );

  useEffect(() => {
    dispatch({ type: GET_LIST_PROJECT_SAGA });
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchState({ searchText: "" });
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchState.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchState.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleChange = (pagination, filters, sorter) => {
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearSeaching = () => {
    setSearchState({
      searchText: null,
      searchedColumn: null,
    });
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
      ...getColumnSearchProps("projectName"),
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
      ...getColumnSearchProps("categoryName"),
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (text, record) => (
        <Space size="middle">
          <button
            className="btn btn-primary px-2"
            onClick={() => {
              dispatch({
                type: OPEN_FORM_EDIT_PROJECT,
                Component: <EditProject />,
                title: "Edit project infomation",
              });
              dispatch({
                type: EDIT_PROJECT,
                projectEditModel: record,
              });
            }}
          >
            <EditOutlined />
          </button>
          <Popconfirm
            title="Are you sure to delete this project?"
            onConfirm={() => {
              dispatch({
                type: DELETE_PROJECT_SAGA,
                id: record.id,
              });
            }}
            okText="Yes"
            cancelText="No"
          >
            <button className="btn btn-danger px-2">
              <DeleteOutlined />
            </button>
          </Popconfirm>
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
          <Button onClick={clearAll}>Clear sorters</Button>
        </Space>
        <Table
          columns={columns}
          rowKey={"id"}
          dataSource={projectList}
          onChange={handleChange}
          pagination={{ pageSize: 5, showSizeChanger: false }}
        />
      </div>
    </Index>
  );
};

export default ProjectManagement;
