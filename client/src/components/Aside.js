import React from 'react';
import { useIntl } from 'react-intl';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';

import 'react-pro-sidebar/dist/css/styles.css';
import { FaBook, FaCalendar, FaGithub, FaToggleOn } from 'react-icons/fa';
import Nav from 'react-bootstrap/Nav';
import { AuthContext } from '../auth/AuthContext'
import { NavLink } from 'react-router-dom';

const Aside = ({ collapsed, rtl, toggled, handleToggleSidebar, userLogout, role_id, logged }) => {
  
  const intl = useIntl();
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
          {intl.formatMessage({ id: 'LEARNING PLATFORM' })}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            icon={<FaBook />}
            suffix={
              <span className="badgeRed" style={{ fontSize: 12 }}>
                {intl.formatMessage({ id: 'new' })}
              </span>
            }
          >
            <Nav >
            {
              context.authUser && role_id===5 && logged &&
              <Nav.Link style={{paddingLeft:0}} as={NavLink} to="/student"  >{intl.formatMessage({ id: 'Teaching Load' })}</Nav.Link>
            }
            {
              context.authUser && role_id===4 && logged &&
              <Nav.Link style={{paddingLeft:0}} as={NavLink} to="/teacher"  >{intl.formatMessage({ id: 'My Courses' })}</Nav.Link>
            }
          </Nav>
          </MenuItem>
          <MenuItem 
            icon={<FaCalendar />}  
            suffix={<span className="badgeRed" style={{ fontSize: 12 }}>{intl.formatMessage({ id: 'new' })}</span>} > 
            {intl.formatMessage({ id: 'My calendar' })}
          </MenuItem>
        </Menu>
        <Menu iconShape="circle">
          <SubMenu
            suffix={<span className="badge yellow">3</span>}
            title={intl.formatMessage({ id: 'sample #1' })}
            icon={<FaToggleOn />}
          >
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 1</MenuItem>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 2</MenuItem>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3</MenuItem>
          </SubMenu>
          <SubMenu
            prefix={<span className="badge gray">3</span>}
            title={intl.formatMessage({ id: 'sample #2' })}
            icon={<FaToggleOn />}
          >
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 1</MenuItem>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 2</MenuItem>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3</MenuItem>
          </SubMenu>
          <SubMenu title={intl.formatMessage({ id: 'sample #3' })} icon={<FaToggleOn />}>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 1 </MenuItem>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 2 </MenuItem>
            <SubMenu title={`${intl.formatMessage({ id: 'submenu' })} 3`}>
              <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3.1 </MenuItem>
              <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3.2 </MenuItem>
              <SubMenu title={`${intl.formatMessage({ id: 'submenu' })} 3.3`}>
                <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3.3.1 </MenuItem>
                <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3.3.2 </MenuItem>
                <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3.3.3 </MenuItem>
              </SubMenu>
            </SubMenu>
          </SubMenu>
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
            <span> {intl.formatMessage({ id: 'viewSource' })}</span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
      )}
    </AuthContext.Consumer>
  );
};

export default Aside;