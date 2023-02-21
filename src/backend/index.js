const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = 'db.json';


app.use(express.json());

app.post('/users', (req, res) => {

    let data = [];
    try {
        data = JSON.parse(fs.readFileSync(DB_FILE));
    } catch (err) { }

    data.push(req.body);

    fs.writeFileSync(DB_FILE, JSON.stringify(data));

    res.status(201).send('User created');
});


app.get('/users', (req, res) => {

    let data = [];
    try {
        data = JSON.parse(fs.readFileSync(DB_FILE));
    } catch (err) { }

    res.send(data);
});


app.put('/users', (req, res) => {

    let data = [];
    try {
        data = JSON.parse(fs.readFileSync(DB_FILE));
    } catch (err) { }


    const user = data.find((u) => u.id === req.params.id);

    if (!user) {
        return res.status(404).send('User not found');
    }


    user.name = req.body.name;
    user.email = req.body.email;

    fs.writeFileSync(DB_FILE, JSON.stringify(data));

    res.send('User updated');
});


app.delete('/users', (req, res) => {

    let data = [];
    try {
        data = JSON.parse(fs.readFileSync(DB_FILE));
    } catch (err) { }


    const index = data.findIndex((u) => u.email === req.params.email);

    if (index === -1) {
        return res.status(404).send('User not found');
    }


    data.splice(index, 1);


    fs.writeFileSync(DB_FILE, JSON.stringify(data));

    res.send('User deleted');
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
