"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
const externalFilePath = process.env.JSON_FILE_PATH;
if (!externalFilePath) {
    console.error('FILE_PATH is not set in the environment variables.');
    process.exit(1); // Exit if the file path is not provided
}
// Endpoint to serve the JSON file
app.get('/habit-tracker-data', (req, res) => {
    fs_1.default.readFile(externalFilePath, 'utf8', (err, data) => {
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
