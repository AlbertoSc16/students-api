import { getDbConnection } from '../database/db-config.js';
import { validateStudent } from '../models/student-model.js';
import { sendSuccess, sendError } from '../utils/response-handler.js';


export const getAllStudents = async (req, res) => {
    try {
        const db = await getDbConnection();
        const students = await db.all('SELECT * FROM students');
        return sendSuccess(res, "Students retrieved", students);
    } catch (err) {
        return sendError(res, "Internal Server Error", 500);
    }
};


export const getStudentById = async (req, res) => {
    try {
        const db = await getDbConnection();
        const student = await db.get('SELECT * FROM students WHERE id = ?', [req.params.id]);
        
        if (!student) {
            return sendError(res, "Student not found", 404);
        }
        return sendSuccess(res, "Student retrieved", student);
    } catch (err) {
        return sendError(res, "Internal Server Error", 500);
    }
};


export const createStudent = async (req, res) => {
    const validation = validateStudent(req.body);
    if (!validation.isValid) {
        return sendError(res, validation.errors.join(", "), 400);
    }

    try {
        const db = await getDbConnection();
        const { first_name, last_name, email, major, semester, gpa, enrollment_date } = req.body;
        
        const result = await db.run(
            `INSERT INTO students (first_name, last_name, email, major, semester, gpa, enrollment_date) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [first_name, last_name, email, major, semester, gpa, enrollment_date]
        );
        
        return sendSuccess(res, "Student created successfully", { id: result.lastID, ...req.body }, 201);
    } catch (error) {
        if (error.message.includes("UNIQUE constraint failed")) {
            return sendError(res, "Email already exists", 409);
        }
        return sendError(res, "Internal Server Error", 500);
    }
};


export const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, major, semester, gpa, enrollment_date, is_active } = req.body;

    try {
        const db = await getDbConnection();
        const result = await db.run(
            `UPDATE students SET first_name=?, last_name=?, email=?, major=?, semester=?, gpa=?, enrollment_date=?, is_active=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`,
            [first_name, last_name, email, major, semester, gpa, enrollment_date, is_active, id]
        );

        if (result.changes === 0) return sendError(res, "Student not found", 404);
        return sendSuccess(res, "Student updated successfully");
    } catch (error) {
        return sendError(res, "Internal Server Error", 500);
    }
};


export const patchStudent = async (req, res) => {
    const { id } = req.params;
    const fields = req.body; 

    if (Object.keys(fields).length === 0) {
        return sendError(res, "No fields provided", 400);
    }

    try {
        const db = await getDbConnection();
        const keys = Object.keys(fields);
        const setClause = keys.map(key => `${key} = ?`).join(', ');
        const values = Object.values(fields);

        const result = await db.run(
            `UPDATE students SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
            [...values, id]
        );

        if (result.changes === 0) return sendError(res, "Student not found", 404);
        return sendSuccess(res, "Student patched successfully");
    } catch (error) {
        return sendError(res, "Internal Server Error", 500);
    }
};


export const deleteStudent = async (req, res) => {
    try {
        const db = await getDbConnection();
        const result = await db.run(
            'UPDATE students SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?', 
            [req.params.id]
        );
        
        if (result.changes === 0) return sendError(res, "Student not found", 404);
        return sendSuccess(res, "Student deactivated successfully");
    } catch (err) {
        return sendError(res, "Internal Server Error", 500);
    }
};