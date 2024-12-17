const router = require('express').Router();
const adminAuth = require('../middleware/authMiddleware');

router.use(adminAuth);
router.get('/admin', (req, res) => res.json({ message: 'Admin access granted' }));

module.exports = router;
