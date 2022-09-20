const Auth = require('../models/auth.js');
const User = require("../models/user");

const TTL = 3600; // time to live of user session, in Seconds

module.exports = {
    activateUser: async (id, ipAddress) => {
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
            activation = await Auth.create({userId: id, ipAddress: ipAddress, active: true, activatedTime: Date.now()});
            if (!activation) {
                return false;
            }
            return true;
        } else {
            activation = await Auth.updateOne({userId: record.userId}, {ipAddress: ipAddress,
                                                                        active: true, activatedTime: Date.now()});
            return activation.acknowledged === true;
        }

    },
    deactivateUser: async (id) => {
        if (typeof id !== 'string') {
            id = String(id);
        }

        let record;
        try {
            record = await Auth.findOne({userId: id});
        } catch (e) {
            throw new Error('Something went wrong!');
        }

        let result;
        try {
            result = await Auth.deleteOne({userid: record.userId});
        } catch(e) {
            throw new Error('Something went wrong!')
        }

        return result.deletedCount === 1;
    },
    isUserActive: async (id, ipAddress) => {
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
            return false;
        }
        if (record.ipAddress !== ipAddress) {
            return false;
        }

        if (Math.ceil(new Date(Date.now()).getTime() - new Date(record.activatedTime).getTime()) / 1000 > TTL) {
            await Auth.updateOne({userId: record.userId}, {active: false});
            return false;
        } else {
            if (record.active) {
                return true
            } else {
                return false;
            }
        }
    }
};