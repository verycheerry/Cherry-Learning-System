const express = require('express');
const app = express();

// Home Route
app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>Cherry Learning System</title>
            <style>
                body {
                    margin: 0;
                    font-family: Arial, sans-serif;
                    background: linear-gradient(to right, #5a0f2e, #0b1f3a);
                    color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .container {
                    text-align: center;
                    background: rgba(0, 0, 0, 0.4);
                    padding: 40px;
                    border-radius: 10px;
                }
                h1 {
                    margin-bottom: 20px;
                }
                p {
                    font-size: 18px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Cherry Learning System</h1>
                <p>Main branch version: System maintenance update first time & second time cotinue on</p>
            </div>
        </body>
        </html>
    `);
});

// Students API
app.get('/students', (req, res) => {
    res.json([
        { id: 1, name: 'Sophea' },
        { id: 2, name: 'Muntei' }
    ]);
});

// Grades API
app.get('/grades', (req, res) => {
    res.json([
        { student: 'Sophea', grade: 'A' },
        { student: 'Muntei', grade: 'B+' }
    ]);
});

// Courses API (NEW FEATURE)
app.get('/courses', (req, res) => {
    res.json([
        'Cloud Computing',
        'DevOps Engineering',
        'Database Systems'
    ]);
});

app.listen(3000, () => {
    console.log('Cherry Learning System running on port 3000');
});
