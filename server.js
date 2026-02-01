import express from 'express';
import studentRoutes from './src/routes/student-routes.js';

const app = express();
app.use(express.json());


app.use('/api', studentRoutes);

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Server is running correctly');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});