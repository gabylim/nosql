const EventModel = require('../models/event.js');
const UserModel = require('../models/user.js');


module.exports = class Events {
    constructor(app, connect) {
        this.app = app;
        this.EventModel = connect.model('Event', EventModel);
        this.UserModel = connect.model('User', UserModel);
        this.run();
    }

    run() {
        this.app.post('/events/',async (req, res)=> {
            try{

                this.UserModel.findOne({ email: req.body.createdBy }).then((user) => {
                    if(!user){
                        res.status(404).json('User not found');
                        return;
                    }else{
                        req.body.createdBy = user._id;
                        req.body.organisateurs = user._id;
                        const eventModelQuery = new this.EventModel(req.body);
                        eventModelQuery.save().then((event) => {
                            res.status(200).json(event || {});
                        }).catch((err)=>{  
                            res.status(422).json(`Save events  : ${err.message}` || {});
                        });
                    }
                }).catch((err)=>{  
                    res.status(422).json(`Search user  : ${err.message}` || {});
                });

            } catch(err) {
                console.error(`[ERROR] post:events -> ${err}`);
            
                res.status(400).json({
                    code: 400,
                    message: `${err}`
                });
            }
        });

        this.app.get('/events/:id',async (req, res)=> {
            try{
                this.EventModel.findOne({ _id: req.params.id }).populate('organisateurs').populate('createdBy').then((event) => {
                    res.status(200).json(event || 'Event not found');
                }).catch((err)=>{  
                    res.status(422).json(err.message || {});
                });
            } catch(err) {
                console.error(`[ERROR] post:events -> ${err}`);
            
                res.status(400).json({
                    code: 400,
                    message: `${err}`
                });
            }
        });


        this.app.delete('/events/:id', (req, res) => {
            try {
                    this.EventModel.findOneAndDelete({_id: req.params.id}).then((event) => {
                        let message = !event ? 'Event not found':'supprimé avec succès';
                        res.status(200).json(message);
                    }).catch((err)=>{  
                            res.status(422).json(err.message || {});
                    });
            }
            catch (err) {
                console.error(`[ERROR] post:events -> ${err}`);
                res.status(400).json({
                    code: 400,
                    message: `${err}`
                });
            }
        });



        this.app.delete('/events/deleteParticipant/:id', (req, res) => {
            try {
                this.UserModel.findOne({ email: req.body.participant }).then((user) => {
                    if(!user){
                        res.status(404).json('User not found');
                        return;
                    }else{
                        this.EventModel.findOneAndUpdate({_id: req.params.id}, 
                            {   
                                $pull: {
                                participants: user._id,
                                }
                            }, 
                            {
                                new: true,
                                runValidators: true
                            }).then((event) => {
                                    res.status(200).json(event || 'Event not found');
                            }).catch((err)=>{  
                                res.status(422).json(`Delete participant  : ${err.message}`  || {});
                            });
                    }
                }).catch((err)=>{  
                    res.status(422).json(`Search user  : ${err.message}`  || {});
                });
            }
            catch (err) {
                console.error(`[ERROR] post:events -> ${err}`);
                res.status(400).json({
                    code: 400,
                    message: `${err}`
                });
            }
        });




        this.app.delete('/events/deleteorganisateur/:id', (req, res) => {
            try {
                this.UserModel.findOne({ email: req.body.organisateur }).then((user) => {
                    if(!user){
                        res.status(404).json('User not found');
                        return;
                    }else{
                        this.EventModel.findOneAndUpdate({_id: req.params.id}, 
                            {   
                                $pull: {
                                organisateurs: user._id,
                                }
                            }, 
                            {
                                new: true,
                                runValidators: true
                            }).then((event) => {
                                    res.status(200).json(event || 'Event not found');
                            }).catch((err)=>{  
                                res.status(422).json(`Delete organisateur  : ${err.message}`  || {});
                            });
                    }
                }).catch((err)=>{  
                    res.status(422).json(`Search user  : ${err.message}`  || {});
                });
            }
            catch (err) {
                console.error(`[ERROR] post:events -> ${err}`);
                res.status(400).json({
                    code: 400,
                    message: `${err}`
                });
            }
        });
    }
}
