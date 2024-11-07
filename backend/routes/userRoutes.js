import express from 'express'
import { authUser,registerUser,logoutUser, getuserProfile,updateUserProfile} from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', registerUser)
router.post('/auth', authUser)
router.route('/profile').get(protect, getuserProfile).put(protect, updateUserProfile)
router.post('/logout', logoutUser)




export default router;