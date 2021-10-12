const Joi = require("joi");

module.exports.newProductJoi = async (body) => {
    const schema = Joi.object({
        contactNumber: Joi.number().required(),

        title: Joi.string().required().min(3).max(50),

        description: Joi.string(),

        condition: Joi.string().required(),

        primaryImage: Joi.string().required(),

        secondryImages: Joi.array().items(Joi.string()),
    });

    const resp = await schema.validateAsync(body);

    return resp;
};
