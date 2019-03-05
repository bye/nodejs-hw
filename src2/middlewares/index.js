const jwt = require('jsonwebtoken');

export function checkToken(req, res, next) {
    let token = req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, 'secret', function(err, decoded) {
            if (err) {
                res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // some business logic here
                next();
            }
        });
    } else {
        res.status(403).send({ success: false, message: 'No token provided.' });
    }
}
