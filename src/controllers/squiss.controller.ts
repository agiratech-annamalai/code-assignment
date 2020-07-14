import { Squiss, Message } from 'squiss-ts';
import * as dotenv from 'dotenv';
import mailController from './mail.controller';

dotenv.config();

const awsConfig = {
  accessKeyId: process.env.AWS_SQS_ACCESSKEY,
  secretAccessKey: process.env.AWS_SQS_SECRETKEY,
  region: process.env.AWS_SQS_REGION,
  endpoint: process.env.AWS_SQS_URL,
};

const squiss = new Squiss({
  awsConfig,
  queueName: `default`,
  bodyFormat: `json`,
  maxInFlight: 15,
});

squiss.start().then(() => {
  console.log(`polling started`);
});

squiss.on(`message`, (message: Message) => {
  // To do: Email ID of the User
  const useremail = `user01@test.com`;
  console.log(`${message.body.name} says: ${JSON.stringify(message.body.message)}`);
  mailController.sendMail(useremail, message);
  message.del();
});

const squissProcess = (messageToSend: { [key: string]: any }): void => {
  try {
    squiss
      .sendMessage(messageToSend, 0)
      .then((result) => {
        console.log(`message sent with id ${result.MessageId}`);
        return;
      })
      .catch((err) => {
        console.log(`message sent failure`, err);
        return;
      });
  } catch (err) {
    console.log(`message sent failure`, err);
    return;
  }
};

export default {
  squissProcess,
};
