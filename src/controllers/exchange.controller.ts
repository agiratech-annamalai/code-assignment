import { Request, Response } from 'express';
import * as https from 'https';
import squissController from './squiss.controller';
// import { Squiss, Message } from 'squiss-ts';

import * as dotenv from 'dotenv';

dotenv.config();

const getExchangeRate = (request: Request, response: Response): any => {
  const reqBaseCurrency = request.params.base;
  const reqExCurrency = request.params.exchange;
  const reqAmount: number = parseFloat(request.params.amount) || 1;
  try {
    if (!(reqBaseCurrency && reqExCurrency)) {
      throw new Error(`Base & convertion currency is required for getting the exchange rate`);
    }
    https
      .get(
        `${process.env.EXCHANGE_URL}?base=${reqBaseCurrency}&symbols=${reqExCurrency}&prettyprint=0&app_id=${process.env.EXCHANGE_APPID}`,
        (res) => {
          console.log(`STATUS: ` + res.statusCode);
          console.log(`HEADERS: ` + JSON.stringify(res.headers));
          res.on(`data`, (d) => {
            console.log(`Exchange Rate body: ${d}`);
            const exchangeData = JSON.parse(d);

            const convertedValue: number = exchangeData.rates[reqExCurrency] * reqAmount;
            const responsedata: { [key: string]: any } = {
              baseCurrency: reqBaseCurrency,
              exchangeCurrency: reqExCurrency,
              inputCurrencyValue: reqAmount,
              exchangeRate: exchangeData.rates[reqExCurrency],
              timestamp: exchangeData.timestamp,
              amount: convertedValue,
            };
            console.log(`Exchange Result:`, JSON.parse(JSON.stringify(responsedata)));

            const messageToSend = {
              name: `exchange`,
              message: responsedata,
            };

            squissController.squissProcess(messageToSend);

            // return response.header(res.headers).status(200).send(responsedata);
            return;
          });
          return response.status(200).send({ result: `Exchange Rate will be sent to your email shortly` });
        }
      )
      .on(`error`, (e) => {
        console.log(`problem with request: ` + JSON.stringify(e));
        const errResponse: { [key: string]: any } = e;
        return response.status(errResponse.status).send({
          error: true,
          status: errResponse.status,
          message: `failure`,
          description: `Internal error. Unable to get the exchange rate. Please try later`,
        });
      });
  } catch (err) {
    return response.status(err.status).send({
      error: true,
      status: err.status,
      message: `failure`,
      description: err.message,
    });
  }
};

export default {
  getExchangeRate,
};
