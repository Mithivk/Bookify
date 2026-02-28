# 📚 Bookify – Personal Book Management App

Bookify is a full-stack web application that helps users manage their personal reading library.
Users can add books, track reading status, edit details, and manage their collection securely with authentication.

🔗 **Live App:** https://bookify-tau-plum.vercel.app
🔗 **GitHub Repo:** https://github.com/Mithivk/Bookify

---

## ✨ Features

### 🔐 Authentication
- User signup & login with secure JWT-based authentication
- HTTP-only cookies for token storage
- Protected routes with automatic redirects
- Logout functionality

### 📖 Book Management
- Add, edit, and delete books
- Track reading status: `Want to Read` · `Reading` · `Completed`
- Tags support for categorization
- Delete confirmation flow

### 📊 Dashboard
- Personalized dashboard with real-time statistics
- Stats update instantly on status change:

| Stat | Description |
|------|-------------|
| Total Books | All books in your library |
| Want to Read | Books queued up |
| Reading | Currently in progress |
| Completed | Finished reads |

### 🎨 UI & UX
- Clean, responsive UI with Tailwind CSS
- Modal-based edit & delete flows
- Loading indicators
- Client-side and server-side validation

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router), React, TypeScript, Tailwind CSS |
| Backend | Next.js API Routes, MongoDB Atlas, Mongoose |
| Auth | JWT, bcryptjs, HTTP-only Cookies |
| Deployment | Vercel, MongoDB Atlas |

---

## 🔌 API Reference

### Auth

#### `POST /api/auth/signup`
Create a new user account.

**Request Body**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `201 Created` — Sets authentication cookie

---

#### `POST /api/auth/login`
Authenticate an existing user.

**Request Body**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `200 OK` — Sets authentication cookie

---

#### `POST /api/auth/logout`
Logs out the current user.

**Response:** `200 OK` — Clears authentication cookie

---

### Books (Protected Routes)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/books` | Fetch all books for the logged-in user |
| `POST` | `/api/books` | Add a new book |
| `PUT` | `/api/books/[id]` | Update book details or reading status |
| `DELETE` | `/api/books/[id]` | Delete a book |

#### `POST /api/books` — Request Body
```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "tags": ["self-help"],
  "status": "READING"
}
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bookify
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

---

## ▶️ Running Locally
```bash
git clone https://github.com/Mithivk/Bookify.git
cd Bookify
npm install
npm run dev
```

App runs at **http://localhost:3000**

---

## 🚀 Deploying to Vercel

1. Push the repository to GitHub
2. Import the project at [vercel.com](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Allow all IPs in MongoDB Atlas Network Access (`0.0.0.0/0`)
5. Deploy

**Live URL:** https://bookify-tau-plum.vercel.app