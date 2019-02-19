import express from 'express';
import bodyParser from 'body-parser';
import users from './routes/user';
import auth from './routes/auth';
import events from './routes/events';


let app = express();
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/events',events);



// app.get('/q', (req, res) => {
//     console.log(req.body);
//     res.status(200).json('hello')
// });

app.listen(6060, () => console.log('Running on localhost :6060'));