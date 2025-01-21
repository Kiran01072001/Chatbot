const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { getResponseFromDatabase } = require('./db/database').default;   // Corrected import path

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



app.post('/api/getResponse', async (req, res) => {
    const { message, file } = req.body;
    try {
        console.log('Received message:', message);
        const response = await getResponseFromDatabase(message);
        console.log('Database response:', response);
        res.json({ response });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Something went wrong." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));













