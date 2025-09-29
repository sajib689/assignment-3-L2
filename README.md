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
