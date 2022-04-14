const UserModel = require('../models/user.js');


module.exports = class Users {
    constructor(app, connect) {
        this.app = app;
        this.UserModel = connect.model('User', UserModel);

        this.run();
    }

   
    run() {
        this.app.post('/users/', (req, res) => {
            try {
                const userModel = new this.UserModel(req.body);

                userModel.save().then((user) => {
                    res.status(200).json(user || {});
                }).catch((err)=> {
                    res.status(200).json({
                        message: err
                    });
                });
            } catch(err) {
                console.error(`[ERROR] post:users -> ${err}`);
            
                res.status(400).json({
                    code: 400,
                    message: 'Bad Request'
                });
            }
        });

        //get

        this.app.get('/users/:email', (req, res)=> {
            try{
                this.UserModel.findById(req.params.email).then((user) => {
                    res.status(200).json(user || {})
                  }).catch((err) => {
                    res.status(400).json({
                      status: 400,
                      message: err
                    })
                  })
                
            } catch(err) {
                console.error(`[ERROR] post:users -> ${err}`);
            
                res.status(400).json({
                    code: 400,
                    message: `${err}`
                });
            }
        });



        //delete
        this.app.delete('/user/:email', (req, res)=> {
            try{

                this.UserModel.findOneAndDelete(req.params.email).then((user) => {
                    res.status(200).json(user || {})
                  }).catch((err) => {
                    res.status(400).json({
                      status: 400,
                      message: err
                    })
                  })
            } catch(err) {
                console.error(`[ERROR] post:users -> ${err}`);
            
                res.status(400).json({
                    code: 400,
                    message: `${err}`
                });
            }
        });

      
    }
}