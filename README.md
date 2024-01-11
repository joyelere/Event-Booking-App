# EventHub - Event Booking Application

EventHub is a full-stack web application that enables users to create, view, and book events. The project includes frontend and backend components.

## Project Structure
The project is organized into separate folders for frontend and backend.

- `frontend/`: Frontend code built with React.
- `backend/`: Backend code built with Node.js, Express.js, GraphQL, and MongoDB.

## Frontend

The frontend is built using React and includes features such as authentication, event creation, listing, and booking.

### Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Backend Integration](#backend-integration)
- [License](#license)

### Features
- **Authentication:** Users can sign up or log in to access the application.
- **Event Creation:** Authenticated users can create new events, providing details such as title, price, date, and description.
- **Event Listing:** Users can view a list of events with details like title, price, and date.
- **Event Booking:** Authenticated users can book events, and booked events are listed in the bookings section.
- **Responsive Design:** The application is designed to work seamlessly on various devices.
- **Chart:** Easily visualize event booking trends! The Chart Page categorizes events by price—cheap, expensive, and normal. Users get a quick overview of how many events fall into each category, aiding faster decision-making when choosing events to book.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/joyelere/Event-Booking-App.git
   
2. Navigate to the project directory:
   ```bash
   cd frontend
3. Install frontend dependencies:
   ```bash
   npm install

### Usage
1. Start the frontend development server:
   ```bash
   npm start
2. Open your web browser and navigate to http://localhost:3000.

### Dependencies
- React
- React Bootstrap
- Chart.js (for booking chart)

Ensure you have Node.js and npm installed on your machine.

### Backend Integration

To integrate the frontend with the backend, follow these steps:

1. Set up the EasyEvent backend. Refer to the backend README for instructions.
2. Update the backend API endpoint in the frontend code. Look for instances of http://localhost:3100/graphql and replace it with your backend API URL.

## Backend

The backend is built using Node.js, Express.js, GraphQL, and MongoDB.

### Table of Contents
- [Components](#components)
- [Setup](#setup)
- [Models](#models)
- [Middleware](#middleware)
- [GraphQL](#graphql)
- [Authentication](#authentication)
- [Server](#server)
- [Configuration](#configuration)

### Components
- **Authentication (auth.js)**: Handles user authentication using bcrypt for password hashing and JWT for token generation.
- **Event Booking (booking.js)**: Manages bookings, including retrieving user-specific bookings, booking events, and canceling bookings.
- **Event Management (event.js)**: Handles the creation and retrieval of events, ensuring that only authenticated users can create events.
- **Data Loaders (merge.js)**: Uses DataLoader to efficiently batch and cache database queries for events and users.
- **GraphQL Resolvers (index.js)**: Combines and exports all resolvers for use in the GraphQL schema.
- **GraphQL Schema (index.js)**: Defines the GraphQL schema using the buildSchema function.
- **Middleware (is-auth.js)**: Ensures user authentication by validating JWT tokens.
- **Models (booking.js, events.js, user.js)**: Defines MongoDB schemas for bookings, events, and users.
- **Server Setup (app.js)**: Configures Express.js, sets up middleware for CORS and authentication and connects to MongoDB.
- **Configuration (config.js)**: Stores sensitive configuration details such as the JWT secret.

### Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
2. Install backend dependencies:
   ```bash
   npm install
3. Set up your MongoDB connection in easy-event-backend/app.js.

### Models
- `booking.js`
- `events.js`
- `user.js`

### Middleware
- `is-auth.js`

### GraphQL
- `index.js`

### Authentication
- `auth.js`

### Server
- `app.js`

### Configuration
- `config.js`

### License

This project is licensed under the [MIT License](LICENSE).

