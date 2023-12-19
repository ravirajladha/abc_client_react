import React, { useState, useEffect } from 'react';

import Profile from '../common/Profile';
import Myclass from '../common/MySubjects';
import SubjectScore from '../common/SubjectScore';

const StudentSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const middleSidebar = document.querySelector('.middle-sidebar-right');

    if (middleSidebar) {
      if (isSidebarOpen) {
        middleSidebar.classList.add('active-sidebar');
      } else {
        middleSidebar.classList.remove('active-sidebar');
      }
    }
  }, [isSidebarOpen]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="middle-sidebar-right">
        <div className="middle-sidebar-right-content">
          <Profile />
          <Myclass />
          <SubjectScore />
        </div>
      </div>
      <button onClick={handleSidebarToggle} className="btn btn-circle text-white btn-neutral sidebar-right">
        <i className="ti-angle-right"></i>
      </button>
    </>
  )
}

export default StudentSidebar