# EventHub - Event Booking Application

EventHub is a full-stack web application that enables users to create, view, and book events. The project includes frontend and backend components.

## Project Structure
The project is organized into separate folders for frontend and backend.

- `event-hub-frontend/`: Frontend code built with React.
- `event-hub-backend/`: Backend code built with Node.js, Express.js, GraphQL, and MongoDB.

## Frontend

The frontend is built using React and includes features such as authentication, event creation, listing, and booking.

### Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Backend Integration](#backend-integration)
- [Contributing](#contributing)
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
   git clone https://github.com/your-username/easy-event.git
2. Navigate to the project directory:
   ```bash
   cd easy-event/easy-event-frontend
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


