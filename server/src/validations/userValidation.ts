import Joi from 'joi';

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    limit: Joi.number().integer().default(100),
    page: Joi.number().integer().default(0),
  }),
};


const getUser = {
    params: Joi.object().keys({
        userId: Joi.string().required(),
    }),
};

const updateUser = {
    params: Joi.object().keys({
      userId: Joi.string().required(),
    }),
    body: Joi.object()
      .keys({
        name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string().min(8)
      })
    .min(1),
};

const deleteUser = {
    params: Joi.object().keys({
      userId: Joi.string().required()
    }),
};

export {
  createUser,
  updateUser,
  getUser,
  getUsers,
  deleteUser
}