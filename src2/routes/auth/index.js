const { Router } = require('express');
const authRouter = Router();
const jwt = require('jsonwebtoken');
const data = require('../../models/data');
import passport from '../../config/passport-setup';


authRouter.post('', function(req, res) {
    const user = data.find((el) => {
        if (el.login === req.body.login){
            return el;
        }
    });
    if (!user) {
        res.status(404).send({ success: false,  message: 'User doesn\'t exist' });	
    } else if (user.password !== req.body.password) {
        res.status(403).send({ success: false,  message: 'Bad username/password combination.' });	
    } else {
        const payload = { "sub": user.id, "isActive": user.isActive };
		const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });
		res.send(token);
    }
});

authRouter.get('/google', passport.authenticate('google', {
    scope: ['profile'],
}));

authRouter.get('/google/redirect', (req, res) => {
    res.send('Yo-yo-yo!');
})

export default authRouter;