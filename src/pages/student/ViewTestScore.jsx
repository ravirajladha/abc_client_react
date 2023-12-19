import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../lib/AuthContext.js"
import { getUserFromLocalStorage } from "../util/SessionStorage";

import AppFooter from "../../components/includes/AppFooter";
import AppHeader from "../../components/includes/AppHeader";
import StudentSidebar from '../../components/includes/StudentSidebar';

function ViewTestScore() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { subject_id, test_id } = useParams();
  const [score, setScore] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Make sure the user is available before fetching the score
    if (!user) {
      console.log("User not logged in or user data not available.");
      // Optional: redirect to login or handle the missing user case
      return;
    }

    const user_id = user.user?.id; // Directly access the user_id from the user object
    const get_test_score = () => {
      fetch(`${baseUrl}api/get_test_score/${test_id}/${user_id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json",
        },
      })
      .then((res) => {
        if (!res.ok) {
          // Handle HTTP errors here
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((resp) => {
        console.log(resp);
        setScore(resp.score);
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
    };

    get_test_score();
  // Include `user` in the dependency array to re-fetch when the user logs in/out
  }, [baseUrl, test_id, user]);
  return (
    <>
     
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <div className="row">
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                  <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-5 border-0 text-left question-div">
                    <div
                      className="card-body text-center p-3 bg-no-repeat bg-image-topcenter"
                      id="question4"
                    >
                      <img
                        src="/assets/images/star.png"
                        width="100"
                        alt="icon"
                        className="d-inline-block"
                      />

                      <h3 className="fw-700 mt-5 text-grey-900 font-xxl">
                        Your score : <span>{score}</span>
                      </h3>
                      <p className="font-xssss fw-600 lh-30 text-grey-500 mb-0 p-2">
                        Your test is completed, you can find your score above.{" "}
                      </p>

                      <Link
                        to={"/subject_stream/" + subject_id}
                        data-question="question4"
                        className=" p-2 mt-3 d-inline-block text-white fw-700 lh-30 rounded-lg w200 text-center font-xsssss ls-3 bg-current"
                      >
                        Go back to course
                      </Link>
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

export default ViewTestScore;
