const express = require("express");
const router = express.Router();
const burger = require("../models/burger");



router.get("/", function(req, res) {
    burger.selectAll()
    .then(results => {
        let hbsObject = {
            burgers: results
        };
        console.log('hbsObject', hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res) {
    burger.insertOne(
        ["burger_name", "devoured"],
        [req.body.burger_name, req.body.devoured])
    .then(results => {
        res.json({ id: results.insertId });
    });
});

router.put("/api/burgers/:id", function(req, res) {
    let condition = `id = ${req.params.id}`;
    burger.updateOne({
        devoured: req.body.devoured
    }, condition)
    .then(results => {
        if (results.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;