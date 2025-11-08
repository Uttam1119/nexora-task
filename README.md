# 🛒 Mock E-Commerce Cart (Full-Stack Assignment)

A simple full-stack **E-Commerce Shopping Cart** built using **React**, **Node.js/Express**, and **MongoDB**.  
It allows users to browse products, add/remove items from the cart, and perform a mock checkout process that generates a receipt.

---

## 🚀 Features

- _Add to Cart / Remove from Cart_
- _Automatic Total Calculation_
- _Mock Checkout & Receipt Generation_
- _User Info Collection (Name, Email)_
- _Input Validation & Error Handling_
- _Persistent Data with MongoDB_

---

## 🧱 Tech Stack

### Frontend

- _React.js (Vite)_
- _Axios_ for API communication
- _TailwindCSS_ for UI styling

### Backend

- _Node.js + Express.js_
- _MongoDB + Mongoose_

---

## ⚙️ Project Structure

```

nexora-task/
├── backend/
│   ├── confiig/
│   │   ├── db.js
│   ├── models/
│   │   ├── Product.js
│   │   ├── CartItem.js
│   │   └── Receipt.js
│   ├── controllers/
│   │   ├── cartController.js
│   │   ├── checkoutController.js
│   │   └── productController.js
│   ├── routes/
│   │   ├── cartRoutes.js
│   │   ├── productRoutes.js
│   │   └── checkoutRoutes.js
│   ├── scripts/
│   │   ├── seedProducts.js
│   ├── seed.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api.js
│   │   ├── components/
│   │   │   ├── Cart.jsx
│   │   │   ├── ProductList.jsx
│   │   │   └── Checkout.jsx
│   │   └── App.jsx
│   │   └── App.css
│   │   └── index.css
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js
└── README.md

```

---

## 🧩 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/uttam1119/nexora-task.git
cd nexora-task
```

---

### 2️⃣ Setup the Backend

```bash
cd backend
npm install
```

#### Create `.env` file

```bash
MONGO_URI=mongodb://127.0.0.1:27017/mock-ecom-cart
PORT=4000
```

#### Run the backend server

```bash
npm start
```

By default, the backend runs on [http://localhost:4000](http://localhost:4000)

---

### 3️⃣ Setup the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs by default on [http://localhost:5173](http://localhost:5173)

---

## 🧠 API Endpoints

### 🛍️ **Products**

| Method | Endpoint        | Description                  |
| ------ | --------------- | ---------------------------- |
| GET    | `/api/products` | Fetch all available products |

### 🛒 **Cart**

| Method | Endpoint        | Description                |
| ------ | --------------- | -------------------------- |
| GET    | `/api/cart`     | Get all cart items         |
| POST   | `/api/cart`     | Add a product to cart      |
| PUT    | `/api/cart/:id` | Update a cart item         |
| DELETE | `/api/cart/:id` | Remove a product from cart |

### 💳 **Checkout**

| Method | Endpoint        | Description                                    |
| ------ | --------------- | ---------------------------------------------- |
| POST   | `/api/checkout` | Perform checkout, generate receipt, clear cart |

**Example Checkout Payload:**

```json
{
  "name": "Uttam Kumar",
  "email": "uttam@gmail.com",
  "userId": "guest_user"
}
```

**Sample Response:**

```json
{
  "receipt": {
    "id": "672e3f5e9c4e8b6b1284b01d",
    "name": "Uttam Kumar",
    "email": "uttam@example.com",
    "total": 1200,
    "timestamp": "2025-11-07T18:25:43.511Z"
  }
}
```

---

## 🧾 Mock Checkout Flow

1. User adds products to the cart.
2. Opens the **Checkout Page**.
3. Fills in **Name** and **Email**.
4. Clicks **“Complete Checkout”**.
5. A **Receipt** is generated and saved in MongoDB.
6. The cart is cleared after successful checkout.

---

## ⚡ Error Handling

- **Empty Cart Prevention** — checkout not allowed if cart is empty.
- **Form Validation** — name & email required and validated.
- **Graceful API Failures** — returns descriptive error messages.
- **Cleanup** — cart is cleared only after successful receipt creation.

---
