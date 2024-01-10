import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import Authpage from "./pages/Auth";
import Bookingspage from "./pages/Bookings";
import Eventspage from "./pages/Events";
import MainNavigation from "./components/Navigation/MainNavigation";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "./context/auth-context";
// import { TokenExpiredError } from "jsonwebtoken";
// import { NoUnusedVariablesRule } from "graphql";

class App extends React.Component {
  state = {
    token: null,
    userId: null,
  };

  login = (token, userId, tokenExpiration) => {
    console.log("Login function called:", token, userId, tokenExpiration);
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout,
            }}
          >
            <MainNavigation />
            <main>
              <Switch>
                {this.state.token && <Redirect from="/" to="/events" exact />}
                {this.state.token && (
                  <Redirect from="/auth" to="/events" exact />
                )}
                {!this.state.token && (
                  <Route path="/auth" component={Authpage} />
                )}
                <Route path="/events" component={Eventspage} />
                {this.state.token && (
                  <Route path="/bookings" component={Bookingspage} />
                )}
                {!this.state.token && <Redirect to="/auth" exact />}
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
export default App;
