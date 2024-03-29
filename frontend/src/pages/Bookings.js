import React, { Component } from "react";
import AuthContext from "../context/auth-context";
import Spinner from "../components/Spinner/Spinner";
import BookingsList from "../components/Bookings/BookingList";
import BookingsChart from "../components/Bookings/BookingChart";
import BookingControls from "../components/Bookings/BookingControls";

class Bookingspage extends Component {
  state = {
    bookings: [],
    isLoading: false,
    outputType: "list",
  };

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchBookings();
  }

  async fetchBookings() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        query {
          bookings {
            _id
            createdAt
            event{
              _id
              title
              date
              price
            }
          }
        }
      `,
    };
    try {
      const res = await fetch("http://localhost:3100/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.context.token,
        },
      });

      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed!");
      }
      const resData = await res.json();
      const bookings = resData.data.bookings;
      this.setState({ bookings: bookings, isLoading: false });
    } catch (err) {
      console.log(err);
      this.setState({ isLoading: false });
    }
  }

  deleteBookingHandler = async (bookingId) => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        mutation CancelBooking($id: ID!) {
          cancelBooking(bookingId:$id) {
            _id
            title
          }
        }
      `,
      variables: {
        id: bookingId,
      },
      //......old method.....
      // query: `
      //   mutation {
      //     cancelBooking(bookingId:"${bookingId}") {
      //       _id
      //       title
      //     }
      //   }
      // `,
    };

    try {
      const res = await fetch("http://localhost:3100/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.context.token,
        },
      });

      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed!");
      }
      // const resData = await res.json();
      this.setState((prevState) => {
        const updatedBookings = prevState.bookings.filter((booking) => {
          return booking._id !== bookingId;
        });
        return { bookings: updatedBookings, isLoading: false };
      });
    } catch (err) {
      console.log(err);
      this.setState({ isLoading: false });
    }
  };

  changeOutputTypeHandler = (outputType) => {
    if (outputType === "list") {
      this.setState({ outputType: "list" });
    } else {
      this.setState({ outputType: "chart" });
    }
  };

  render() {
    let content = <Spinner />;
    if (!this.state.isLoading) {
      content = (
        <>
          <BookingControls
            activeButton={this.state.outputType}
            onChange={this.changeOutputTypeHandler}
          />
          <div>
            {this.state.outputType === "list" ? (
              <BookingsList
                bookings={this.state.bookings}
                onDelete={this.deleteBookingHandler}
              />
            ) : (
              <BookingsChart bookings={this.state.bookings} />
            )}
          </div>
        </>
      );
    }
    return (
      <>
        {content}
        {/* {this.state.isLoading ? (
          <Spinner />
        ) : (
          <BookingsList
            bookings={this.state.bookings}
            onDelete={this.deleteBookingHandler}
          />
        )} */}
      </>
    );
  }
}

export default Bookingspage;
