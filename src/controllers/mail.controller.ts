// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const sendMail = (mailId: string, data: any): any => {
  const Mailer: { [key: string]: any } = {};
  Mailer.send = (): any => {
    // To do: Send mail with a Mail Client
    console.log(`Mail is sent to ${mailId} with data ${data}`);
  };
};

export default {
  sendMail,
};
