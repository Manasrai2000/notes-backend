# Notes Backend API

## Setup

1. Clone or copy the project.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the project root:
   ```
   SECRET_KEY=your_secret_key_here
   ```
4. Start the server:
   ```
   node server.js
   ```
   The server runs on `http://localhost:5000`.

## API Endpoints

### Auth

#### POST `/auth/register`
- **Payload:**  
  ```json
  {
    "name": "Your Name",
    "email": "your@email.com",
    "password": "yourpassword"
  }
  ```
- **Response:**  
  User info (id, name, email).

#### POST `/auth/login`
- **Payload:**  
  ```json
  {
    "email": "your@email.com",
    "password": "yourpassword"
  }
  ```
- **Response:**  
  `{ "token": "<JWT token>" }`

---

### Profile (Requires Authorization header: `Bearer <token>`)

#### GET `/profile`
- **Response:**  
  User info (id, name, email, created_at).

#### PUT `/profile`
- **Payload:**  
  ```json
  {
    "name": "New Name",
    "email": "new@email.com"
  }
  ```
- **Response:**  
  `{ "message": "Profile updated" }`

---

### Notes (Requires Authorization header: `Bearer <token>`)

#### GET `/notes`
- **Response:**  
  Array of notes for the user.

#### POST `/notes`
- **Payload:**  
  ```json
  {
    "title": "Note Title",
    "content": "Note content"
  }
  ```
- **Response:**  
  Created note info (id, title, content).

#### PUT `/notes/:id`
- **Payload:**  
  ```json
  {
    "title": "Updated Title",
    "content": "Updated content"
  }
  ```
- **Response:**  
  `{ "message": "Note updated" }`

#### DELETE `/notes/:id`
- **Response:**  
  `{ "message": "Note deleted" }`

---

## Usage

- Register and login to get a JWT token.
- Use the token in the `Authorization` header for all `/profile` and `/notes` requests:
  ```
  Authorization: Bearer <your_token>
  ```

## Dependencies

- express
- sqlite3
- bcryptjs
- jsonwebtoken
- dotenv

## Project Structure

- **src/**: Main source code folder
  - **controllers/**: Route handler logic for API endpoints (auth, user, notes)
  - **models/**: Database access and business logic for users, profiles, and notes
  - **routes/**: Route definitions for API endpoints
  - **database/**: Database connection and setup (SQLite)
  - **utils/**: Utility functions (e.g., JWT token generation)
  - **app.js**: Express app setup and middleware
- **server.js**: Entry point to start the server
- **.env**: Environment variables (e.g., SECRET_KEY)
