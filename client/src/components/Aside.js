import React from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';

import 'react-pro-sidebar/dist/css/styles.css';
import { FaBook, FaCalendar, FaGithub } from 'react-icons/fa';
import Nav from 'react-bootstrap/Nav';
import { AuthContext } from '../auth/AuthContext'
import { NavLink } from 'react-router-dom';

const Aside = ({ collapsed, rtl, toggled, handleToggleSidebar, userLogout, role_id, logged }) => {
  
  return (
    <AuthContext.Consumer >
      {(context) => (
     
    <ProSidebar
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
          LEARNING PLATFORM
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            icon={<FaBook />}
            suffix={
              <span className="badgeRed" style={{ fontSize: 12 }}>
                new
              </span>
            }
          >
            <Nav >
            {
              context.authUser && role_id===5 && logged &&
              <Nav.Link style={{paddingLeft:0}} as={NavLink} to="/student"  >Teaching Load</Nav.Link>
            }
            {
              context.authUser && role_id===4 && logged &&
              <Nav.Link style={{paddingLeft:0}} as={NavLink} to="/teacher"  >My Courses</Nav.Link>
            }
          </Nav>
          </MenuItem>
          <>
          {context.authUser && role_id===5 && logged && <MenuItem 
            icon={<FaCalendar />}  
            suffix={<span className="badgeRed" style={{ fontSize: 12 }}>new</span>} > 
            My calendar
          </MenuItem>
          }
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