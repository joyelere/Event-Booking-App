import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom"; // Import NavLink for navigation links

import AuthContext from "../../context/auth-context";

const MainNavigation = (props) => (
  <AuthContext.Consumer>
    {(context) => {
      return (
        <div>
          <Navbar bg="primary" data-bs-theme="dark">
            <Container>
              <Navbar.Brand href="/">EasyEvent</Navbar.Brand>
              <Nav className="ml-auto">
                {!context.token && (
                  <Nav.Link as={NavLink} to="/auth" activeClassName="active">
                    Authenticate
                  </Nav.Link>
                )}
                <Nav.Link as={NavLink} to="/events" activeClassName="active">
                  Events
                </Nav.Link>
                {context.token && (
                  <React.Fragment>
                    <Nav.Link
                      as={NavLink}
                      to="/bookings"
                      activeClassName="active"
                    >
                      Bookings
                    </Nav.Link>
                    <Button
                      style={{
                        backgroundColor: "transparent",
                        color: "rgba(255, 255, 255, 0.6)",
                        border: "none"
                      }}
                      onClick={context.logout}
                      onMouseOver={(e) => (e.target.style.color = "rgba(255, 255, 255, 0.75)")}
                      onMouseOut={(e) =>
                        (e.target.style.color = "rgba(255, 255, 255, 0.6)")
                      }
                    >
                      logout
                    </Button>
                  </React.Fragment>
                )}
              </Nav>
            </Container>
          </Navbar>
        </div>
      );
    }}
  </AuthContext.Consumer>
);

export default MainNavigation;
