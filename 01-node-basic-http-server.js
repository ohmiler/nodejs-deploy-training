// 1. นำเข้าโมดูล http
const http = require('http');

// 2. กำหนดพอร์ต (Port) ที่เซิร์ฟเวอร์จะรับฟัง
const PORT = 3000; // หรือพอร์ตอื่นที่คุณต้องการ เช่น 8080

// 3. สร้างเซิร์ฟเวอร์
const server = http.createServer((req, res) => {
  // `req` (request) คือ ออบเจกต์ที่เก็บข้อมูลของคำขอที่เข้ามาจาก Client
  // `res` (response) คือ ออบเจกต์ที่เราใช้ส่งการตอบกลับไปยัง Client

  // ตั้งค่า HTTP Header
  // Content-Type: กำหนดประเภทของข้อมูลที่เราจะส่งกลับไป (text/plain หมายถึงข้อความธรรมดา)
  // Status Code: 200 OK หมายถึงการตอบกลับสำเร็จ
  res.writeHead(200, { 
    'Content-Type': 'text/plain' 
  });

  // ส่งข้อมูล "Hello, World!" กลับไปยัง Client
  res.end('Hello, World from NodeJS Server!');
});

// 4. ให้เซิร์ฟเวอร์เริ่มรับฟังที่พอร์ตที่กำหนด
server.listen(PORT, () => {
  console.log('Server is running...');
});
