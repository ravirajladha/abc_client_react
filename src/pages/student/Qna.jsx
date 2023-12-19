import React, { useState, useEffect } from "react";
import AppFooter from "../../components/includes/AppFooter";
import AppHeader from "../../components/includes/AppHeader";
import StudentSidebar from "../../components/includes/StudentSidebar";
import BackButton from "../../components/navigation/BackButton";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchResults from "../../components/common/SearchResults.jsx";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../lib/AuthContext.js";
function Qna() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { user } = useContext(AuthContext); // Destructure user directly from context
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [subjects, setSubjects] = useState([]);
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState("");
  const [allQnas, setAllQnas] = useState([]);
  const [qnaValue, setQnaValue] = useState("");
  const [qnaId, setQnaId] = useState("");

  console.log("class_id", user.student.class_id);

  const getSubjects = () => {
    if (user && user.student.class_id) {
      fetch(`${baseUrl}api/get_student_subjects/${user.student.class_id}`)
        .then((result) => result.json())

        .then((jsonbody) => {
          setSubjects(jsonbody);
        })
        .catch((error) => {
          console.error("Error fetching subjects:", error);
        });
    }
  };
  useEffect(() => {
    getSubjects();
  }, [user]); // Depend on user

  const submitSchoolQna = (e) => {
    let inputobj = {
      question: question,
      subject: subject,
      userId: userId,
    };

    e.preventDefault();
    setIsSubmitting(true);

    if (validate()) {
      fetch(baseUrl + "api/submitSchoolQna", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(inputobj),
      })
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          setSubject("");
          setQuestion("");
          toast.success(resp.msg);
        })
        .catch((err) => {
          toast.error("Could not submit question :" + err.message);
        })
        .finally(() => {
          setIsSubmitting(false); // Re-enable the submit button
        });
    }
  };
  const validate = () => {
    let result = true;

    if (question === "" || question === null) {
      result = false;
      toast.warning("Please Enter Question");
    }
    if (subject === "" || subject === null) {
      result = false;
      toast.warning("Please Select Subject");
    }
    return result;
  };

  function search(name) {
    setQnaValue(name);
    if (name.trim() === "") {
      // If the search input is empty or only contains spaces, clear the results
      setAllQnas([]);
    } else {
      let result = fetch(
        baseUrl + "api/search_school_questions/" + name
      ).then(function (result) {
        result.json().then(function (jsonbody) {
          //console.warn(jsonbody);
          setAllQnas(jsonbody);
        });
      });
    }
  }

  function handleResultClick(selectedValue, selectedId) {
    setQnaValue(selectedValue);
    setQnaId(selectedId);
    // setAllQnas([]);
  }
  if (!user) {
    // Handle the case when there is no user. You might want to redirect
    // to a login page or return null or some placeholder content.
    console.log("No user found. User might be logged out.");
    return <div>User is not logged in</div>;
  }
  const userId = user.user.id;
  return (
    <>
 

          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                <div>
                  <h2 className="fw-400 font-lg d-block">
                    {" "}
                    <b> QnA</b>{" "}
                  </h2>
                </div>
                <div className="float-right">
                  <BackButton />
                </div>
              </div>

              <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="row">
                  <div className="col-lg-10 col-10">
                    <div className="form-group icon-input mb-0 search-box">
                      <i className="ti-search font-xs text-grey-400"></i>
                      <input
                        type="text"
                        className="style1-input bg-transparent border-0 pl-5 font-xsss mb-0 text-grey-500 fw-500"
                        placeholder="Search questions.."
                        onChange={(e) => search(e.target.value)}
                        value={qnaValue}
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-2 col-2">
                    <Link
                      to={"/school_qna/view_qna/" + qnaId}
                      id="search-button"
                      className="w-100 d-block btn bg-current text-white font-xssss fw-600 ls-3 style1-input p-3 border-0 text-uppercase "
                    >
                      Search
                    </Link>
                  </div>
                </div>
                {allQnas && allQnas.length > 0 && (
                  <SearchResults
                    results={allQnas}
                    onResultClick={handleResultClick}
                  />
                )}
              </div>
              <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="card-body p-4 w-100 border-0 d-flex rounded-lg">
                  <h2 className="fw-300 font-400 d-block">
                    Ask <b> Question</b>{" "}
                  </h2>
                </div>
                <div className="card-body px-5 w-100 border-0 ">
                  <form onSubmit={submitSchoolQna}>
                    <div className="row mb-6">
                      <ToastContainer autoClose={3000} />

                      <div className="col-lg-12">
                        <label className="mont-font fw-600 font-xsss">
                          Select Subject
                        </label>
                        <br />
                        <select
                          id="subject"
                          className="form-control"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          
                        >
                          <option aria-readonly disabled value="">
                            -Select-
                          </option>
                          {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                              {subject.subject_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-lg-12">
                        <label className="mont-font fw-600 font-xsss">
                          Question
                        </label>
                        <br />
                        <textarea
                          rows="4"
                          cols="70"
                          className="form-control"
                          placeholder="Enter Question.."
                          required
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 mt-4"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <StudentSidebar />
          </div>
      
    </>
  );
}

export default Qna;
