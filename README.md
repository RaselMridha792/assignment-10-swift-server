# Sports Equipment Management Server

This is the backend server for managing sports equipment data and user carts. It provides RESTful APIs to perform CRUD operations and interact with the database.

## Key Features

- Fetch all sports equipment data.
- Retrieve specific equipment by ID or user email.
- Add new sports equipment to the database.
- Update existing equipment details.
- Delete equipment by ID.
- Manage user-specific cart items.
- Fetch items by category.

## Technologies Used

- **Node.js**: Runtime environment.
- **Express.js**: Framework for building web applications.
- **MongoDB**: Database for storing data.
- **Cors**: Middleware for handling Cross-Origin Resource Sharing.
- **dotenv**: For managing environment variables.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RaselMridha792/assignment-10-swift-server

## dependencies
    "cors": "^2.8.5",
    "dotenv": "^16.4.6",
    "express": "^4.21.1",
    "mongodb": "^6.11.0"
    
## install dependencies
    npm install

    
##  Create a .env file in the root directory and add your MongoDB credentials
    PORT=5000
    USER_DB=<your-mongodb-username>
    PASS_DB=<your-mongodb-password>
## start the server
    npm start
    
      
