import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Index from "../UI/Index";
import ContentMain from "../UI/Template/Main/ContentMain";
import HeaderMain from "../UI/Template/Main/HeaderMain";
import InfoMain from "../UI/Template/Main/InfoMain";
import { GET_PROJECT_DETAIL_SAGA } from "../../redux/consts/taskManagement";

const ProjectDetailBoard = () => {
  const projectDetail = useSelector(
    (state) => state.ProjectReducer.projectDetail
  );
  console.log(projectDetail);
  const dispatch = useDispatch();
  const { projectId } = useParams();

  useEffect(() => {
    dispatch({ type: GET_PROJECT_DETAIL_SAGA, projectId: projectId });
  }, []);

  return (
    <Index>
      <div className="main">
        <HeaderMain>Project Detail / {projectDetail.projectName}</HeaderMain>
        <InfoMain projectDetail={projectDetail} />
        <ContentMain projectDetail={projectDetail} />
      </div>
    </Index>
  );
};

export default ProjectDetailBoard;
