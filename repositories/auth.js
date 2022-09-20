const Auth = require('../models/auth.js');

const TTL = 10; // time to live of user session, in Seconds

module.exports = {
    activateUser: async (id) => {
        if (typeof id !== 'string') {
            id = String(id);
        }

        let record;
        try {
            record = await Auth.findOne({userId: id});
        } catch (e) {
            throw new Error('Something went wrong!');
        }

        let activation;
        if (!record) {
            activation = await Auth.create({userId: id, activatedTime: Date.now()});
            if (!activation) {
                return false;
            }
            return true;
        } else {
            activation = await Auth.updateOne({userId: record.userId}, {activatedTime: Date.now()});
            return activation.acknowledged === true;
        }

    },
    isUserActive: async (id) => {
        if (typeof id !== 'string') {
            id = String(id);
        }

        let record;
        try {
            record = await Auth.findOne({userId: id});
        } catch (e) {
            throw new Error('Something went wrong!');
        }
        if (!record) {
            throw new Error('Not found');
        }

        if (Math.ceil(new Date(Date.now()).getTime() - new Date(record.activatedTime).getTime()) / 1000 > TTL) {
            return false;
        } else {
            return true;
        }
    }
};