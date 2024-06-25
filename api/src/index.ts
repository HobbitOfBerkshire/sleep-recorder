import express from 'express';
import cors from 'cors';
import recordsRouter from './routes/records';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/records', recordsRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
