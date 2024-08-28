import express from 'express';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 5000;



// Sample data
const items = [
    'Baisakh',
    'Jestha',
    'Ashad',
    'Shrawan',
    'Bhadra',
    'Aswin',
    'Kartik',
    'Mangsir',
    'Poush',
    'Magh',
    'Falgun',
    'Chaitra'
];

app.use(cors({
     origin: 'https://frontend-cvt8.onrender.com',
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type'] 
}));
app.use(express.json());

app.get('/items', (req, res) => {
    res.json(items);
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
