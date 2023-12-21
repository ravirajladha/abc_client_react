import React, { useEffect, useState, useContext } from "react";
import AppFooter from "../../components/includes/AppFooter";
import AppHeader from "../../components/includes/AppHeader";
import StudentSidebar from "../../components/includes/StudentSidebar";
import BackButton from "../../components/navigation/BackButton";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../lib/AuthContext.js";

function ViewForum() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const user = useContext(AuthContext).user;

  let { forumId } = useParams();
  const [forum, setForum] = useState([]);
  const [isStudentAnswered, setIsStudentAnswered] = useState(false);

  function getForum() {
    let result = fetch(baseUrl + "api/get_school_forum_single/" + forumId).then(
      function (result) {
        result.json().then(function (jsonbody) {
          //console.warn(jsonbody);
          setForum(jsonbody);
          console.log(jsonbody);
          setIsStudentAnswered(
            jsonbody.forum_answers.some(
              (answer) => answer.student_id === user_id
            )
          );
        });
      }
    );
  }
  useEffect(() => {
    getForum();
  }, []);
  if (!user) {
    console.log("No user found. User might be logged out.");
    return <div>User is not logged in</div>;
  }
  const user_id = user.user.id;
  return (
    <>
 
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                <div>
                  <h2 className="fw-400 font-lg d-block">
                    {" "}
                    <b> Forum</b>{" "}
                  </h2>
                </div>
                <div className="float-right">
                  <BackButton />
                </div>
              </div>
              <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4"></div>
              <div className="row">
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                  <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-4 border-0 text-left question-div">
                    <div className="card-body p-0" id="question">
                      {/* Flex container for the title and button */}
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="font-xssss text-uppercase text-current fw-700 ls-3">
                          QUESTION
                        </h4>
                        <Link
                          to={"/school_forums"}
                          className="btn bg-current text-white font-xssss fw-600 ls-3 p-2 border-0 text-uppercase"
                        >
                          <i className="feather-plus"></i> Ask Question
                        </Link>
                      </div>

                      {/* Flex container for the question text and answer button */}
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="font-sm text-grey-800 fw-700 lh-32 flex-grow-1 m-0">
                          {forum && forum.forum_question
                            ? forum.forum_question.question
                            : "No question provided."}
                        </h3>
                        {!isStudentAnswered && (
                          <Link
                            to={"/school_forums/answer_forum/" + forumId}
                            className="btn bg-current text-white font-xssss fw-600 ls-3 p-2 border-0 text-uppercase ms-3"
                          >
                            <i className="feather-plus"></i> Answer
                          </Link>
                        )}
                      </div>

                      <hr />

                      <hr />

                      {/* Answers List */}
                      {forum &&
                      forum.forum_answers &&
                      forum.forum_answers.length > 0 ? (
                        forum.forum_answers.map((forum_answer, index) => (
                          <div key={index} className="mb-3 mt-4">
                            <div className="d-flex align-items-center">
                              <i className="feather-user bg-current rounded-xl p-2 mr-2"></i>
                              <h4 className="font-xsss fw-600">
                                {forum_answer.student.name}
                              </h4>
                            </div>
                            <pre className=" bg-grey p-3 mt-2">
                              {forum_answer.answer}
                            </pre>
                            {/* Assuming forum_answer.created_at is in ISO format */}
                            <p className="font-xssss text-grey-500 mt-2">
                              {new Date(
                                forum_answer.created_at
                              ).toLocaleDateString()}{" "}
                              {new Date(
                                forum_answer.created_at
                              ).toLocaleTimeString()}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center p-3">
                          <pre className=" bg-grey">
                            Not answered yet!
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <StudentSidebar />
          </div>
   
    </>
  );
}

export default ViewForum;
