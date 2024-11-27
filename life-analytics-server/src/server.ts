import express, { Request, Response } from 'express';
import fs from 'fs';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const externalFilePath: string | undefined = process.env.FILE_PATH;

if (!externalFilePath) {
    console.error('FILE_PATH is not set in the environment variables.');
    process.exit(1);
}

// Allow only this origin
app.use(cors({
    origin: 'http://localhost:3000',
}));

// Endpoint to serve the JSON file
app.get('/habit-tracker-data', (req: Request, res: Response) => {
    fs.readFile(externalFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            res.status(500).send('Error reading JSON file');
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
