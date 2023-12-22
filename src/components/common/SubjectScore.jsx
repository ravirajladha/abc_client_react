import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";

const classList = [
  {
    imageUrl: "user.png",
    title: "Advanced Python Sass",
    per: "87",
    status: "bg-warning",
  },
  {
    imageUrl: "user.png",
    title: "Bootstrap SASS CSS ",
    per: "96",
    status: "bg-success",
  },
  {
    imageUrl: "user.png",
    title: "Basic JAVA",
    per: "95",
    status: "bg-primary",
  },
  {
    imageUrl: "user.png",
    title: "React JS",
    per: "55",
    status: "bg-warning",
  },
];
const multipleChart = {
  series: [0, 0, 100],
  options: {
    chart: {
      height: 350,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            color: "#FFF",
            show: false,
          },
          value: {
            // offsetY: -1,
            color: "#000",
            fontWeight: "700",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function (w) {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return "Score";
            },
          },
        },
      },
    },
  },
};
function SubjectScore() {
  return (
    <div className="card theme-light-bg overflow-hidden rounded-xxl border-0 mb-3">
      {/* <div className="card-body d-flex justify-content-between align-items-end pl-4 pr-4 pt-4 pb-3">
          <h4 className="fw-700 font-xsss">Profile Scrore</h4>
          <Link to="/subjects" className="position-absolute right-0 mr-4">
            <i className="ti-more-alt text-grey-500 font-xs"></i>
          </Link>
        </div> */}
      {/* <div className="card-body d-block pt-0 pb-0 pl-md-5 pr-md-5">
                                <div className="row">
                                    <div className="col-4 text-center mb-3">
                                        <h4 className="text-warning font-xssss fw-700">HTML <span className="d-block mt-1 font-xsssss fw-500 text-grey-500">67%</span></h4>
                                    </div>
                                    <div className="col-4 text-center mb-3">
                                        <h4 className="text-danger font-xssss fw-700">JAVA <span className="d-block mt-1 font-xsssss fw-500 text-grey-500">55%</span></h4>
                                    </div>
                                    <div className="col-4 text-center mb-3">
                                        <h4 className="text-primary font-xssss fw-700">HTML <span className="d-block mt-1 font-xsssss fw-500 text-grey-500">44%</span></h4>
                                    </div> */}
      <div className="col-lg-12">
        {/* <div className="card w-100 p-3 border-0 mt-4 rounded-10 bg-white shadow-xs overflow-hidden"> */}
        <div className="card-body d-flex pb-0">
          <h4 className="font-xss text-grey-800  mt-1 lh-22 fw-700">Score</h4>
          {/* <h5 className="ml-auto mr-3 mt-2 text-grey-600 font-xssss fw-700">
                <span className="btn-round-xss bg-warning mr-1"></span>
                Sale
              </h5>
              <h5 className="mt-2 text-grey-600 font-xssss fw-700">
                <span className="btn-round-xss bg-success mr-1"></span>
                Earn
              </h5> */}
        </div>
        <Chart
          options={multipleChart.options}
          series={multipleChart.series}
          type="radialBar"
        />
        <div className="row">
          <div className="col-4 text-center mb-3">
            <h4 className="text-warning font-xssss fw-700">
              TERM 1{" "}
              <span className="d-block mt-1 font-xsssss fw-500 text-grey-500">
                100%
              </span>
            </h4>
          </div>
          <div className="col-4 text-center mb-3">
            <h4 className="text-danger font-xssss fw-700">
              TERM 2{" "}
              <span className="d-block mt-1 font-xsssss fw-500 text-grey-500">
                0%
              </span>
            </h4>
          </div>
          <div className="col-4 text-center mb-3">
            <h4 className="text-primary font-xssss fw-700">
              TERM 3{" "}
              <span className="d-block mt-1 font-xsssss fw-500 text-grey-500">
                0%
              </span>
            </h4>
            {/* </div> */}
            {/* </div>
                    </div> */}
          </div>
        </div>
      </div>
       
    </div>
  );
}

export default SubjectScore;
