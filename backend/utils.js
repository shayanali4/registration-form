import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        companyId: user.companyId,
        companyName: user.companyName
    },
        'somethingsecret',
    );
};

export const verifyToken = (req,res,next) => {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken;
        next()
    } else {
        res.sendStatus(403)
    }
};