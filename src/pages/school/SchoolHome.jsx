import React, { useState, useEffect } from 'react';
import Appheader from '../../components/schoolComponents/Appheader';
import Appfooter from '../../components/schoolComponents/Appfooter';
import Dropdown from '../../components/inputs/Dropdown';
import Chart from 'react-apexcharts';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const iconlList = [
    {
        name: '325.2k',
        count: 'Order complete',
        status: 'warning',
        icon: 'feather-hard-drive',
        des: '20% Incrase from Last Week',
    },
    {
        name: '43.4k',
        count: 'Active Courses',
        status: 'success',
        icon: 'feather-box',
        des: '20% Incrase from Last Week',
    },
    {
        name: '54M',
        count: 'Active Customers',
        status: 'info',
        icon: 'feather-award',
        des: '20% Incrase from Last Week',
    },
    {
        name: '354',
        count: 'Calories gain',
        status: 'secondary',
        icon: 'feather-flag',
        des: '20% Incrase from Last Week',
    },
];

const orderlList = [
    {
        id: '0901',
        name: 'Marvin McKinney',
        email: 'marvin@example.com',
        total: '$9.00',
        color: 'warning',
        status: 'Pending',
        date: '03.12.2020',
    },
    {
        id: '2323',
        name: 'Leslie Alexander',
        email: 'leslie@example.com',
        total: '$46.61',
        color: 'warning',
        status: 'Pending',
        date: '21.02.2020',
    },
    {
        id: '1233',
        name: 'Esther Howard',
        email: 'esther@example.com',
        total: '$12.00',
        color: 'danger',
        status: 'Canceled',
        date: '03.07.2020',
    },
    {
        id: '1233',
        name: 'Esther Howard',
        email: 'esther@example.com',
        total: '$12.00',
        color: 'danger',
        status: 'Canceled',
        date: '03.07.2020',
    },
    {
        id: '2323',
        name: 'Jenny Wilson',
        email: 'jenny@example.com',
        total: '$589.99',
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
function SchoolHome() {
    return (
        <>
            <div className="main-wrapper">
                <div className="main-content menu-active">
                    <Appheader />
                    <div className="middle-sidebar-bottom theme-dark-bg">
                        <div className="middle-sidebar-left">
                            <div className="container px-3 py-4">
                                <div className="row">
                                    <div className="col-lg-12 d-flex mb-4">
                                        <h2 className="text-grey-900 font-md fw-700">Overview</h2>
                                        <select
                                            className="form-select ml-auto float-right border-0 font-xssss fw-600 text-grey-700 bg-transparent"
                                            aria-label="Default select example"
                                        >
                                            <option>Sort by latest</option>
                                            <option defaultValue="1">Sort by popularity</option>
                                            <option defaultValue="2">
                                                Sort by price : low to high
                                            </option>
                                            <option defaultValue="3">
                                                Sort by price : high to low
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
                                                    Sales Statistics
                                                </h4>
                                                <h5 className="ml-auto mr-3 mt-2 text-grey-600 font-xssss fw-700">
                                                    <span className="btn-round-xss bg-warning mr-1"></span>
                                                    Sale
                                                </h5>
                                                <h5 className="mt-2 text-grey-600 font-xssss fw-700">
                                                    <span className="btn-round-xss bg-success mr-1"></span>
                                                    Earn
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
                                                    Order List
                                                </h4>
                                                <select
                                                    className="form-select ml-auto float-right border-0 font-xssss fw-600 text-grey-700 bg-transparent"
                                                    aria-label="Default select example"
                                                >
                                                    <option>Sort by latest</option>
                                                    <option defaultValue="1">Sort by popularity</option>
                                                    <option defaultValue="2">
                                                        Sort by price : low to high
                                                    </option>
                                                    <option defaultValue="3">
                                                        Sort by price : high to low
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
                                                                    <td>{value.total}</td>
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
                                                    Sale
                                                </h5>
                                                <h5 className="mt-2 text-grey-600 font-xssss fw-700">
                                                    <span className="btn-round-xss bg-success mr-1"></span>
                                                    Earn
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
                                                        44.2k
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
                                                        Online Course and LMS React Template
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
                <Appfooter />
            </div>
        </>
    )
}

export default SchoolHome
