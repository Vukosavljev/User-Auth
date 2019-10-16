const User = require('../models/user.model');
const route = require('express').Router();

route.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err })
  }
});

route.post('/', (req, res) => {
  const user = new User({
    userName: req.body.userName,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    postNumber: req.body.postNumber,
    city: req.body.city
  });

  user.save()
    .then(data => res.status(200).json(data))
    .catch(err => res.json({ message: err }))
})

route.patch('/:id', async (req, res) => {
  // const updateValues = Object.keys(req.body).map(key => ({
  //   key:
  // }))
  try {
    const updateUser = await User.updateOne(
      { _id: req.params.id },
      {
        $set: { ...req.body }
      })
    res.json(updateUser);
  } catch (err) {
    res.json({ message: err })
  }

})

module.exports = route