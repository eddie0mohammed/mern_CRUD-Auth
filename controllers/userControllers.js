
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');




const createUser = async (req, res, next) => {

    const {name, email, password} = req.body;

    if (!name || !email || !password){
        return res.status(400).json({
            status: 'fail',
            error: 'Name, email and password required'
        });
    }

    try {

        const user = await User.findOne({email: email});
        if (user){
            return res.status(400).json({
                status: 'fail',
                error: 'Email already exists in database'
            });
        }

        const newUser = new User({
            name: name,
            email: email,
            password: password

        });

        //hash password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err){
                    throw err;
                }
                newUser.password = hash;
                newUser.save()
                    .then(user => {

                        //token
                        jwt.sign( {id: user._id}, 'JWT_SECRET', {expiresIn: 3600}, (err, token) => {
                            if (err){
                                throw err;
                            }

                            res.status(201).json({
                                status: 'success',
                                token: token,
                                data: {
                                    user: user
                                }
                            });

                        });

                        

                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(400).json({
                            status: 'fail',
                            error: err
                        })
                    })
            })
        })



    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
    
}


module.exports = {
    createUser: createUser,
}