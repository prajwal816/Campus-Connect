# CampusEventHub

Welcome to CampusEventHub, your one-stop portal for discovering, connecting with, and experiencing every event happening on campus. From tech fests and cultural nights to workshops and competitions, never miss out on what's happening around you.

![CampusEventHub Screenshot](https://i.imgur.com/vHqC6h2.png)

---

## ✨ Features

- **Event Discovery:** Browse a comprehensive list of all upcoming campus events.
- **Detailed Event Information:** Get all the details you need, including date, time, venue, and description.
- **User Authentication:** Secure registration and login for students and organizers.
- **Event Management:** A dedicated dashboard for organizers to create, update, and manage their events.
- **Responsive Design:** A seamless experience whether you're on your desktop or mobile device.

---

## 🛠️ Tech Stack

This project is a full-stack application built with the MERN stack and Vite for a fast development experience.

- **Frontend:**

  - **React:** A JavaScript library for building user interfaces.
  - **Vite:** A next-generation frontend tooling for blazing fast development.
  - **React Router:** For declarative routing within the application.
  - **(Optional: Add State Management like Redux or Zustand)**
  - **(Optional: Add CSS Framework like Tailwind CSS or Material-UI)**

- **Backend:**
  - **Node.js:** A JavaScript runtime environment.
  - **Express.js:** A minimal and flexible Node.js web application framework.
  - **MongoDB:** A cross-platform document-oriented NoSQL database.
  - **Mongoose:** An elegant MongoDB object modeling tool for Node.js.
  - **JWT (JSON Web Tokens):** For secure user authentication.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following software installed on your machine:

- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/your-username/CampusEventHub.git](https://github.com/your-username/CampusEventHub.git)
    cd CampusEventHub
    ```

2.  **Setup the Backend:**

    ```bash
    # Navigate to the backend directory
    cd backend

    # Install dependencies
    npm install

    # Create a .env file in the backend directory
    # and add the following environment variables:
    touch .env
    ```

    Your `backend/.env` file should look like this:

    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    ```

3.  **Setup the Frontend:**

    ```bash
    # Navigate to the frontend directory from the root
    cd ../frontend

    # Install dependencies
    npm install

    # Create a .env file in the frontend directory
    # and add the following environment variable:
    touch .env
    ```

    Your `frontend/.env` file should look like this. This tells your React app where to find the backend API.

    ```env
    VITE_API_BASE_URL=http://localhost:5000
    ```

### Running the Application

You'll need to run both the backend and frontend servers in separate terminals.

1.  **Run the Backend Server:**

    ```bash
    # From the /backend directory
    npm start
    ```

    Your backend server should now be running on `http://localhost:5000`.

2.  **Run the Frontend Development Server:**
    ```bash
    # From the /frontend directory
    npm run dev
    ```
    Your React application should now be running on `http://localhost:5173` (or another port specified by Vite).

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
