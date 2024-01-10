// import React, { useState } from "react";
import React, { Component } from "react";
import ModalContent from "../components/Modal/Modal"; // Adjust the path as needed
import { Container, Row, Col, Button } from "react-bootstrap";
import AuthContext from "../context/auth-context";
import EventList from "../components/Events/EventList/EventList";
import Spinner from "../components/Spinner/Spinner";
import "./Events.css";

// const Eventspage = () => {

//   const [show, setShow] = useState(false);

//   const handleShow = () => setShow(true);

//   const handleCancel = () => setShow(false);
//   const handleConfirm =() => setShow(false);

class Eventspage extends Component {
  state = {
    creating: false,
    events: [],
    isLoading: false,
    selectedEvent: null,
  };

  isActive = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleEl = React.createRef();
    this.priceEl = React.createRef();
    this.dateEl = React.createRef();
    this.descriptionEl = React.createRef();
  }

  componentDidMount() {
    this.fetchEvents();
  }

  handleShow = () => {
    this.setState({ creating: true });
  };

  handleConfirm = async () => {
    this.setState({ creating: false });
    const title = this.titleEl.current.value;
    const price = +this.priceEl.current.value;
    const date = this.dateEl.current.value;
    const description = this.descriptionEl.current.value;

    if (
      title.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }

    const event = { title, price, date, description };
    console.log(event);

    const requestBody = {
      query: `
        mutation CreateEvent($title: String!, $desc: String!, $date: String!, $price: Float! ) {
          createEvent(eventInput: {
            title: $title,
            price: $price,
            date: $date,
            description: $desc
          }) {
            _id
            title
            description
            price
            date
          }
        }
      `,
      variables: {
        title: title,
        desc: description,
        date: date,
        price: price,
      },
      // query: `
      //   mutation {
      //     createEvent(eventInput: {
      //       title: "${title}",
      //       price: ${price},
      //       date: "${date}",
      //       description: "${description}"
      //     }) {
      //       _id
      //       title
      //       description
      //       price
      //       date
      //     }
      //   }
      // `,
    };

    const token = this.context.token;

    try {
      const res = await fetch("http://localhost:3100/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed!");
      }

      const resData = await res.json();
      // this.fetchEvents();
      this.setState((prevState) => {
        const updatedEvents = [...prevState.events];
        updatedEvents.push({
          _id: resData.data.createEvent._id,
          title: resData.data.createEvent.title,
          description: resData.data.createEvent.description,
          price: resData.data.createEvent.price,
          date: resData.data.createEvent.date,
          creator: {
            _id: this.context.userId,
          },
        });

        return { events: updatedEvents };
      });
    } catch (err) {
      console.log(err);
    }
  };

  handleCancel = () => {
    this.setState({ creating: false, selectedEvent: null });
  };

  async fetchEvents() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        query {
          events {
            _id
            title
            description
            price
            date 
            creator {
              _id
              email
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
        },
      });

      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed!");
      }
      const resData = await res.json();
      const events = resData.data.events;
      if (this.isActive) {
        this.setState({ events: events, isLoading: false });
      }
    } catch (err) {
      console.log(err);
      if (this.isActive) {
        this.setState({ isLoading: false });
      }
    }
  }

  showDetailHandler = (eventId) => {
    this.setState((prevState) => {
      const selectedEvent = prevState.events.find((e) => e._id === eventId);
      return { selectedEvent: selectedEvent };
    });
  };

  bookEventHandler = async () => {
    if (!this.context.token) {
      this.setState({ selectedEvent: null });
      return;
    }
    const requestBody = {
      query: `
      mutation BookEvent($id: ID!){
        bookEvent(eventId: $id){
          _id 
          createdAt
          updatedAt
        }
      }
    `,
      variables: {
        id: this.state.selectedEvent._id,
      },
      // query: `
      //   mutation {
      //     bookEvent(eventId: "${this.state.selectedEvent._id}"){
      //       _id
      //       createdAt
      //       updatedAt
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
      const resData = await res.json();
      console.log(resData);
      this.setState({ selectedEvent: null });
    } catch (err) {
      console.log(err);
      this.setState({ isLoading: false });
    }
  };

  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={12}>
            {this.context.token && (
              <div className="rectangle">
                <p>Share your own Events!</p>
                <>
                  <Button variant="primary" size="sm" onClick={this.handleShow}>
                    Create Event
                  </Button>

                  {/* <ModalContent
                  show={show}
                  handleCancel={handleCancel}
                  handleConfirm={handleConfirm}
                /> */}
                </>
              </div>
            )}

            <ModalContent
              showCreateEvent={this.state.creating}
              selectedEvent={this.state.selectedEvent}
              handleCancel={this.handleCancel}
              handleConfirm={this.handleConfirm}
              onConfirm={this.bookEventHandler}
              titleRef={this.titleEl}
              priceRef={this.priceEl}
              dateRef={this.dateEl}
              descriptionRef={this.descriptionEl}
              confirmText={this.context.token ? "Book" : "Confirm"}
            />

            {this.state.isLoading ? (
              <Spinner />
            ) : (
              <EventList
                events={this.state.events}
                authUserId={this.context.userId}
                onViewDetail={this.showDetailHandler}
              />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Eventspage;
