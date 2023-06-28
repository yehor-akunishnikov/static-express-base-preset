const express = require("express");

const {twing} = require("../config/twig.config");

const router = express.Router();

router.get("/", function(req, res) {
    twing.render("pages/test.twig").then((output) => {
        res.end(output);
    });
});

module.exports = router;