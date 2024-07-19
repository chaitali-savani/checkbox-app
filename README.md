# checkbox-app
Real-time collaborative checkbox app with Express, Socket.io, and PostgreSQL.
Overview
The Checkbox App is a real-time collaborative web application where users can interact with a grid of 100 checkboxes. When a checkbox is clicked by any user, it updates in real-time for all connected users. The application uses Express for the backend, Socket.io for real-time communication, and PostgreSQL for state persistence.

Features
Real-Time Updates: Checkboxes are updated in real-time across all connected clients using Socket.io.
State Persistence: The state of each checkbox is stored in a PostgreSQL database, ensuring state is maintained even if the server crashes.
RESTful API: Provides API endpoints to fetch and update checkbox states.
Scalable and Robust: Built with scalability and robustness in mind, utilizing industry-standard technologies.
Technologies Used
Backend: Node.js, Express
Real-Time Communication: Socket.io
Database: PostgreSQL
Frontend: HTML, JavaScript
