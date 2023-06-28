const express = require("express");

const userService = require("../services/user.service");

const {twing} = require("../config/twig.config");

const router = express.Router();

router.get("/", async function(req, res) {
    const users = await userService.getAll();

    twing.render("pages/user/index.twig", {users}).then((output) => {
        res.end(output);
    });
});

router.get("/edit/:id", async function(req, res) {
    const user = await userService.getOne({id: req.params.id});

    twing.render("pages/user/edit.twig", {user}).then((output) => {
        res.end(output);
    });
});

router.post("/api", async function(req, res) {
    const user = await userService.create(req.body);

    res.send(JSON.stringify(user));
});

router.put("/api/:id", async function(req, res) {
    const user = await userService.update(req.body);

    res.send(JSON.stringify(user));
});

module.exports = router;