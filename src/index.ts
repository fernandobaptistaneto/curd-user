import express from 'express';
import routes from './routes';
import connect from './database/connect';
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
connect

app.listen(3000, () => { console.log('listening on port 3000') });
