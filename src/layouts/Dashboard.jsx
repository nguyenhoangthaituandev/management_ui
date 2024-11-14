import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Wrapper from "../components/Wrapper";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/Main";
import Navbar from "../components/navbar/Navbar";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Settings from "../components/Settings";
import Loader from "../components/Loader";

import getNavItems from "../components/sidebar/dashboardItems";
import { selectRole } from "../redux/selector/UserInfoSelector";
import { connect } from "react-redux";

const Dashboard = ({ children, role }) => (
  <React.Fragment>
    <Wrapper>
      <Sidebar items={getNavItems(role)} />
      <Main>
        <Navbar />
        <Content>
          <Suspense fallback={<Loader />}>
            {children}
            <Outlet />
          </Suspense>
        </Content>
        <Footer />
      </Main>
    </Wrapper>
    <Settings />
  </React.Fragment>
);

export default connect(
  state => {
    return {
      role: selectRole(state),
    };
  },
)(Dashboard);

