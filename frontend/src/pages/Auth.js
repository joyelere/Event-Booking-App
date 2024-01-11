import React, { Component } from "react";
import { Form, Container, Button, Alert } from "react-bootstrap";
import AuthContext from "../context/auth-context";

class Authpage extends Component {
  state = {
    isLogin: true,
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  switchModeHandler = () => {
    this.setState((prevState) => {
      return { isLogin: !prevState.isLogin };
    });
  };

  submitHandler = async (event) => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query Login($email: String!, $password: String!){
          login(email:$email, password:$password){
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email: email,
        password: password,
      },
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation CreateUser($email:String!,$password:String!){
            createUser(userInput: {email: $email, password: $password}){
              _id
              email
            }
          }
        `,
        variables: {
          email: email,
          password: password,
        },
      };
    }

    try {
      const res = await fetch("http://localhost:3100/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await res.json();

      if (resData.errors) {
        const errorMessage = resData.errors[0].message;

        // Handle network failure
        if (errorMessage.includes("Failed to fetch")) {
          
          return;
        }

        // Display specific error messages for signup
        if (
          !this.state.isLogin &&
          errorMessage.includes("User already exists")
        ) {
          this.setState({
            errorMessage: "User with this email already exists.",
            successMessage: null,
          });
        } else {
          throw new Error(errorMessage);
        }
      } else if (resData.data.createUser && resData.data.createUser._id) {
        const { email } = resData.data.createUser;
        this.setState({
          successMessage: `User with email ${email} successfully created!`,
          errorMessage: null,
        });

        // Clear input fields after successful signup
        if (!this.state.isLogin) {
          this.emailEl.current.value = "";
          this.passwordEl.current.value = "";
        }
      } else if (resData.data.login && resData.data.login.token) {
        const { token, userId, tokenExpiration } = resData.data.login;
        this.context.login(token, userId, tokenExpiration);
      }
    } catch (err) {
      console.log(err);

      this.setState({ errorMessage: err.message, successMessage: null });
    }
  };

  render() {
    return (
      <Container className="Auth-form-container">
        <Form className="Auth-form" onSubmit={this.submitHandler}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">
              {this.state.isLogin ? "Sign In" : "Sign Up"}
            </h3>
            {this.state.errorMessage && (
              <Alert variant="danger">{this.state.errorMessage}</Alert>
            )}
            <div className="text-center">
              {this.state.isLogin ? (
                <>
                  Not registered yet?{" "}
                  <span
                    className="link-primary"
                    onClick={this.switchModeHandler}
                  >
                    Sign Up
                  </span>
                </>
              ) : (
                <>
                  Already registered?{" "}
                  <span
                    className="link-primary"
                    onClick={this.switchModeHandler}
                  >
                    Sign In
                  </span>
                </>
              )}
            </div>
            <Form.Group className="mt-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={this.emailEl}
              />
            </Form.Group>
            <Form.Group className="mt-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                ref={this.passwordEl}
              />
            </Form.Group>
            <div className="d-grid gap-2 mt-3">
              <Button variant="primary" type="submit">
                {this.state.isLogin ? "Sign In" : "Sign Up"}
              </Button>
            </div>
          </div>
        </Form>
      </Container>
    );
  }
}

export default Authpage;
