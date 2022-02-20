import React, { useState, useEffect, useRef } from "react";
import Index from "../UI/Index";
import { Table, Button, Space, Tag, Input, Popover } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_USER_TO_PROJECT_SAGA,
  DELETE_PROJECT_SAGA,
  EDIT_PROJECT,
  GET_LIST_PROJECT_SAGA,
  OPEN_FORM_EDIT_PROJECT,
  REMOVE_USER_FROM_PROJECT,
  SEARCH_USER_SAGA,
} from "../../redux/consts/taskManagement";
import Highlighter from "react-highlight-words";
import EditProject from "../Forms/EditProject";
import { Popconfirm } from "antd";
import { Avatar } from "antd";
import { AutoComplete } from "antd";
import UserTable from "../UI/Shared/UserTable";
import { NavLink } from "react-router-dom";

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

  const searchRef = useRef(null);

  useEffect(() => {
    dispatch({ type: GET_LIST_PROJECT_SAGA });
  }, []);

  const userSearch = useSelector((state) => state.userReducer.userSearch);
  const [searchValue, setSearchValue] = useState("");

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

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
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
      render: (text, record, index) => (
        <NavLink to={`/project-detail/${record.id}`}>{text}</NavLink>
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
      title: "Members",
      dataIndex: "members",
      key: "members",
      width: "20%",
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.slice(0, 3).map((member, index) => {
              return (
                <Popover
                  placement="bottom"
                  title={"Member"}
                  content={() => {
                    return <UserTable record={record} start={0} end={3} />;
                  }}
                >
                  <Avatar key={index} src={member.avatar} alt="true" />
                </Popover>
              );
            })}
            {record.members?.length > 3 ? (
              <Popover
                placement="bottom"
                title={"Member"}
                content={() => {
                  return <UserTable record={record} start={3} />;
                }}
              >
                <Avatar
                  style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                >
                  +{record.members.length - 3}
                </Avatar>
              </Popover>
            ) : (
              ""
            )}
            <Popover
              placement="rightTop"
              title={"ADD MEMBER"}
              content={
                <AutoComplete
                  options={userSearch?.map((user) => {
                    return { label: user.name, value: user.userId.toString() }; //value = id to call api
                  })}
                  value={searchValue} //set value displayed
                  onChange={(value) => {
                    setSearchValue(value); //override onchange for displaying
                  }}
                  placeholder="Type member's name here"
                  style={{ width: "100%" }}
                  onSearch={(value) => {
                    //if user continue to type, clear timeout the previous searchRef
                    if (searchRef.current) {
                      clearTimeout(searchRef.current);
                    }

                    //and set searchRef to new timeout
                    searchRef.current = setTimeout(() => {
                      dispatch({ type: SEARCH_USER_SAGA, keyword: value });
                    }, 300); //debounce, dispatch after 300ms after user typing
                  }}
                  onSelect={(valueSelect, option) => {
                    setSearchValue(option.label); //set value when select
                    dispatch({
                      type: ADD_USER_TO_PROJECT_SAGA,
                      userProject: {
                        projectId: record.id,
                        userId: valueSelect,
                      },
                    });
                  }}
                />
              }
              trigger="click"
            >
              <Button shape="circle">+</Button>
            </Popover>
          </div>
        );
      },
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
