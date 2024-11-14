import React from "react";

import { Dropdown } from "react-bootstrap";

import { PieChart, Settings, User } from "react-feather";

import avatar1 from "../../assets/img/avatars/avatar.jpg";
import { connect } from "react-redux";
import { selectFullname } from "../../redux/selector/UserInfoSelector";
import storage from "../../utils/storage";
import { refreshUserInfo } from "../../redux/reducers/UserInfoSlide";
import { useNavigate } from "react-router-dom";


const NavbarUser = (props) => {

  const navigate = useNavigate();

  const logout = () => {
    // remove storage
    storage.deleteUserInfo();
    // refresh redux
    props.refreshUserInfo();
    // redirect signin
    navigate("/auth/sign-in");
  }

  return (
    <Dropdown className="nav-item" align="end">
      <span className="d-inline-block d-sm-none">
        <Dropdown.Toggle as="a" className="nav-link">
          <Settings size={18} className="align-middle" />
        </Dropdown.Toggle>
      </span>
      <span className="d-none d-sm-inline-block">
        <Dropdown.Toggle as="a" className="nav-link">
          <img
            src={avatar1}
            className="avatar img-fluid rounded-circle me-1"
            alt={props.fullname}
          />
          <span className="text-dark">{props.fullname}</span>
        </Dropdown.Toggle>
      </span>
      <Dropdown.Menu drop="end">
        <Dropdown.Item>
          <User size={18} className="align-middle me-2" />
          Profile
        </Dropdown.Item>
        <Dropdown.Item>
          <PieChart size={18} className="align-middle me-2" />
          Analytics
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Settings & Privacy</Dropdown.Item>
        <Dropdown.Item>Help</Dropdown.Item>
        <Dropdown.Item onClick={() => navigate("/auth/change-password")}>Change Password</Dropdown.Item>
        <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default connect(
  state => {
    return {
      fullname: selectFullname(state),
    };
  },
  { refreshUserInfo }
)(NavbarUser);
