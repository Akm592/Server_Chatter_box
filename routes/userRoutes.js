const { register} = require('../controllers/userControllers');
const { login } = require('../controllers/userControllers');
const { setAvatar } = require('../controllers/userControllers');
const { allUsers } = require('../controllers/userControllers');
const { logOut } = require('../controllers/userControllers');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/setavatar/:id', setAvatar);
router.get('/allusers/:id', allUsers);
router.get('/logOut/:id', logOut);


module.exports = router;