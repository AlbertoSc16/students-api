import { Router } from 'express';
import { 
    getAllStudents, 
    getStudentById, 
    createStudent, 
    updateStudent, 
    patchStudent, 
    deleteStudent 
} from '../controllers/student-controller.js';

const router = Router();

router.get('/students', getAllStudents);
router.get('/students/:id', getStudentById);
router.post('/students', createStudent);
router.put('/students/:id', updateStudent);
router.patch('/students/:id', patchStudent);
router.delete('/students/:id', deleteStudent);

export default router;