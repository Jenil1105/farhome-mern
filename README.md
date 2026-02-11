# FarHome - Travel Listing Platform (Airbnb-Inspired)

FarHome is a full-stack travel listing platform built using Node.js, Express, and MongoDB, following a clean MVC architecture. The application enables users to create, manage, and explore travel listings with authentication, reviews, image uploads, and interactive map visualization.

The project is deployed on Render.

---

## Live

Live Application: https://farhome-mern.onrender.com/listings

hosted on Render free tier, the first load may take a few seconds.

---

## Architecture

The application follows the **MVC (Model–View–Controller)** pattern:

- **Models** → Mongoose schemas (Listing, Review, User)
- **Controllers** → Business logic & request handling
- **Routes** → RESTful route definitions
- **Views** → Server-rendered EJS templates
- **Public** → Static assets (CSS, JS, Map logic)
- **Middleware** → Authentication, authorization, validation

---

## Core Features

- RESTful CRUD operations for travel listings
- User authentication (Signup/Login/Logout)
- Role-based authorization (owner-restricted updates & deletes)
- Reviews and rating system
- Cloud-based image upload (Cloudinary + Multer)
- Map-based location visualization (Geoapify API)
- Server-side validation using Joi
- Flash messaging for user feedback
- Session persistence using MongoDB-backed sessions
- Deployed production build on Render

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication & Security
- Passport.js (Local Strategy)
- passport-local-mongoose
- express-session
- connect-mongo
- Joi

### File Handling
- Multer
- Cloudinary
- multer-storage-cloudinary

### Frontend
- EJS
- EJS-Mate
- Bootstrap
- HTML, CSS, JavaScript

### APIs & External Services
- Geoapify Maps API
- node-fetch

### Deployment
- Render

---

## Local Setup

### 1. Clone Repository

```bash
git clone https://github.com/Jenil1105/farhome-mern.git
cd farhome-mern
```
2. Install Dependencies
```bash
npm install
```
3. Configure Environment Variables

Create a .env file in the root directory:
```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret

MAP_API_KEY=your_geoapify_key

DB_URL=your_mongodb_connection_string
SESSION_SECRET=your_secret
```
4. Run Application
```bash
node app.js

```
   For development:
```bash
npx nodemon app.js
```
