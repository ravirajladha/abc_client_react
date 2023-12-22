import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../../components/navigation/BackButton";
import Loader from "../../../components/common/Loader";
import NoContent from "../../../components/common/NoContent";

function Ebooks() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEbooks();
  }, []);

  function getEbooks() {
    setLoading(true);

    let result = fetch(baseUrl + "api/get_ebooks")
      .then(function (result) {
        if (!result.ok) {
          throw new Error("Network response was not ok");
        }
        return result.json();
      })
      .then(function (jsonbody) {
        setEbooks(jsonbody.ebooks);
      })
      .catch(function (error) {
        console.error("Error fetching ebooks:", error);
      })
      .finally(function () {
        setLoading(false);
      });
  }

  return (
    <>
      <div className="middle-sidebar-bottom theme-dark-bg">
        <div className="middle-sidebar-left">
          <div className="row">
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div>
                <h2 className="fw-400 font-lg d-block">
                  All <b> Ebooks</b>
                </h2>
              </div>
              <div className="float-right">
                <Link
                  to={"/ebooks/create_ebook"}
                  className="p-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1"
                >
                  CREATE EBOOK
                </Link>
                <BackButton />
              </div>
            </div>
            {loading ? (
              <Loader />
            ) : ebooks && ebooks.length > 0 ? (
              ebooks.map((ebook, index) => (
                // <div className="col-lg-12 mb-3">
                  <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                    <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                      <a
                        href="#"
                        className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto"
                      >
                        <img
                          src={baseUrl + ebook.image}
                          alt="icon"
                          className="p-1"
                        />
                      </a>
                      <h4 className="fw-700 font-xs mt-4">{ebook.title}</h4>

                      <div className="text-center">
                        <Link
                          to={"/ebooks/preview_ebook_admin/" + ebook.id}
                          className="p-2 mt-4 d-inline-block text-white fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-3 bg-current mx-1"
                        >
                          VIEW
                        </Link>
                        <Link
                          to={"/ebooks/ebook_modules/" + ebook.id}
                          className="p-2 mt-4 d-inline-block text-white fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-3 bg-current mx-1"
                        >
                          CONTENT
                        </Link>
                      </div>
                    </div>
                  {/* </div> */}
                </div>
              ))
            ) : (
              <NoContent contentName="ebooks" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Ebooks;
