import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
//Controllers
import { ExtensionController } from './controllers/getextensions.controller';

//Consts
const app = express();
const PORT = process.env.PORT ?? 3127;
const extensionsController = new ExtensionController();

//App settings
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (_req: Request, res: Response) => {
  console.log('Testing---');
  res.send('API is working!');
});

app.get('/', (_req: Request, res: Response) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'home') });
});

app.get(
  '/extensions/:owner/:repo',
  extensionsController.getExtensions.bind(extensionsController),
);

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
