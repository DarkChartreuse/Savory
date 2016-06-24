const User = require('../models/usersModel.js');
const bcrypt = require('bcrypt');

module.exports = {
  createUser: (req, res) => {
    User.findOne({ where: { email: req.body.email } }).then(exists => {
      if (exists) {
        return res
          .status(400)
          .type('json')
          .json({ message: 'User with same email already exists' });
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      return User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        description: req.body.description,
        phone: req.body.phone,
        password: hashedPassword,
        address: `${req.body.street}, ${req.body.city}, ${req.body.state}`,
        zip: req.body.zipcode,
        profile: '', // TODO: point to uploaded image link
        chef: req.body.chef,
      })
      .then(user => {
        res.json(user);
      })
      .catch(err => { console.error(err); });
      });
    },

  deleteUser: (req, res) => {
    User.findOne({ where: { id: req.params.id } })
    .then(userToDelete => {
      console.log('Deleting user: ', userToDelete.dataValues);
      userToDelete.destroy();
    })
    .catch(err => { console.error('Error deleting user', err); })
    .finally(() => {
      res.end();
    });
  },

  getUser: (req, res) => {
    User.findOne({ where: { id: req.params.id } })
    .then(user => {
      res.json(user.dataValues);
    })
    .catch(err => { console.error('Error fetching user', err); });
  },

  getAllUsers: (req, res) => {
    User.findAll()
    .then(users => {
      res.json(users);
    })
    .catch(err => { console.error('Error fetching users', err); });
  },
};
