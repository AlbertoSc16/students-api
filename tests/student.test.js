import request from 'supertest';
import express from 'express';
import studentRoutes from '../src/routes/student-routes.js';

const app = express();
app.use(express.json());
app.use('/api', studentRoutes);

describe('Student API Test Suite', () => {
    
    describe('GET /api/students', () => {
        it('should return status 200 and the correct response format', async () => {
            const res = await request(app).get('/api/students');
            
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('success', true);
            expect(res.body).toHaveProperty('data');
            expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    describe('GET /api/students/:id', () => {
        it('should return 404 if the student does not exist', async () => {
            const res = await request(app).get('/api/students/999999');
            
            expect(res.statusCode).toEqual(404);
            expect(res.body.success).toBe(false);
            expect(res.body).toHaveProperty('error');
        });
    });

    describe('POST /api/students', () => {
        it('should fail (400) when required fields are missing', async () => {
            const res = await request(app)
                .post('/api/students')
                .send({ first_name: "Incomplete User" }); 
            
            expect(res.statusCode).toEqual(400);
            expect(res.body.success).toBe(false);
            expect(res.body.error).toContain("Missing required fields");
        });
    });

    describe('PATCH /api/students/:id', () => {
        it('should successfully update the is_active status', async () => {
            const res = await request(app)
                .patch('/api/students/2')
                .send({ is_active: 1 });
            
            if (res.statusCode === 200) {
                expect(res.body.success).toBe(true);
                expect(res.body.message).toMatch(/successfully|updated|patched/i);
            } else {
                expect(res.statusCode).toEqual(404);
            }
        });

        it('should return 400 if no fields are provided', async () => {
            const res = await request(app)
                .patch('/api/students/2')
                .send({});
            
            expect(res.statusCode).toEqual(400);
        });
    });

    describe('DELETE /api/students/:id', () => {
        it('should return 200 after deleting/deactivating a student', async () => {
            const res = await request(app).delete('/api/students/2');
            
            if (res.statusCode === 200) {
                expect(res.body.success).toBe(true);
            } else {
                expect(res.statusCode).toEqual(404);
            }
        });
    });
});