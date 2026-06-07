# E-Commerce Platform with Personalized Product Recommendations

## Overview

A full-stack E-Commerce Platform built using the MERN stack that provides a complete online shopping experience for users and powerful management tools for administrators.

The platform includes authentication, product management, shopping cart, wishlist, reviews, coupon management, Stripe payment integration, order tracking, analytics dashboard, low stock alerts, email notifications, and a personalized product recommendation system based on product tags and scoring algorithms.

This project was built as part of my project-based learning journey with the MERN stack, with the goal of gaining practical experience in full-stack development, payment integration, authentication, API design, testing, and deployment workflows

## Features

### User Features

* User Registration and Login
* JWT Authentication
* Product Browsing
* Product Details Page
* Shopping Cart Management
* Wishlist Management
* Product Reviews and Ratings
* Recently Viewed Products
* Personalized Product Recommendations
* Coupon Application
* Stripe Payment Integration
* Order Placement
* Order Tracking
* Order Details View
* Email Notifications

### Admin Features

* Add Products
* Edit Products
* Inventory Management
* Order Management
* Coupon Management
* Analytics Dashboard
* Low Stock Product Alerts

### System Features

* Role-Based Access Control
* RESTful API Architecture
* Swagger API Documentation
* Jest Testing
* Secure Authentication and Authorization

---

## Tech Stack

### Frontend

* React
* Vite
* React Router DOM
* Axios
* React Toastify
* Stripe

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Nodemailer
* Stripe
* Swagger

### Testing

* Jest

---

## Project Structure

```txt
e-commerce-website/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── app.js
│
├── tests/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server.js
├── package.json
└── README.md
```

---

## Project Architecture

Frontend (React + Vite)
↓
REST API (Express.js)
↓
MongoDB Database

Additional Services:

* Stripe Payment Gateway
* Nodemailer Email Service
* Swagger API Documentation

---

## Personalized Recommendation System

The platform includes a custom recommendation engine that recommends products using:

* Product Tags
* Relevance Scoring
* Product Similarity Logic

This helps users discover related products without using machine learning models.

---

## API Documentation

Swagger documentation is available for important API endpoints.

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd e-commerce-website
```

### Backend Setup

```bash
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

### Backend (.env)

```env
PORT=
MONGO_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
EMAIL_USER=
EMAIL_PASS=
NODE_ENV=
```

### Frontend (.env)

```env
VITE_API_URL=
VITE_STRIPE_PUBLISHABLE_KEY=
```

---

## Running Tests

```bash
npm test
```

---

## Future Improvements

* Docker Containerization
* GitHub Actions CI/CD Pipeline
* Advanced Analytics Dashboard
* PDF Invoice Generation
* Product Image Upload Service
* Multi-Vendor Support

---

## Author

Alan Paul John

Project Based Learning – Full Stack E-Commerce Platform
