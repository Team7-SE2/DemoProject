import React from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SubMenu
} from 'react-pro-sidebar';

import 'react-pro-sidebar/dist/css/styles.css';
import { FaBook, FaCalendar, FaGithub, FaRegChartBar, FaFileCsv, FaCalendarWeek, FaClipboardList } from 'react-icons/fa';
import {RiVirusFill} from "react-icons/ri";
import Nav from 'react-bootstrap/Nav';
import { AuthContext } from '../auth/AuthContext'
import { NavLink } from 'react-router-dom';

const Aside = ({ courses,collapsed, rtl, toggled, handleToggleSidebar, userLogout, role_id, logged, resetState }) => {
  
  return (
    <AuthContext.Consumer >
      {(context) => (
     
    <ProSidebar className="asideBarBackground"
      //image={sidebarBg}
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            //textTransform: 'uppercase',
            //fontWeight: 'bold',
            fontSize: 20,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            textAlign: 'center'
          }}
        >
          <h5>LEARNING PLATFORM</h5>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle" style={{paddingLeft:'5px'}}>
          <>
          {context.authUser && (role_id===5 || role_id===4) && logged && <MenuItem
            icon={<FaBook />}
          >
            <Nav >
            {
              context.authUser && role_id===5 && logged &&
              <Nav.Link style={{paddingLeft:0}} as={NavLink} to="/student"  ><h6>Teaching Load</h6></Nav.Link>
            }
            {
              context.authUser && role_id===4 && logged &&
              <Nav.Link style={{paddingLeft:0}} as={NavLink} to="/teacher"  ><h6>My Courses</h6></Nav.Link>
            }
          </Nav>
          </MenuItem>}
          </>

          <>
          {context.authUser && role_id===2 && logged && <MenuItem 
            icon={<FaFileCsv />}>
            <Nav >
              {
                <Nav.Link style={{paddingLeft:0}} as={NavLink} to="/supportOfficer"  ><h6>Upload CSV</h6></Nav.Link>
              }
            </Nav>
          </MenuItem>}
          </>
          <>
          {context.authUser && role_id===2 && logged && <MenuItem 
            icon={<FaClipboardList />}>
            <Nav >
              {
                <Nav.Link style={{paddingLeft:0}} as={NavLink} to="/supportOfficer/courseSchedule"  ><h6>Course Schedule</h6></Nav.Link>
              }
            </Nav>
          </MenuItem>}
          {context.authUser && role_id===2 && logged && <MenuItem 
            icon={<FaCalendarWeek />}>
            <Nav >
              {
                <Nav.Link style={{paddingLeft:0}} as={NavLink} to="/supportOfficer/lectures"  ><h6>Update bookable lectures</h6></Nav.Link>
              }
            </Nav>
          </MenuItem>}
          </>
          <>
          {context.authUser && role_id===3 && logged && <MenuItem 
            icon={<FaRegChartBar />}>
            <Nav >
              {
                <Nav.Link style={{paddingLeft:0}} as={NavLink} to="/bookingManager"  ><h6>Overall Statistics</h6></Nav.Link>
              }
            </Nav>
          </MenuItem>}
          </>
          <>
          {context.authUser && role_id===3 && logged && <MenuItem 
            icon={<RiVirusFill />}>
            <Nav >
              {
                <Nav.Link style={{paddingLeft:0}} as={NavLink} to="/bookingManager/contactTracingReport"  ><h6>Contact Tracing Report</h6></Nav.Link>
              }
            </Nav>
          </MenuItem>}
          </>
          <>
          {context.authUser && role_id===5 && logged && <MenuItem 
            icon={<FaCalendar />}  
            
            // suffix={<span className="badgeRed">new</span>} 
            > 
            <Nav >
            {
              context.authUser && role_id===5 && logged &&
              <Nav.Link style={{paddingLeft:0}} as={NavLink} to="/student/calendar"  ><h6>My Bookings</h6></Nav.Link>
            }
          </Nav>
          </MenuItem>
          }
          </>
         <>
         {
              context.authUser && role_id===4 && logged &&
          <SubMenu
            prefix={<span className="badge gray"></span>}
            title="Statistics"
            icon={<FaRegChartBar />}
          >
          <MenuItem><Nav.Link style={{paddingLeft:0, fontWeight: "bold"}} as={NavLink} onClick={resetState} to={"/teacher/statistics/overall"} >Overall</Nav.Link></MenuItem>
         
           {courses.map((course)=><MenuItem><Nav.Link style={{paddingLeft:0}} as={NavLink} onClick={resetState} to={"/teacher/statistics/"+`${course.subjectID}?subjectId=${course.id}`} >{course.description}</Nav.Link></MenuItem>)}
        
          </SubMenu>}
         </>
        </Menu>
        
        
      </SidebarContent>

      <SidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >
          <a
            href="https://github.com/Team7-SE2/PULSBS"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <FaGithub />
            <span> View Source</span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
      )}
    </AuthContext.Consumer>
  );
};



export default Aside;