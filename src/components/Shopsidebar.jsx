import React, { Component } from 'react';

  function Shopsidebar() {
    return (
      <div className="sideBar">
        <div className="bg-greyblue side-wrap rounded-lg p-4 mb-4">
          <div className="form-group mb-1">
            <label htmlFor="Search" className="fw-600 text-grey-900">
              Search by Keyword
            </label>
          </div>
          <div className="form-group icon-input mb-0">
            <input
              type="text"
              className="form-control style1-input pl-5 border-size-md border-light font-xsss"
              placeholder="To search type and hit enter"
            />
            <i className="ti-search text-grey-500 font-xs"></i>
          </div>
        </div>

        <div className="bg-greyblue side-wrap rounded-lg p-4 mb-4">
          <div className="form-group mb-0">
            <label htmlFor="Search" className="fw-600 text-grey-900">
              Categories
            </label>
          </div>
          <ul className="recent-post mt-2">
            <li className="mb-1">
              <a href="/shop-2" className="fw-600 font-xssss">
                Dress
              </a>
            </li>
            <li className="mb-1">
              <a href="/shop-2" className="fw-600 font-xssss">
                Shirt
              </a>
            </li>
            <li className="mb-1">
              <a href="/shop-2" className="fw-600 font-xssss">
                Jacket
              </a>
            </li>
            <li className="mb-1">
              <a href="/shop-2" className="fw-600 font-xssss">
                Jean
              </a>
            </li>
            <li className="mb-1">
              <a href="/shop-2" className="fw-600 font-xssss">
                Men
              </a>
            </li>
            <li className="mb-1">
              <a href="/shop-2" className="fw-600 font-xssss">
                Shorts
              </a>
            </li>
            <li className="mb-1">
              <a href="/shop-2" className="fw-600 font-xssss">
                Swimwear
              </a>
            </li>
            <li className="mb-1">
              <a href="/shop-2" className="fw-600 font-xssss">
                Tousers
              </a>
            </li>
            <li className="mb-1">
              <a href="/shop-2" className="fw-600 font-xssss">
                Jumper Cardigans
              </a>
            </li>
          </ul>
        </div>

        <div className="bg-greyblue side-wrap rounded-lg p-4 mb-4">
          <div className="form-group mb-0">
            <label htmlFor="Search" className="fw-600 text-grey-900">
              Price
            </label>
          </div>
          <div className="form-group mt-3 mb-0">
            <div className="row">
              <div className="col-sm-12">
                <div
                  id="slider-range"
                  className="mb-2 noUi-target noUi-ltr noUi-horizontal noUi-background"
                >
                  <div className="noUi-base">
                    <div
                      className="noUi-origin noUi-connect"
                      style={{ left: '10%' }}
                    >
                      <div className="noUi-handle noUi-handle-lower"></div>
                    </div>
                    <div
                      className="noUi-origin noUi-background"
                      style={{ left: '70%' }}
                    >
                      <div className="noUi-handle noUi-handle-upper"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row slider-labels">
              <div className="col-6 caption">
                <span id="slider-range-value1" className="font-xssss fw-700">
                  $1,000
                </span>
              </div>
              <div className="col-6 text-right caption">
                <span id="slider-range-value2" className="font-xssss fw-700">
                  $8,000
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <form>
                  <input type="hidden" name="min-value" />
                  <input type="hidden" name="max-value" />
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-greyblue side-wrap rounded-lg p-4 mb-4">
          <div className="form-group mb-0">
            <label htmlFor="Search" className="fw-600 text-grey-900">
              Brand
            </label>
          </div>
          <div className="form-group mb-2 mt-2">
            <div className="custom-control mr-0 custom-radio size-sm custom-control-inline d-block">
              <input
                type="radio"
                className="custom-control-input"
                id="customRadio1"
                name="Depart"
                defaultValue="customEx"
                defaultChecked
              />
              <label
                className="custom-control-label small-size fw-600 text-grey-800 font-xsss d-block"
                htmlFor="customRadio1"
              >
                Addidas
                <span className="float-right fw-500 text-grey-500 font-xssss mt-1">
                  12
                </span>
              </label>
            </div>
          </div>
          <div className="form-group mb-2">
            <div className="custom-control mr-0 custom-radio size-sm custom-control-inline d-block">
              <input
                type="radio"
                className="custom-control-input"
                id="customRadio5"
                name="Depart"
                defaultValue="customEx"
              />
              <label
                className="custom-control-label small-size fw-600 text-grey-800 font-xsss d-block"
                htmlFor="customRadio5"
              >
                Levis
                <span className="float-right fw-500 text-grey-500 font-xssss mt-1">
                  15
                </span>
              </label>
            </div>
          </div>
          <div className="form-group mb-2">
            <div className="custom-control mr-0 custom-radio size-sm custom-control-inline d-block">
              <input
                type="radio"
                className="custom-control-input"
                id="customRadio3"
                name="Depart"
                defaultValue="customEx"
              />
              <label
                className="custom-control-label small-size fw-600 text-grey-800 font-xsss d-block"
                htmlFor="customRadio3"
              >
                Cape Town
                <span className="float-right fw-500 text-grey-500 font-xssss mt-1">
                  7
                </span>
              </label>
            </div>
          </div>
          <div className="form-group mb-2">
            <div className="custom-control mr-0 custom-radio size-sm custom-control-inline d-block">
              <input
                type="radio"
                className="custom-control-input"
                id="customRadio4"
                name="Depart"
                defaultValue="customEx"
              />
              <label
                className="custom-control-label small-size fw-600 text-grey-800 font-xsss d-block"
                htmlFor="customRadio4"
              >
                Nikes
                <span className="float-right fw-500 text-grey-500 font-xssss mt-1">
                  34
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-greyblue side-wrap rounded-lg p-4 mb-4">
          <div className="form-group mb-0">
            <label htmlFor="Search" className="fw-600 text-grey-900">
              Recent Products
            </label>
          </div>
          <div className="col-lg-12">
            <div className="card w-100 border-0 mt-3 bg-transparent">
              <div className="row">
                <div className="float-left card-image w-25 p-2 text-center bg-white rounded-lg">
                  <a href="/shop-1">
                    <img
                      src="assets/images/product.png"
                      alt="banner"
                      className="w45 mt-1"
                    />
                  </a>
                </div>
                <div className="float-left card-body bg-transparent w-75 pt-2 pb-0">
                  <h4 className="fw-600 font-xsss text-grey-500">Trimmer</h4>
                  <h2>
                    <a
                      href="single-product.html"
                      className="text-grey-800 fw-700 font-xssss lh-22"
                    >
                      Mi XXQ02HM Runtime: 60 min Trimmer for Men
                    </a>
                  </h2>
                  <h6 className="font-xsss fw-600 text-grey-500 ls-2">$49</h6>
                </div>
              </div>
            </div>

            <div className="card w-100 border-0 mt-3 bg-transparent">
              <div className="row">
                <div className="float-left card-image w-25 p-2 text-center bg-white rounded-lg">
                  <a href="/shop-1">
                    <img
                      src="assets/images/product.png"
                      alt="banner"
                      className="w45 mt-1"
                    />
                  </a>
                </div>
                <div className="float-left card-body bg-transparent w-75 pt-2 pb-0">
                  <h4 className="fw-600 font-xsss text-grey-500">Trimmer</h4>
                  <h2>
                    <a
                      href="single-product.html"
                      className="text-grey-800 fw-700 font-xssss lh-22"
                    >
                      Mi XXQ02HM Runtime: 60 min Trimmer for Men
                    </a>
                  </h2>
                  <h6 className="font-xsss fw-600 text-grey-500 ls-2">$49</h6>
                </div>
              </div>
            </div>

            <div className="card w-100 border-0 mt-3 bg-transparent">
              <div className="row">
                <div className="float-left card-image w-25 p-2 text-center bg-white rounded-lg">
                  <a href="/shop-1">
                    <img
                      src="assets/images/product.png"
                      alt="banner"
                      className="w45 mt-1"
                    />
                  </a>
                </div>
                <div className="float-left card-body bg-transparent w-75 pt-2 pb-0">
                  <h4 className="fw-600 font-xsss text-grey-500">Trimmer</h4>
                  <h2>
                    <a
                      href="single-product.html"
                      className="text-grey-800 fw-700 font-xssss lh-22"
                    >
                      Mi XXQ02HM Runtime: 60 min Trimmer for Men
                    </a>
                  </h2>
                  <h6 className="font-xsss fw-600 text-grey-500 ls-2">$49</h6>
                </div>
              </div>
            </div>

            <div className="card w-100 border-0 mt-3 bg-transparent">
              <div className="row">
                <div className="float-left card-image w-25 p-2 text-center bg-white rounded-lg">
                  <a href="/shop-1">
                    <img
                      src="assets/images/product.png"
                      alt="banner"
                      className="w45 mt-1"
                    />
                  </a>
                </div>
                <div className="float-left card-body bg-transparent w-75 pt-2 pb-0">
                  <h4 className="fw-600 font-xsss text-grey-500">Trimmer</h4>
                  <h2>
                    <a
                      href="single-product.html"
                      className="text-grey-800 fw-700 font-xssss lh-22"
                    >
                      Mi XXQ02HM Runtime: 60 min Trimmer for Men
                    </a>
                  </h2>
                  <h6 className="font-xsss fw-600 text-grey-500 ls-2">$49</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


export default Shopsidebar;
