
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


const login = (req, res, next) => {

    const {email, password } = req.body;

    if (!email || !password){
        return res.status(400).json({
            error: 'Email and password should be provided'
        });
    }

    User.findOne({email: email})
        .then(user => {
            if (!user){
                return res.status(400).json({
                    status: 'fail',
                    error: 'User not found'
                })
            }

            //validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch){
                        return res.status(400).json({
                            error: 'Invalid credentials'
                        });
                    }

                    jwt.sign({id: user._id}, 'JWT_SECRET', {expiresIn: 3600}, (err, token) => {
                        if (err){
                            throw err;
                        }

                        res.status(200).json({
                            status: 'success',
                            token: token,
                            user: user
                        })
                    })


                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json({
                        status: 'fail',
                        error: err
                    })

                })
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                status: 'fail',
                error: err
            });
        })

}


const getUser = async (req, res, next) => {

    try{

        const user = await User.findById(req.user.id)
                            .select('-password');

        if (!user){
            return res.status(400).json({
                status:'fail',
                error: 'User not found'
            })
        }

        res.status(200).json({
            status: 'success',
            data: {
                user: user
            }
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
    login: login,
    getUser: getUser
}