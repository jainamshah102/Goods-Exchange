const Joi = require("joi");

module.exports.fetchConversation = async (body) => {
    const schema = Joi.object({
        userId: Joi.string().required(),
    });

    const resp = await schema.validateAsync(body);

    return resp;
};

module.exports.postMessage = async (body) => {
    const schema = Joi.object({
        to: Joi.string().required(),

        body: Joi.string().required(),
    });

    const resp = await schema.validateAsync(body);

    return resp;
};
