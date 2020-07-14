import app from './routes/app';
import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

// OFF CONSOLE.LOGS, WHEN DEBUG MODE IS SET TO FALSE
if (process.env.DEBUG === `false`) {
  // tslint:disable-next-line:no-console
  console.log(`CONSOLE.LOG DISABLED, DEBUG MODE IS OFF!`, process.env.DEBUG);
  // tslint:disable-next-line:no-console
  console.log = (): null => null;
}

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
