const {TwingLoaderFilesystem, TwingEnvironment} = require("twing");

const loader = new TwingLoaderFilesystem("./templates");
const twing = new TwingEnvironment(loader);

module.exports = {
    twing
};