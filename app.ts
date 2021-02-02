import express from 'express';

const app = express(); 
const PORT = process.env.API_BASE_PORT || 3000;

app.get('/', (req, res) => res.send('Express + TypeScript Server'));

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});