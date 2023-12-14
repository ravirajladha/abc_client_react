import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import { useContext } from "react";
import { AuthContext } from "../../lib/AuthContext.js";
import BackButton from "../../components/navigation/BackButton";

function AllClasses() {

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { user } = useContext(AuthContext);

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    getClasses();
  }, []);
// Define the function as async outside of the conditional block
async function getClasses() {
  try {
    // Determine the URL based on the user type
    const url = user.user.type !== "teacher" 
      ? `${baseUrl}api/get_classes` 
      : `${baseUrl}api/getTeacherClasses/${user.user.id}`;

    // Fetch the classes
    const response = await fetch(url);
    if (!response.ok) {
      // If the response is not OK, throw an error to be caught below
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    console.warn(data); // Consider changing to console.log for production
    setClasses(data);
  } catch (error) {
    console.error("Error fetching classes:", error);
  }
}

// Call the function based on your app's logic, for example in useEffect hook if this is inside a component


  return (
    <>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <div className="row">
                <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                  <div>
                    <h2 className="fw-400 font-lg d-block">
                      All <b>Classes</b>
                    </h2>
                  </div>
                  <div className="float-right">
                  {user.user.type != "teacher" ?
                  <Link
                      to={"/all_subjects/create_class"}
                      className="p-2 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current mx-1"
                    >    Add  Classes
                    </Link>
            
 : ""}
                      
                    <BackButton />
                  </div>
                </div>
                {classes.length > 0 ? (
                  classes.map((singleClass, index) => (
                    <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                      <div className="card mb-4 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                        <h4 className="fw-700 font-xs mt-4 capitalize">
                          {singleClass.class}
                        </h4>
                        {/* Additional details about the class can be listed here */}
                        <div className="card-footer bg-transparent border-top-0">
                        {user.user.type != "teacher" ?
                          <Link
                            to={`/all_subjects/${singleClass.id}`}
                            className="px-2 py-1 mt-4 fw-500 d-inline-block text-white fw-300 lh-30 rounded-lg w100 text-center font-xssss mr-2 ls-3 bg-current"
                          >
                            Subjects
                          </Link>
                          : ""}
                        <Link
                                to={`/school/class/${singleClass.id}/subjects`}
                                className="px-2 py-1 mt-4 fw-500 d-inline-block text-white fw-600 lh-30 rounded-lg w100 text-center font-xssss mr-2 ls-3 bg-current"
                              >
                                Subjects
                              </Link>
                             
                          
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h2 className="fw-400 font-lg d-block text-center">
                    Loading classes...
                  </h2>
                )}
              </div>
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    </>
  );
}

export default AllClasses;
