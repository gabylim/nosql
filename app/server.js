const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config' );
const routes = require('./controllers/routes.js');

module.exports = class Server {
    constructor() {
        this.app = express();
        this.config = config[process.argv[2]] || config.developement;
    }

    dbConnect() {
        const host = this.config.mongodb.host;
        const connect = mongoose.createConnection(host);

        connect.on('error', (err) => {
            setTimeout(() => {
                console.log(`[DISCONNECTED] users api dbConnect() -> mongodb disconnected`);
                this.connect = this.dbConnect(host);
            }, 5000);
        });
        connect.on('disconnected', (err)=>{
            setTimeout(()=> {
                console.log(`[DISCONNECTED] users api dbConnect()-> mongodb disconnected`);
                this.connect = this.dbConnect(host);
            },5000);
        });

        process.on('SIGINT', () => {
            connect.close(()=>{
                console.log('[API END PROCESS] users api dbConnect() -> close mongodb connection')
                process.exit(0);
            });
        });

        return connect;
    }

    middleware() {
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(bodyParser.json())
    }

    /**
     * Routes
     */
    routes() {
        new routes.Users(this.app, this.connect);
        new routes.Events(this.app, this.connect);

        this.app.use((req, res)=> {
            res.status(404).json({
                code:404,
                message: 'Not found'
            });
        });
    }

    run() {
        try {
            this.connect = this.dbConnect();
            this.middleware();
            this.routes();
            this.app.listen(this.config.express.port);

        } catch (err) {
            console.error(`[ERROR] Server -> ${err}`)
        }
    }
}