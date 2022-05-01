import Joi = require("joi");

export const validateLogin = Joi.object().keys({
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().required().label("Password"),
});

// userRegister
export const validateRegister = Joi.object().keys({
  firstName: Joi.string().required().label("First Name"),
  lastName: Joi.string().required().label("Last Name"),
  phone: Joi.string().optional().label("Phone"),
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().required().label("Password"),
  isActive: Joi.boolean().optional().label("Is Active").default(false),
  role: Joi.string()
    .optional()
    .valid("user", "admin")
    .label("Role")
    .default("user"),
});

// forgot password
export const validateForgotPassword = Joi.object().keys({
  email: Joi.string().email().required().label("Email"),
});

// verify Code
export const validateVerifyCode = Joi.object().keys({
  email: Joi.string().email().required().label("Email"),
  code: Joi.string().required().label("Code"),
  password: Joi.string().optional().label("Password"),
});
