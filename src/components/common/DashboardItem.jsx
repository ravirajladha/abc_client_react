import React from 'react';

function DashboardItem(props) {
  return (
      <div className="col-sm-4">
      <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
        <div className="card-body p-4">
          <div className="row">
            <div className="col-7">
              <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                {props.dashboardInfo ? props.dashboardInfo : "0"}
              </h2>
              <h4 className="fw-700 text-grey-500 font-xsss ls-3 text-uppercase mb-0 mt-0">
                {props.dashboardItemName}
              </h4>
            </div>
            <div className="col-5 text-end">
              <i className={`psor text-white btn-round-md font-xs feather-${props.dashboardItemIcon} bg-current`}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardItem;
