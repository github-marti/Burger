const orm = require("../config/orm");

const burger = {
    selectAll: function(cb) {
        orm.selectAll("burger", function(res) {
        cb(res);
        });
    },
    insertOne: function(cols, vals, cb) {
        orm.insertOne("cats", cols, vals, function(res) {
        cb(res);
        });
    },
    updateOne: function(objColVals, condition, cb) {
        orm.updateOne("cats", objColVals, condition, function(res) {
        cb(res);
        });
    }
};

module.exports = burger;