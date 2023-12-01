import React, { useState } from "react";

function FAQ() {
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);

  const handleFAQChange = (index, e) => {
    const updatedFaqs = faqs.map((faq, i) => {
      if (i === index) {
        return { ...faq, [e.target.name]: e.target.value };
      }
      return faq;
    });
    setFaqs(updatedFaqs);
  };
  const handleAddFAQ = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };
  const handleRemoveFAQ = (index) => {
    const updatedFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(updatedFaqs);
  };
  return (
    <>
      <div className="card-box">
        <div className="card-head">
          <h4 className="font-xs mont-font fw-600">FAQ's</h4>
        </div>
        <div className="card-body">
          {faqs.map((faq, index) => (
            <div className="row">
              <React.Fragment key={index}>
                <div className="col-md-3 col-sm-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Question
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter question"
                      name="question"
                      value={faq.question}
                      onChange={(e) => handleFAQChange(index, e)}
                    />
                  </div>
                </div>
                <div className="col-md-3 col-sm-3 d-flex align-items-center">
                  <div className="form-group">
                    {faqs.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-default btn-add"
                        onClick={() => handleRemoveFAQ(index)}
                      >
                        -
                      </button>
                    )}
                  </div>
                </div>
                <div className="col-md-3 col-sm-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">Answer</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter answer"
                      name="answer"
                      value={faq.answer}
                      onChange={(e) => handleFAQChange(index, e)}
                    />
                  </div>
                </div>
                <div className="col-md-3 d-flex align-items-center">
                  <button
                    type="button"
                    className="btn btn-default"
                    onClick={handleAddFAQ}
                  >
                    +
                  </button>
                </div>
              </React.Fragment>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FAQ;
