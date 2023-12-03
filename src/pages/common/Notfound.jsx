import React, {  Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

  function Notfound() {
    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1); // This will take the user back to the previous page in their history
    };
    return (
      <Fragment>
    
        <div className="vertical-wrapper pt-lg--10 pt-5 pb-lg--10 pb-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8 text-center default-page">
                <div className="card border-0 text-center d-block">
                  <img
                    src="https://via.placeholder.com/150x150.png"
                    alt="icon"
                    className="w200 mb-4 ml-auto mr-auto "
                  />
                  <h1 className="fw-700 text-grey-900 display4-size display4-md-size">
                    Oops! It looks like you're lost.
                  </h1>
                  <p className="text-grey-500 font-xss">
                    The page you're looking for isn't available. Try to search
                    again or use the go to.
                  </p>
               
                     <button onClick={goBack} className="p-3 w175 bg-current text-white d-inline-block text-center fw-600 font-xssss rounded-lg text-uppercase ls-3">Go Back</button>
      {/* You can style this button as needed */}
 
                </div>
              </div>
            </div>
          </div>
        </div>

      </Fragment>
    );
  }


export default Notfound;
