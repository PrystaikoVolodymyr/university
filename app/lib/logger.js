const { createLogger, transports} = require('winston');
const Transport = require('winston-transport');
const Logger = require('../models/Logger')
require('winston-mongodb');

class YourCustomTransport extends Transport {
    constructor(opts) {
        super(opts);
    }
    log(info, callback) {
        setImmediate(async() => {
            await Logger.create({
                level: info.level,
                message: info.message,
                info: info.info,
                url: info.url,
                errorMessage: info.errorMessage,
                type: info.type
            })
        });
        callback();
    }
}


const logger = createLogger({
    transports: [
        new YourCustomTransport({}),
        new transports.Console()
    ]
});


module.exports = logger;


