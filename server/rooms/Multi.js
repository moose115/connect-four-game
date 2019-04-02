const colyseus = require('colyseus');

module.exports = class Multi extends colyseus.Room {

    onInit(options) {

        this.server = options.server;
    }
    

    onMessage(c, m) {

        if(m.task === 'host') this.startHost();

    }


    startHost() {
        
        this.server.register('game', require('./Game'));

    }
}