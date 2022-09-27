const router = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt')

// Register

router.post('/signup', async (req, res) => {
  try {
    // generate new password with bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    })

    // save new user
    const user = await newUser.save()

    // response request
    res.status(200).json(user._id)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Login

router.post('/login', async (req, res) => {
  try {
    // find a user
    const user = await User.findOne({ username: req.body.username })
    !user && res.status(400).json('Wrong username!')

    // password validation
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json('Wrong password')

    // response request
    res.status(200).json({ username: user.username })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
