# 📚 Bookify – Personal Book Management App

Bookify is a full-stack web application that helps users manage their personal reading library.  
Users can add books, track reading status, edit details, and manage their collection securely with authentication.

🔗 **Live App:** https://bookify-tau-plum.vercel.app  
🔗 **GitHub Repo:** https://github.com/Mithivk/Bookify

---

## ✨ Features

### 🔐 Authentication
- User signup & login
- Secure JWT-based authentication
- HTTP-only cookies
- Protected routes
- Logout functionality

### 📖 Book Management
- Add new books
- Edit book details (title, author, tags, status)
- Delete books with confirmation
- Track reading status:
  - Want to Read
  - Reading
  - Completed
- Tags support for categorization

### 📊 Dashboard
- Personalized dashboard
- Real-time statistics:
  - Total books
  - Want to Read
  - Reading
  - Completed
- Status updates instantly reflect in stats

### 🎨 UI & UX
- Clean and responsive UI
- Tailwind CSS styling
- Modal-based edit & delete flows
- Loading indicators
- Client-side and server-side validation

---

## 🛠 Tech Stack

### Frontend
- Next.js 14 (App Router)
- React
- TypeScript
- Tailwind CSS

### Backend
- Next.js API Routes
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

### Deployment
- Vercel
- MongoDB Atlas

---

## 🔌 API Documentation

### Auth APIs

#### `POST /api/auth/signup`
Create a new user account.

**Request Body**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response

201 Created

Sets authentication cookie

POST /api/auth/login

Authenticate existing user.

Request Body

{
  "email": "john@example.com",
  "password": "password123"
}

Response

200 OK

Sets authentication cookie

POST /api/auth/logout

Logs out the user.

Response

200 OK

Clears authentication cookie

Book APIs (Protected)
GET /api/books

Fetch all books for the logged-in user.

POST /api/books

Add a new book.

Request Body

{
  "title": "Atomic Habits",
  "author": "James Clear",
  "tags": ["self-help"],
  "status": "READING"
}
PUT /api/books/[id]

Update book details or reading status.

DELETE /api/books/[id]

Delete a book.

🔐 Environment Variables

Create a .env.local file in the project root:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bookify
JWT_SECRET=your_super_secret_key
NODE_ENV=development

▶️ Running Locally
git clone https://github.com/Mithivk/Bookify.git
cd Bookify
npm install
npm run dev

Application runs at:
http://localhost:3000

🚀 Deployment (Vercel)

Push the repository to GitHub

Import the project into Vercel

Add environment variables in Vercel dashboard

Allow MongoDB Atlas IP access (0.0.0.0/0)

Deploy

Live URL:
https://bookify-tau-plum.vercel.app


