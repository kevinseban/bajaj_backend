const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

// POST Method Endpoint
app.post('/bfhl', (req, res) => {
    const data = req.body.data; 

    if (!Array.isArray(data)) {
        return res.status(400).json({
            "is_success": false,
            "message": "Invalid input, data should be an array."
        });
    }

    let numbers = [];
    let alphabets = [];
    let highest_lowercase = '';

    // Separate numbers and alphabets
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (isNaN(item)) {
            alphabets.push(item);
            if (item >= 'a' && item <= 'z') {
                if (highest_lowercase === '' || item > highest_lowercase) {
                    highest_lowercase = item;
                }
            }
        }
    });

    // Prepare response
    res.json({
        "is_success": true,
        "user_id": "john_doe_17091999",
        "email": "john@xyz.com",
        "roll_number": "ABCD123",
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": highest_lowercase ? [highest_lowercase] : []
    });
});

// GET Method Endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        "operation_code": 1
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
