import { createConnection } from 'mysql2';

const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kiraN@321',
    database: 'chatbot_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database.');
    }
});

async function getResponseFromDatabase(message) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT response FROM chatbot_responses WHERE message = ?';
        connection.query(query, [message], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(results.length ? results[0].response : 'Sorry, I didn\'t understand that.');
            }
        });
    });
}

export default { getResponseFromDatabase };
