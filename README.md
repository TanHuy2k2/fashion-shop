# 🛍 Fashion Shop Backend (NestJS)

A backend system for a fashion e-commerce platform built with NestJS, TypeScript, and TypeORM.  
This project provides RESTful APIs for user authentication, product management, orders, payments, coupons, and real-time chat features.

---

## 📌 Features

- User authentication & authorization (JWT)
- Admin dashboard management
- Product, category & brand management (CRUD)
- Shopping cart & order processing
- Payment integration (MoMo)
- Coupon & discount management
- Product reviews & ratings
- Real-time chat module
- Shipping & delivery management
- Redis caching
- Modular architecture (NestJS modules)
- Input validation & error handling
- RESTful API design

---

## 🛠 Tech Stack

- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** MySQL
- **ORM:** TypeORM
- **Authentication:** JWT
- **Cache:** Redis
- **Payment:** MoMo API
- **Tools:** Git, Postman
- **Lint & Format:** ESLint, Prettier

---

## 📁 Project Structure

```
src/
├── commons/ # Shared common logic
│ ├── decorators/ # Custom decorators
│ ├── enums/ # Enum definitions
│ ├── guards/ # Authentication & role guards
│ ├── interceptors/ # Request/response interceptors
│ └── pipes/ # Validation & transform pipes
├── constants
├── database/ # Database configuration
│ ├── entities/ # TypeORM entities
│ ├── migrations/ # Database migrations
│ ├── datasource.ts # TypeORM datasource config
│ └── typeorm.config.ts # TypeORM connection config
├── modules/ # Feature modules
│ ├── admin
│ ├── brand
│ ├── cart
│ ├── category
│ ├── chat
│ ├── color
│ ├── coupon
│ ├── coupon-order
│ ├── coupon-user
│ ├── dashboard
│ ├── discount
│ ├── momo
│ ├── order
│ ├── order-detail
│ ├── payment
│ ├── product
│ ├── product-detail
│ ├── product-discount
│ ├── redis
│ ├── review
│ ├── shipping
│ ├── sub-category
│ └── user
├── utils/ # Helper utilities (mail, download image, color, etc.)
│ ├── color.ts
│ ├── downloadImage.ts
│ └── mail.ts
├── app.controller.ts
├── app.controller.spec.ts
├── app.module.ts
├── app.service.ts
├── main.ts
└── test
.env.example
nest-cli.json
package.json
README.md
tsconfig.json
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/TanHuy2k2/fashion-shop.git
cd fashion-shop
npm install
```

🔑 Environment Variables

Create a .env file based on .env.example:

```bash
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=yourpassword
DB_NAME=fashion_shop
JWT_SECRET=your_jwt_secret
REDIS_HOST=localhost
REDIS_PORT=6379
MOMO_API_KEY=your_momo_api_key
PORT=3000
```

▶️ Run the Project

```bash
npm run start:dev
```

Server runs at:

```bash
http://localhost:3000
```

🗄 Database Migration

Run migrations:

```bash
npm run migrate:up
```

Generate migration:

```bash
npm run migrate:generate
```

Revert migration:

```bash
npm run migrate:down
```

🎯 Project Purpose

```bash
This project is built for learning and practicing:
NestJS backend development
Modular architecture
Authentication & authorization
Database design with TypeORM
Payment gateway integration
RESTful API best practices
```

👨‍💻 Author

```bash
Nguyen Tan Huy
GitHub: https://github.com/TanHuy2k2
Email: tanhuyqn6789@gmail.com
```
