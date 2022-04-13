const EventModel = require('../models/event.js');

module.exports = class Events {
    constructor(app, connect) {
        this.app = app;
        this.EventModel = connect.model('Event', EventModel);

        this.run();
    }

    run() {
        this.app.post('/events/', (req, res) => {
            try {
                const eventModel = new this.EventModel(req.body);

                eventModel.save().then((event) => {
                    res.status(200).json(event || {});
                }).catch((err)=> {
                    res.status(200).json({
                        message: err
                    });
                });
            } catch(err) {
                console.error(`[ERROR] post:events -> ${err}`);
            
                res.status(400).json({
                    code: 400,
                    message: 'Bad Request'
                });
            }
        });
    }
}