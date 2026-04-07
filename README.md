# Personal Digital Space — Backend

This is the backend for my Personal Digital Space website. It handles form submissions for newsletter subscriptions, contact messages, and collaboration requests.

---

## 🚀 Features

- 📩 Newsletter subscription (email storage + duplicate prevention)
- 📬 Contact form handling
- 🤝 Work With Us / Collaboration submissions
- 📁 File upload support (resume)
- 🗄️ MongoDB database integration
- ⚡ REST API built with Express
- 🔄 Auto-restart with Nodemon
- 🌐 Ready for deployment (Render)

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Multer (file uploads)
- CORS
- Dotenv

---

## 📁 Project Structure

backend/
├── config/
├── controllers/
├── models/
├── routes/
├── uploads/
├── server.js
├── package.json
├── .env


---

## 📡 API Endpoints

### Newsletter POST /api/newsletter

### Contact POST /api/contact

### Work With Us POST /api/work-with-us

### Admin (View all data) GET /api/admin/data


---

## ✨ Future Improvements

- Email notifications (Nodemailer)
- Authentication for admin dashboard
- Cloud storage for resumes (AWS S3)
- Rate limiting and spam protection

---

## 👤 Author

Rajesh Pathak

