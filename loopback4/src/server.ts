import {ApplicationConfig} from '@loopback/core';
import bodyParser from 'body-parser';
import {once} from 'events';
import express, {Request, Response} from 'express';
import * as http from 'http';
import {AddressInfo} from 'net';
import * as path from 'path';
// Replace CoffeeShopApplication with the name of your application
import {Loopback4Application} from './application';
const loopback = require('loopback');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const noCache = require('nocache')

export class ExpressServer {
  private app: express.Application;
  public readonly lbApp: Loopback4Application;
  public server?: http.Server;
  public url: String;

  constructor(options: ApplicationConfig = {}) {
    this.app = express();
    this.lbApp = new Loopback4Application(options);

    // Middleware migrated from LoopBack 3
    this.app.use(loopback.favicon());
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.frameguard());
    this.app.use(helmet.hsts());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.ieNoOpen());
    this.app.use(helmet.noSniff());
    this.app.use(noCache());
    this.app.use(cookieParser());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    // Mount the LB4 REST API
    this.app.use('/', this.lbApp.requestHandler);

    // Custom Express routes
    this.app.get('/ping', function (_req: Request, res: Response) {
      res.send('pong');
    });

    // Serve static files in the public folder
    this.app.use(express.static(path.join(__dirname, '../public')));
  }

  public async boot() {
    await this.lbApp.boot();
  }

  public async start() {
    await this.lbApp.start();
    const port = this.lbApp.restServer.config.port || 3000;
    const host = this.lbApp.restServer.config.host || '127.0.0.1';
    this.server = this.app.listen(port, host);
    await once(this.server, 'listening');
    const add = <AddressInfo>this.server.address();
    this.url = `http://${add.address}:${add.port}`;
  }

  public async stop() {
    if (!this.server) return;
    await this.lbApp.stop();
    this.server.close();
    await once(this.server, 'close');
    this.server = undefined;
  }
}
