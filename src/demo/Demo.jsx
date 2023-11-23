import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import './demo.css';

const newDemoList = [
  { imageUrl: 'd-1.jpg', title: 'Default', url: 'default' },
  { imageUrl: 'd-34.jpg', title: 'Category', url: 'default-categories' },
  { imageUrl: 'd-21.jpg', title: 'Search', url: 'default-search' },
  { imageUrl: 'd-2.jpg', title: 'Member', url: 'default-follower' },
  { imageUrl: 'd-3.jpg', title: 'Channel', url: 'default-channel' },
  { imageUrl: 'd-4.jpg', title: 'Live Stream', url: 'default-live-stream' },
  { imageUrl: 'd-5.jpg', title: 'User Profile', url: 'default-user-profile' },
  {
    imageUrl: 'd-6.jpg',
    title: 'Author Profile',
    url: 'default-author-profile',
  },
  { imageUrl: 'd-7.jpg', title: 'Course Single 1', url: 'default-course-one' },
  { imageUrl: 'd-8.jpg', title: 'Course Single 2', url: 'default-course-two' },
  // { imageUrl: 'd-10.jpg', title: 'Test', url: 'default-test' },
  { imageUrl: 'd-11.jpg', title: 'Analytics', url: 'default-analytics' },
  { imageUrl: 'd-9.jpg', title: 'Email Box', url: 'email-box' },
  { imageUrl: 'd-13.jpg', title: 'Chat', url: 'message' },
  { imageUrl: 'd-17.jpg', title: 'Settings', url: 'default-settings' },
  { imageUrl: 'd-15.jpg', title: 'Contact', url: 'contact-information' },
  { imageUrl: 'd-16.jpg', title: 'Account', url: 'account-information' },
  { imageUrl: 'd-19.jpg', title: 'Payment', url: 'payment' },
  { imageUrl: 'd-18.jpg', title: 'Password', url: 'password' },
  { imageUrl: 'd-20.jpg', title: 'Social', url: 'social' },
  { imageUrl: 'd-12.jpg', title: 'Popup Chat', url: 'popup-chat' },
];

const shopList = [
  { imageUrl: 'h-2.jpg', title: 'Home 1', url: 'home-2' },
  { imageUrl: 'h-3.jpg', title: 'Home 2', url: 'home-3' },
  { imageUrl: 'h-4.jpg', title: 'Home 3', url: 'home-4' },
  { imageUrl: 'h-6.jpg', title: 'Home 4', url: 'home-5' },
  { imageUrl: 'h-5.jpg', title: 'Home 5', url: 'home-6' },
  { imageUrl: 'h-7.jpg', title: 'Courses Grid 1', url: 'courses-grid-1' },
  { imageUrl: 'h-8.jpg', title: 'Courses Grid 2', url: 'courses-grid-2' },
  { imageUrl: 'h-9.jpg', title: 'Courses Grid 3', url: 'courses-grid-3' },
  { imageUrl: 'h-10.jpg', title: 'Course Single', url: 'course-details' },
  { imageUrl: 'h-11.jpg', title: 'Course Single 2', url: 'course-details-2' },
  { imageUrl: 'h-13.jpg', title: 'Author Profile', url: 'user-profile' },
  { imageUrl: 'h-12.jpg', title: 'User Profile', url: 'author-profile' },
];
const adminList = [
  { imageUrl: 'admin-1.jpg', title: 'Overview', url: 'admin' },
  { imageUrl: 'admin-2.jpg', title: 'Course List', url: 'admin-productlist' },
  { imageUrl: 'admin-3.jpg', title: 'Course Gird', url: 'admin-productgird' },
  { imageUrl: 'admin-4.jpg', title: 'Add Course', url: 'admin-productadd' },
  { imageUrl: 'admin-7.jpg', title: 'Review', url: 'admin-review' },
  { imageUrl: 'admin-6.jpg', title: 'Chat', url: 'admin-chat' },
  { imageUrl: 'admin-5.jpg', title: 'Email', url: 'admin-email' },
  { imageUrl: 'admin-8.jpg', title: 'Order', url: 'admin-order' },
  { imageUrl: 'admin-9.jpg', title: 'Order View', url: 'admin-orderview' },
  { imageUrl: 'admin-10.jpg', title: 'Customer', url: 'admin-customer' },
  {
    imageUrl: 'admin-11.jpg',
    title: 'Customer View',
    url: 'admin-customerview',
  },
  { imageUrl: 'admin-12.jpg', title: 'Channel', url: 'admin-venderlist' },
  { imageUrl: 'admin-13.jpg', title: 'Channel View', url: 'admin-venderview' },
];
const productList = [
  { imageUrl: 'shop-2.jpg', title: 'Shop 1', url: 'shop-1' },
  { imageUrl: 'shop-3.jpg', title: 'Shop 2', url: 'shop-2' },
  { imageUrl: 'shop-1.jpg', title: 'Shop 3', url: 'shop-3' },
  {
    imageUrl: 'single-product-3.jpg',
    title: 'Single Product 1',
    url: 'single-product',
  },
  {
    imageUrl: 'single-product-2.jpg',
    title: 'Single Product 2',
    url: 'single-product-2',
  },
  {
    imageUrl: 'single-product.jpg',
    title: 'Single Product 3',
    url: 'single-product-3',
  },
  { imageUrl: 'cart.jpg', title: 'Cart', url: 'cart' },
  { imageUrl: 'checkout.jpg', title: 'Checkout', url: 'checkout' },
];

const pageList = [
  { imageUrl: 'login.jpg', title: 'Login', url: 'login' },
  { imageUrl: 'register.jpg', title: 'Register', url: 'register' },
  { imageUrl: 'forgot.jpg', title: 'Forgot', url: 'forgot' },
  { imageUrl: 'coming-soon.jpg', title: 'Coming Soon', url: 'coming-soon' },
  { imageUrl: 'not-found.jpg', title: 'Notfound', url: 'notfound' },
  { imageUrl: 'blog.jpg', title: 'Blog', url: 'blog' },
  { imageUrl: 'blog-sidebar.jpg', title: 'Blog Sidebar', url: 'blog-sidebar' },
  { imageUrl: 'blog-single.jpg', title: 'Blog Single', url: 'blog-single' },
  { imageUrl: 'contact.jpg', title: 'Contact', url: 'contact' },
  { imageUrl: 'contact-two.jpg', title: 'Contact 2  log', url: 'contact-2' },
  { imageUrl: 'about.jpg', title: 'About', url: 'about' },
  { imageUrl: 'service.jpg', title: 'Service', url: 'service' },
  { imageUrl: 'price.jpg', title: 'Price', url: 'price' },
];

const featureList = [
  {
    icon: 'ti-gift',
    title: 'Developer Friendly',
    des: 'Choose among many ready to get your business running in no time!',
  },
  {
    icon: 'ti-reload',
    title: 'Documentation',
    des: 'Use our unique pre-made elements to make your site stand out.',
  },
  {
    icon: 'ti-medall-alt',
    title: 'Quality Code',
    des: 'SaasLand has a super easy way toimport the demo with One moment.',
  },
  {
    icon: 'ti-comments',
    title: '24/7 Support',
    des: 'Get the most popular solutions on themarket for working with for free!',
  },
  {
    icon: 'ti-panel',
    title: 'Dark Mode',
    des: 'The code is always optimized for bestperformance on all.',
  },
  {
    icon: 'ti-user',
    title: 'User Friendly',
    des: 'The documentation file covers all theInformation needed to install and use this.',
  },
  {
    icon: 'ti-bar-chart',
    title: 'Clean Component',
    des: 'Responsive to makeyour website look beautiful in all devices.',
  },
  {
    icon: 'ti-package',
    title: '12 Color  Option',
    des: 'Stuck? Need help? Visit our supportportal to find FAQ and a way to contact us.',
  },
  {
    icon: 'ti-stats-down',
    title: 'Apps Pages',
    des: 'The documentation file covers all theInformation needed to install and use this.',
  },
];

// class Demo extends Component {
//   render() {
  function Demo() {
    return (
      <div className="demo-style">
        <div className="header-wrapper">
          <div className="container-fluid max-container">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6">
                <a href="/" className="logo">
                  <i className="feather-slack text-success"></i>
                  <span className=" fredoka-font ls-3 fw-600 text-current font-xl logo-text mb-0 d-none d-md-block">
                    Elomoas.
                  </span>
                </a>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 d-none d-lg-block">
                <ul className="list-inline text-center mb-0 mt-2 pt-1">
                  <li className="list-inline-item pl-4 pr-4">
                    <a className="scroll-tiger" href="#feature">
                      Features
                    </a>
                  </li>
                  <li className="list-inline-item pl-4 pr-4">
                    <a className="scroll-tiger" href="#demo">
                      Demo
                    </a>
                  </li>
                  <li className="list-inline-item pl-4 pr-4">
                    <a className="scroll-tiger" href="#contact">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6 text-right">
                <a href="/" className="btn btn-lg btn-primary text-uppercase">
                  Buy Now
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="banner-wrapper vh100 bscover"
          style={{ backgroundImage: `url("assets/images/demo/demo-bg.jpg")` }}
        >
          <div className="banner-content">
            <div className="container-fluid max-container">
              <div className="row">
                <div className="col-xl-5 col-md-6 col-sm-8">
                  <h2 className="title-text mb-5 mt-5">
                    <b>
                      <span>Online</span> Course and LMS React Template
                    </b>
                  </h2>
                  <h4 className="d-inline-block mr-5">
                    60+ <span>HTML Page</span>
                  </h4>
                  <h4 className="d-inline-block mr-5">
                    14+ <span>Widgets</span>
                  </h4>
                  <h4 className="d-inline-block mr-5">
                    8+ <span>Home Demo</span>
                  </h4>
                  <h4 className="d-inline-block mr-5">
                    56+ <span>UI Elements</span>
                  </h4>
                  <div className="clearfix"></div>
                  <a
                    href="#demo"
                    className="btn btn-lg btn-primary mr-4 text-uppercase mt-5"
                  >
                    See DEMOs
                  </a>

                  <div className="icon-scroll pos-bottom-center icon-white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section pb50 pt100" id="feature">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6 text-center">
                <h2 className="title-text2 mb-4">
                  <b>Explore Feature</b>
                </h2>
                <p>
                  Zipto powers thousands of apps at some of the smartest
                  companies around the world. Be a part of professional
                  community.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 pt100"></div>

              {featureList.map((value, index) => (
                // Start Single Demo
                <div key={index} className="col-xl-4 col-lg-6">
                  <div className="icon-div mb80">
                    <i class={`${value.icon}`}></i>
                    <h3> {value.title}</h3>
                    <p>{value.des}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="demo-link pt-5 pb-5 bg-lightgrey" id="demodiv">
          <div className="container-fluid max-container">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center pt-lg-5">
                <span className="text-success text-uppercase fw-700 ls-3 font-xsssss p-2 rounded-6 alert-success">
                  PRE-BUILT DEMOS
                </span>
                <h2 className="title-text2 mb-4 mt-3">
                  <b>Choose out the pre-built pages of Elomoas</b>
                </h2>
              </div>
            </div>
            <div className="row justify-content-center">
              <Tabs
                defaultActiveKey="demo"
                id="uncontrolled-tab-example"
                className="mb-3 list-inline-center d-block text-center border-0"
              >
                <Tab eventKey="demo" title="Demo" className="list-inline-item">
                  <div className="row mt-5">
                    {newDemoList.map((value, index) => (
                      // Start Single Demo
                      <div
                        key={index}
                        className="col-lg-4 mb-lg-5 mb-4 col-md-6 demo-item px-lg-3"
                      >
                        <div className="card p-0 rounded-10 bg-transparent border-0">
                          <a href={`/${value.url} `}>
                            <img
                              src={`assets/images/demo/${value.imageUrl}`}
                              alt="demo-i"
                              className="w-100 rounded-6 ovh"
                            />
                          </a>
                          <h4 className="text-grey-900 text-center mt-lg-4 pt-2 mt-3 fw-700 font-xsss">
                            {value.title}
                          </h4>
                        </div>
                      </div>
                      // End Single Demo
                    ))}
                  </div>
                </Tab>
                <Tab eventKey="home" title="Home" className="list-inline-item">
                  <div className="row mt-5">
                    {shopList.map((value, index) => (
                      // Start Single Demo
                      <div
                        key={index}
                        className="col-lg-4 mb-lg-5 mb-4 col-md-6 demo-item px-lg-3"
                      >
                        <div className="card p-0 rounded-10 bg-transparent border-0">
                          <a href={`/${value.url} `}>
                            <img
                              src={`assets/images/demo/${value.imageUrl}`}
                              alt="demo-i"
                              className="w-100 rounded-6 ovh"
                            />
                          </a>
                          <h4 className="text-grey-900 text-center mt-lg-4 pt-2 mt-3 fw-700 font-xsss">
                            {value.title}
                          </h4>
                        </div>
                      </div>
                      // End Single Demo
                    ))}
                  </div>
                </Tab>
                <Tab eventKey="shop" title="Shop" className="list-inline-item">
                  <div className="row mt-5">
                    {productList.map((value, index) => (
                      // Start Single Demo
                      <div
                        key={index}
                        className="col-lg-4 mb-lg-5 mb-4 col-md-6 demo-item px-lg-3"
                      >
                        <div className="card p-0 rounded-10 bg-transparent border-0">
                          <a href={`/${value.url} `}>
                            <img
                              src={`assets/images/demo/${value.imageUrl}`}
                              alt="demo-i"
                              className="w-100 rounded-6 ovh"
                            />
                          </a>
                          <h4 className="text-grey-900 text-center mt-lg-4 pt-2 mt-3 fw-700 font-xsss">
                            {value.title}
                          </h4>
                        </div>
                      </div>
                      // End Single Demo
                    ))}
                  </div>
                </Tab>

                <Tab
                  eventKey="admin"
                  title="Admin"
                  className="list-inline-item"
                >
                  <div className="row mt-5">
                    {adminList.map((value, index) => (
                      // Start Single Demo
                      <div
                        key={index}
                        className="col-lg-4 mb-lg-5 mb-4 col-md-6 demo-item px-lg-3"
                      >
                        <div className="card p-0 rounded-10 bg-transparent border-0">
                          <a href={`/${value.url} `}>
                            <img
                              src={`assets/images/demo/${value.imageUrl}`}
                              alt="demo-i"
                              className="w-100 rounded-6 ovh"
                            />
                          </a>
                          <h4 className="text-grey-900 text-center mt-lg-4 pt-2 mt-3 fw-700 font-xsss">
                            {value.title}
                          </h4>
                        </div>
                      </div>
                      // End Single Demo
                    ))}
                  </div>
                </Tab>
                <Tab
                  eventKey="other"
                  title="Other"
                  className="list-inline-item"
                >
                  <div className="row mt-5">
                    {pageList.map((value, index) => (
                      // Start Single Demo
                      <div
                        key={index}
                        className="col-lg-4 mb-lg-5 mb-4 col-md-6 demo-item px-lg-3"
                      >
                        <div className="card p-0 rounded-10 bg-transparent border-0">
                          <a href={`/${value.url} `}>
                            <img
                              src={`assets/images/demo/${value.imageUrl}`}
                              alt="demo-i"
                              className="w-100 rounded-6 ovh"
                            />
                          </a>
                          <h4 className="text-grey-900 text-center mt-lg-4 pt-2 mt-3 fw-700 font-xsss">
                            {value.title}
                          </h4>
                        </div>
                      </div>
                      // End Single Demo
                    ))}
                  </div>
                </Tab>
              </Tabs>
              <div className="col-sm-12 mt-5"></div>
            </div>
          </div>
        </div>

        <div className="bg-black pt-5 pb-5" id="contact">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center pb-lg-4">
                <h2 className="title-text2 text-white mt-4">
                  <b>Beautiful designs to get you started</b>
                </h2>
                <p className="text-white ml-5 mr-5">
                  Create a really awesome website, choose the version that will
                  suit your requirements in a best way.
                </p>
                <div className="col-sm-12 text-center mt-5">
                  <a href="/" className="btn-lg btn bg-white">
                    PURCHASE NOW
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
// }

export default Demo;
