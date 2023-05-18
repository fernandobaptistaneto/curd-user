import express from 'express';
import routes from './routes';
import connect from './database/connect';

const app = express();

app.use(express.json());
app.use(routes);
connect

app.listen(3000, () => { console.log('listening on port 3000') });
