# 📚 Library Management API

A simple Node.js + Express + Mongoose REST API for managing books and borrowing records.  
Built with TypeScript and validated using Zod.

---

## 🚀 Features

- Create, update, and filter books
- Borrow books with quantity and due date
- Aggregated summary of borrowed books (total quantity per book)
- Input validation using Zod
- MongoDB & Mongoose with timestamps and references

---

## 🛠️ Tech Stack

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Zod](https://zod.dev/) for validation

---

## 📂 Project Structure

app/
├─ models/
│ ├─ book.model.ts
│ └─ borrow.model.ts
├─ controllers/
│ ├─ book.controller.ts
│ └─ borrow.controller.ts
├─ types/
│ ├─ book.type.ts
│ └─ borrow.type.ts
├─ app.ts
└─ server.ts


---

## ⚙️ Setup & Installation

1. **Clone the repository**

```bash
git clone https://github.com/sajib689/assignment-3-L2.git
cd assignment-3-L2


---

npm install
PORT=5000
MONGO_URI=mongodb://localhost:27017/library

Run Command:
npm run dev

npm run build && npm start


📝 API Endpoints

Base URL: http://localhost:5000/api

1️⃣ Create Book

POST /api/books

{
  "title": "The Midnight Library",
  "author": "Matt Haig",
  "genre": "Fiction",
  "isbn": "978-1-23456-789-0",
  "description": "A story about choices, regrets, and what could have been.",
  "copies": 12,
  "available": true
}
Response:
{
  "success": true,
  "message": "Book created successfully",
  "data": { ... }
}


2️⃣ Get Books (Filter + Sort + Limit)

GET /api/books?filter=Fiction&sortBy=createdAt&sort=desc&limit=5

filter = genre (case-insensitive)

sortBy = field to sort by (e.g., createdAt)

sort = asc or desc

limit = max number of results

Response:
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [ ... ]
}


3️⃣ Update Book

PUT /api/books/:bookId

Request body must include all required fields:
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "Self-Help",
  "isbn": "978-1-073-52164-2",
  "description": "An easy and proven way to build good habits and break bad ones.",
  "copies": 20,
  "available": true
}


Response:
{
  "success": true,
  "message": "Book updated successfully",
  "data": { ... }
}


4️⃣ Borrow a Book

POST /api/borrow

Request body:
{
  "book": "68dab9c1af71d80975878b04",
  "quantity": 1,
  "dueDate": "2025-10-01T00:00:00.000Z"
}


Response:
{
  "success": true,
  "message": "Borrow record created successfully",
  "data": { ... }
}


5️⃣ Borrowed Books Summary (Aggregation)

GET /api/borrow

Returns total borrowed quantity per book with book title & ISBN.

Response:

{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}

🧪 Validation

All requests are validated with Zod. Invalid input returns:
{
  "success": false,
  "message": "Validation errors",
  "errors": [
    {
      "field": "copies",
      "message": "Copies must be a positive number"
    }
  ]
}
