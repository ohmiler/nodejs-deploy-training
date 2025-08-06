require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

// นำเข้า Book Model ที่เราสร้างไว้
const Book = require('./models/Book');

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('Successfully connected to MongoDB!'))
  .catch(err => console.error('Connection error:', err));

// เพิ่ม express.json() middleware
app.use(express.json());

// เพิ่ม endpoint หน้าแรก
app.get('/', (req, res) => {
    res.send('Welcome to the Book API!');
});

// GET /api/books: ดึงข้อมูลหนังสือทั้งหมด
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find(); // ใช้ .find() จาก Mongoose เพื่อดึงข้อมูลทั้งหมด
    res.json(books);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET /api/books/:id: ดึงข้อมูลหนังสือเล่มเดียวด้วย id
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id); // ใช้ .findById() จาก Mongoose
    if (book) {
      res.json(book);
    } else {
      res.status(404).send('Book not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST /api/books: สร้างหนังสือใหม่
app.post('/api/books', async (req, res) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author
    });
    const savedBook = await newBook.save(); // ใช้ .save() เพื่อบันทึกข้อมูล
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// PUT /api/books/:id: อัปเดตข้อมูลหนังสือ
app.put('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true }); // ใช้ .findByIdAndUpdate()
    if (book) {
      res.json(book);
    } else {
      res.status(404).send('Book not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE /api/books/:id: ลบหนังสือ
app.delete('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id); // ใช้ .findByIdAndDelete()
    if (book) {
      res.status(204).send(); // 204 No Content
    } else {
      res.status(404).send('Book not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
    console.log('Express app is running...');
});

