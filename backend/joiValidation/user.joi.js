const Joi = require("joi");
const InvalidParameters = require("../errors/invalidParameters");

const userRegister = async (body) => {
    const schema = Joi.object({
        username: Joi.string().required().max(20).min(3),

        firstName: Joi.string().required(),

        lastName: Joi.string().required(),

        email: Joi.string().email({ tlds: { allow: ["com", "net"] } }),

        password: Joi.string().required(),

        profilePic: Joi.string().default(""),

        gender: Joi.string()
            .valid("M", "F", "O")
            .default("O")
            .required()
            .min(1)
            .max(1),

        dob: Joi.date().required(),

        contactNumber: Joi.number().min(6000000000).max(9999999999).required(),
    });

    const resp = await schema.validateAsync(body);

    return resp;
};

module.exports = userRegister;
