const Joi = require("joi");

module.exports.newProductJoi = async (body) => {
    const schema = Joi.object({
        title: Joi.string().required().min(3).max(50),

        description: Joi.string(),

        condition: Joi.string().required(),

        primaryImage: Joi.string().required(),

        secondryImages: Joi.array().items(Joi.string()),
    });

    const resp = await schema.validateAsync(body);

    return resp;
};

module.exports.viewProduct = async (body) => {
    const schema = Joi.object({
        id: Joi.string().required(),
    });

    const resp = await schema.validateAsync(body);

    return resp;
};

module.exports.userProducts = async (body) => {
    const schema = Joi.object({
        user_id: Joi.string().required(),
    });

    const resp = await schema.validateAsync(body);

    return resp;
};
