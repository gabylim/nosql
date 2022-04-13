module.exports = {
    developement: {
        express: {
            type:'developpement',
            port: 3000
        },
        mongodb: {
            host: 'mongodb+srv://nabila:nabila06@nabila.r2dli.mongodb.net/nabila'
        }
    },
    production: {
        express: {
            type: 'production',
            port: 3000,
        },
        mongodb: {
            host: 'mongodb+srv://nabila:nabila06@nabila.r2dli.mongodb.net/nabila'
        }

    }
}