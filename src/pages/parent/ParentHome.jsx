import React, { useState, useEffect } from 'react';
import AppHeader from '../../components/includes/AppHeader';
import AppFooter from '../../components/includes/AppFooter';
import Dropdown from '../../components/inputs/Dropdown';
import Chart from 'react-apexcharts';
import axios from 'axios';

import { getUserFromLocalStorage } from '../../pages/util/SessionStorage';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { AuthContext } from "../../lib/AuthContext.js"
const iconlList = [
    {
        name: '325',
        count: 'Courses complete',
        status: 'warning',
        icon: 'feather-hard-drive',
        des: '20% Increase from Last Week',
      },
      {
        name: '43',
        count: 'Active Courses',
        status: 'success',
        icon: 'feather-box',
        des: '20% Increase from Last Week',
      },
      {
        name: '5444',
        count: 'Enrolled Students',
        status: 'info',
        icon: 'feather-award',
        des: '20% Increase from Last Week',
      },
      {
        name: '354',
        count: 'Activity Points',
        status: 'secondary',
        icon: 'feather-flag',
        des: '20% Increase from Last Week',
      },
    ];
    


    const orderlList = [
        {
          id: '0901',
          name: 'Student1',
          email: 'student1@example.com',
          score: '545',
          color: 'warning',
          status: 'Pending',
          date: '03.12.2020',
        },
        {
          id: '2323',
          name: 'Student2',
          email: 'student2@example.com',
          score: '545',
          color: 'warning',
          status: 'Pending',
          date: '21.02.2020',
        },
        {
          id: '1233',
          name: 'Student3',
          email: 'student3@example.com',
          score: '545',
          color: 'danger',
          status: 'Canceled',
          date: '03.07.2020',
        },
        {
          id: '1233',
          name: 'Student4',
          email: 'student4@example.com',
          score: '545',
          color: 'danger',
          status: 'Canceled',
          date: '03.07.2020',
        },
        {
          id: '2323',
          name: 'Student5',
          email: 'student5@example.com',
          score: '545',
          color: 'success',
          status: 'Received',
          date: '22.05.2020',
        },
      ];

const lineChart = {
    labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ],
    series: [
        {
            name: '',
            data: [
                35, 16, 34, 36, 18, 35, 26, 34, 26, 18, 36, 18, 36, 34, 36, 18, 16, 18,
            ],
        },
        {
            name: '',
            data: [12, 24, 12, 11, 7, 12, 34, 12, 11, 7, 11, 7, 34, 12, 11, 7, 11, 7],
        },
    ],
    options: {
        chart: {
            height: 100,
            type: 'bar',
            // width:'50%',
            stacked: true,
            toolbar: {
                show: false,
            },
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0,
                    },
                },
            },
        ],
        plotOptions: {
            columnWidth: '40%',
            bar: {
                horizontal: false,
                borderRadius: 10,
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        fill: {
            opacity: 1,
        },
    },
};

const pieChart = {
    series: [44, 55, 41, 17, 15],
    options: {
        chart: {
            type: 'donut',
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300,
                    },
                    legend: {
                        position: 'bottom',
                    },
                    stacked: true,
                    toolbar: {
                        show: false,
                    },
                },
            },
        ],
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
    },
};
const baseUrl = process.env.REACT_APP_BASE_URL;

  
function ParentHome() {
    
const [parentCode,setParentCode]  = useState("")
const  userDetails = useContext(AuthContext).user;
if (!userDetails) {
    // Handle the case when there is no user. You might want to redirect
    // to a login page or return null or some placeholder content.
    console.log("No user found. User might be logged out.");
    return <div>User is not logged in</div>;
  }
const fetchUserDetails = async () => {
    try {
        if (!userDetails) {
          // Handle the case when there is no user. You might want to redirect
          // to a login page or return null or some placeholder content.
          console.log("No user found. User might be logged out.");
          return <div>User is not logged in</div>;
        }
      const userId = userDetails.user.id; // Assuming you store the user ID in local storage
  
      const response = await axios.get(`${baseUrl}api/getParentCode?user_id=${userId}`);
      if (response.data.success) {
        console.log('Parent code:', response.data.data.parent_code);
        setParentCode(response.data.data.parent_code)
    // const    parent_code = response.data.data.parent_code;
      } else {
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  
  // Call this function wherever you need to fetch the user details
  fetchUserDetails();


    // const userDetails = getUserFromLocalStorage()
    return (
        <>
            <div className="main-wrapper">
                <div className="main-content">
                    <AppHeader />
                    <div className="middle-sidebar-bottom theme-dark-bg">
                        <div className="custom-middle-sidebar-left">
                            <div className="container p-2">
                                <div className="row mb-2">
                                    <h1>Welcome, {userDetails.user.name}! {parentCode}</h1> <br />
                                </div>
                                <div className="row">
                                <div className="col-lg-6 d-flex mb-4 justify float-right">
                                        <h2 className="text-grey-900 font-md fw-700">Parent Code:  {parentCode} </h2>
                                    </div>
                                    <div className="col-lg-6 d-flex mb-4 justify float-right">
                                        <select
                                            className="form-select ml-auto float-right border-0 font-xssss fw-600 text-grey-700 bg-transparent"
                                            aria-label="Default select example"
                                        >
                                            <option>Sort by latest</option>
                                            <option defaultValue="1">Sort by popularity</option>
                                            <option defaultValue="2">
                                            Sort by score : low to high
                      </option>
                      <option defaultValue="3">
                        Sort by score : high to low
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    {iconlList.map((value, index) => (
                                        <div key={index} className="col-lg-3">
                                            <div
                                                className={`card mb-4 border-0 pt-4 pb-4 text-center alert-${value.status} align-items-center rounded-10`}
                                            >
                                                <i
                                                    className={`psor text-white btn-round-md font-xs ${value.icon} bg-${value.status}`}
                                                ></i>
                                                <h3 className="fw-700 font-xl text-grey-900 mt-2 ls-3 mb-0">
                                                    {value.name}
                                                </h3>
                                                <span className="font-xssss ls-0 text-grey-900 fw-700 mt-0">
                                                    {value.count}
                                                </span>
                                                <span className="mt-1 text-grey-500 font-xsssss fw-500">
                                                    {value.des}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card border-0 p-4 mt-2 rounded-10">
                                            <div className="card-body d-flex">
                                                <h4 className="font-xss text-grey-800 mb-4 mt-3 fw-700">
                                                Student Statistics
                        </h4>
                        <h5 className="ml-auto mr-3 mt-2 text-grey-600 font-xssss fw-700">
                          <span className="btn-round-xss bg-warning mr-1"></span>
                          New Enrollments
                        </h5>
                        <h5 className="mt-2 text-grey-600 font-xssss fw-700">
                          <span className="btn-round-xss bg-success mr-1"></span>
                          Courses Completed
                                                </h5>
                                            </div>
                                            <Chart
                                                options={lineChart.options}
                                                series={lineChart.series}
                                                type="bar"
                                                width="100%"
                                                height="350"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12 mt-4">
                                        <div className="card border-0 mt-2 rounded-10">
                                            <div className="card-body d-flex px-4 pt-4 pb-0">
                                                <h4 className="font-xss text-grey-800 mt-3 fw-700">
                                                Score Details
                        </h4>
                        <select
                          className="form-select ml-auto float-right border-0 font-xssss fw-600 text-grey-700 bg-transparent"
                          aria-label="Default select example"
                        >
                          <option>Sort by latest</option>
                          <option defaultValue="1">Sort by popularity</option>
                          <option defaultValue="2">
                            Sort by score : low to high
                          </option>
                          <option defaultValue="3">
                            Sort by score : high to low
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="card-body p-4">
                                                <div className="table-responsive">
                                                    <table className="table table-admin mb-0">
                                                        <thead className="bg-greylight rounded-10 ovh border-0">
                                                            <tr>
                                                                <th className="border-0">ID</th>
                                                                <th className="border-0" scope="col">
                                                                    Name
                                                                </th>
                                                                <th className="border-0" scope="col">
                                                                    Email
                                                                </th>
                                                                <th className="border-0" scope="col">
                                                                    Total
                                                                </th>
                                                                <th className="border-0" scope="col">
                                                                    Status
                                                                </th>
                                                                <th className="border-0" scope="col">
                                                                    Date
                                                                </th>
                                                                <th scope="col" className="text-end border-0">
                                                                    Action
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {orderlList.map((value, index) => (
                                                                <tr key={index}>
                                                                    <td>{value.id}</td>
                                                                    <td>
                                                                        <b>{value.name}</b>
                                                                    </td>
                                                                    <td>{value.email}</td>
                                                                    <td>{value.score}</td>
                                                                    <td>
                                                                        <span
                                                                            className={`badge rounded-pill font-xsssss fw-700 pl-3 pr-3 lh-24 text-uppercase rounded-3 ls-2 alert-${value.color}`}
                                                                        >
                                                                            {value.status}
                                                                        </span>
                                                                    </td>
                                                                    <td>{value.date}</td>
                                                                    <td className="product-remove text-end">
                                                                        <a href="/admin">
                                                                            <i className="feather-edit me-1 font-xs text-grey-500"></i>
                                                                        </a>
                                                                        <a href="/admin">
                                                                            <i className="ti-trash  font-xs text-danger ml-3"></i>
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                  <div className="col-lg-4">
                    <div className="card w-100 p-3 border-0 mt-4 rounded-10 bg-white shadow-xs overflow-hidden">
                      <div className="card-body d-flex pb-0">
                        <h4 className="font-xss text-grey-800  mt-1 lh-22 fw-700">
                          Statistics
                        </h4>
                        <h5 className="ml-auto mr-3 mt-2 text-grey-600 font-xssss fw-700">
                          <span className="btn-round-xss bg-warning mr-1"></span>
                          New Enrollments
                        </h5>
                        <h5 className="mt-2 text-grey-600 font-xssss fw-700">
                          <span className="btn-round-xss bg-success mr-1"></span>
                          Courses Completed
                        </h5>
                      </div>
                      <Chart
                        options={pieChart.options}
                        series={pieChart.series}
                        type="donut"
                      />
                      <div className="row mt-2">
                        <div className="col-6 mb-1 text-center">
                          <h2 className="font-md mb-1 text-grey-900 fw-700 ls-lg">
                          454
                          </h2>
                          <h4 className="text-grey-500 d-flex justify-content-center fw-600 ls-lg font-xsssss text-uppercase">
                            <span className="mr-2 bg-facebook btn-round-xss d-inline-block mt-0 me-2 rounded-circle"></span>
                            this week
                          </h4>
                        </div>
                        <div className="col-6 mb-1 text-center">
                          <h2 className="font-md mb-1 text-grey-900 fw-700 ls-lg">
                            54m
                          </h2>
                          <h4 className="text-grey-500 d-flex justify-content-center fw-600 ls-lg font-xsssss text-uppercase">
                            <span className="mr-2 bg-instagram btn-round-xss d-inline-block mt-0 me-2 rounded-circle"></span>
                            this month
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="card border-0 mt-4 bg-lightblue rounded-10">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 p-5">
                          <h2 className="text-grey-900 fw-700 ls-0 font-xxl lh-3 m-0 pt-3">
                            Learning Management System
                          </h2>
                          <p className="text-grey-500 font-xssss mt-2 fw-500">
                            Vivamus adipiscing nisl ut dolor dignissim semper.
                            Nulla luctus malesuada tincidunt luctus malesuada
                            tincidunt.
                          </p>
                          <a
                            href="/admin"
                            className="bg-success text-white rounded-xl btn-cart w125 d-inline-block text-center font-xsssss p-3 fw-700 ls-3"
                          >
                            ANALYTICS
                          </a>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 p-4">
                          <img
                            src="https://via.placeholder.com/400x300.png"
                            alt="flame"
                            className="w-100 pr-3 pt-5 "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <AppFooter />
            </div>
        </>
    )
}

export default ParentHome
