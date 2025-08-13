const express = require('express');
const app = express();
const port = 3000;

// เพิ่ม express.json() middleware
app.use(express.json());

// 1. Create mock data
let books = [
  { id: 1, title: 'JavaScript Master', author: 'John Doe' },
  { id: 2, title: 'NodeJS Practical', author: 'John Doe' },
  { id: 3, title: 'ExpressJS Guide', author: 'John Doe' }
];

// 2. Create endpoint สำหรับ CRUD Operations

// GET /api/books: ดึงข้อมูลหนังสือทั้งหมด
app.get('/api/books', (req, res) => {
  res.json(books);
});

// GET /api/books/:id: ดึงข้อมูลหนังสือเล่มเดียวด้วย id
app.get('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
});

// POST /api/books: สร้างหนังสือใหม่
app.post('/api/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /api/books/:id: อัปเดตข้อมูลหนังสือ
app.put('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (book) {
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
});

// DELETE /api/books/:id: ลบหนังสือ
app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  // โค้ดนี้จะวนลูปหาหนังสือ (b) ตัวแรกที่มี id ตรงกับ id ที่เราต้องการลบ
  const index = books.findIndex(b => b.id === id);
  // ถ้า index ไม่เท่ากับ -1 หมายความว่าหาหนังสือเจอ
  if (index !== -1) {
    // method splice() จะทำหน้าที่ลบข้อมูลออกจากอาร์เรย์ 
    // โดย index คือตำแหน่งที่จะเริ่มลบ
    // 1 คือจำนวนสมาชิกที่จะลบ
    books.splice(index, 1);
    res.status(204).send(); // 204 No Content
  } else {
    res.status(404).send('Book not found');
  }
});

app.listen(port, () => {
    console.log('Express app is running...');
});
