# Chat App

A real-time chat application built using modern web technologies. This app allows users to send and receive messages instantly, providing a seamless communication experience.

## Features

- **Real-Time Messaging**: Instant message sending and receiving.
- **User Authentication**: Secure login and registration system.
- **Message History**: View past conversations.
- **Typing Indicators**: See when someone is typing.
- **Online Status**: Know who is online.
- **Media Sharing**: Send images and files.
- **Responsive UI**: Optimized for both desktop and mobile.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Real-time Communication**: Socket.io
- **Hosting**: Vercel / AWS / Firebase

## Dependencies

### Backend
- bcryptjs `^3.0.0`
- cloudinary `^2.5.1`
- cookie-parser `^1.4.7`
- dotenv `^16.4.7`
- express `^4.21.2`
- jsonwebtoken `^9.0.2`
- mongoose `^8.10.1`
- nodemon `^3.1.9`
- socket.io `^4.8.1`

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB setup

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Pranav-Pote-42/Chat_application_college.git
   cd chat-app
   ```
2. Install dependencies for both frontend and backend:
   ```bash
   cd backend
   npm install 
   cd ../frontend
   npm install
   ```
3. Configure environment variables in a `.env` file inside `backend`:
   ```env
   DATABASE_URL=your_database_url
   JWT_SECRET=your_secret_key
   PORT=your_preferred_port_number
   ```
4. *Start the backend server:*
   ```bash
   cd backend
   npm run dev
   ```
5. *Start the frontend server:*
   ```bash
   cd frontend
   npm run dev
   ```
6. Access the app at `http://localhost:{PORT}`

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes.
4. Push to your fork and create a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, reach out at 221142@iiitt.ac.in or open an issue .

