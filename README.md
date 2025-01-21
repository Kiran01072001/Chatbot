 # Chatbot Application with React and MySQL




## Overview

This project is a chatbot application built using React.js (Frontend), HTML/CSS (basic styling), and MySQL.
It allows users to interact with a chatbot by sending messages and receiving responses from a MySQL database.
The bot can also accept image files for processing, and the responses are fetched dynamically from the backend.

## Usage

Chat with the Bot: Type your message in the input box and press Enter or click the send button.
Send Images: You can send images by clicking the image icon next to the input box and selecting an image from your device.
The bot will reply with predefined responses from the MySQL database based on the message sent.

## Technologies Used:
React.js (Frontend)
HTML/CSS for basic styling
JavaScript for logic implementation
MySQL (for backend integration)


## Database:

  MySQL (for storing predefined chatbot responses)

### Installation Steps:

1. Clone this repository to your local machine:

    git clone https://github.com/your-username/Chatbot.git   

2. install these dependencies by running the following command:
   
   npm install express mysql2
   
   npm install
   
   npm start
   
   The app should now be running locally at (http://localhost:3000).

3. Configure the MySQL database:

    Create a database named `chatbot_db` in MySQL.

    Create a table named `chatbot_responses` with the following columns:

 

    CREATE TABLE chatbot_responses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        message VARCHAR(255) NOT NULL,
        response TEXT NOT NULL
    );
    

4. Add your database connection credentials in "database.js" file:

    
    const connection = createConnection({
        host: 'localhost',
        user: 'your-username',
        password: 'your-password',
        database: 'chatbot_db'
    });
    


## Troubleshooting

If you encounter any errors related to database connectivity, ensure that your MySQL server is running and the credentials in the "database.js" file are correct.
For any other issues, please open an issue in the GitHub repository.
