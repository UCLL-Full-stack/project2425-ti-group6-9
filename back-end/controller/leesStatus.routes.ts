import express, { NextFunction, Request, Response } from 'express';
import leesStatusService from '../service/leesstatus.service';
import { LeesStatusInput } from '../types';

const leesStatusRouter = express.Router();

export { leesStatusRouter };