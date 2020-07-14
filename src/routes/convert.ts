import { Router } from 'express';
import exchangeController from './../controllers/exchange.controller';

const router = Router();

router.get(`/base/:base/exchange/:exchange/amount/:amount`, exchangeController.getExchangeRate);

export default router;
