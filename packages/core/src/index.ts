/*
 * © Copyright 2020 HP Development Company, L.P.
 * SPDX-License-Identifier: MIT
 */

import { Express } from 'express';
import { Server } from 'http';
import * as httpErrors from './errors/httpErrors';

export { createApp, DaVinciOptions } from './createApp';

/**
 * This is only here to assist people when upgrading their API.
 * It will be removed in a future version.
 */
const boot = () => {
	/* eslint-disable no-console */
	console.error('ERROR: boot() is deprecated, please use createApp() instead.');
	process.exit(-1);
};

export interface DaVinciExpress extends Express {
	server: Server;
	start: Function;
	close: Function;
}

export * from './route';
export * from './express';
export { boot, httpErrors };
