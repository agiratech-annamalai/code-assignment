import * as express from 'express';

import convertRoutes from './convert';

class app {
  public express: express.Express;

  constructor() {
    this.express = express();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    this.express.use(`/api/v1/exchangeRates`, convertRoutes);
    this.express.use(`/`, (req, res) => {
      res.status(200).send({ data: `Welcome to Coding Assignment` });
    });
  }
}

export default new app().express;
