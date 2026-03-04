# 📝 Postly 

**Postly**, a social media app built with **Node.js**, **Express**, and **MongoDB**.  
Supports user authentication, profile management, and post creation.

---

## 🚀 Features

- **Authentication:** Signup, login, logout, JWT-based sessions, profile management  
- **Posts:** Create, read, update, delete posts (with optional image upload)  
- **File Uploads:** Profile and post images handled via Cloudinary  

---

## 🛠️ Tech Stack

- **Node.js** & **Express** – Backend server  
- **MongoDB** & **Mongoose** – Database & ORM  
- **JWT** – Authentication  
- **Multer** – File uploads  
- **Cloudinary** – Image hosting  
- **dotenv** – Environment variables  

---

## ⚡ Installation

1. **Clone the repo**
```bash
git clone https://github.com/Sarun-shakya/postly.git
cd postly
```
2. **Setup .env variables**
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
3. **Install the dependencies**
```bash
npm install
```
4. **Run the server**
```bash
npm run dev
```
