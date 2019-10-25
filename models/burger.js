const orm = require("../config/orm");

const burger = {
    selectAll: function() {
        return orm.selectAll("burgers");
    },
    insertOne: function(cols, vals) {
        return orm.insertOne("burgers", cols, vals);
    },
    updateOne: function(objColVals, condition) {
        return orm.updateOne("burgers", objColVals, condition);
    }
};

module.exports = burger;