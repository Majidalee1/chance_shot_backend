import Joi = require("joi");

export const validateLogin = Joi.object().keys({
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().required().label("Password"),
});

// userRegister
export const validateRegister = Joi.object().keys({
  firstName: Joi.string().required().label("First Name"),
  lastName: Joi.string().required().label("Last Name"),
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().required().label("Password"),
});
