# Fresh Grocery App 🍎

A React Native mobile application for browsing fresh groceries, managing a shopping cart, and simulating a checkout process. The app uses **Firebase** for backend services (Authentication and Database).

## 📋 Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Firebase Configuration](#firebase-configuration)
- [Architecture & Logic](#architecture--logic)
  - [Authentication](#authentication)
  - [Firestore Data Structure](#firestore-data-structure)
  - [Inventory Management](#inventory-management)
- [Assumptions & Limitations](#assumptions--limitations)

## ✨ Features
- **User Authentication:** Sign up, Sign in, signin with google.
- **Product Browsing:** View popular items and filter via an expanded search view.
- **Product Details:** Detailed view of products with price, description, and rating.
- **Shopping Cart:** Add items, adjust quantities, and remove items.

## 🛠 Prerequisites
- Node.js
- npm
- Expo CLI
- Expo Go app on a physical device.

Here is the **Installation & Setup** section.

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shashi230620/Booking-App.git
   cd Booking-App
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   npx expo run:android
   ```

4. **Launch:**
   - Scan the QR code with your phone (Expo Go).
   - Make sure your mobile phone has usb debugging turned on.

## 🔥 Firebase Configuration

This app requires a Firebase project with **Authentication** and **Firestore** enabled.

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com/).
2. Enable **Authentication** (Email/Password provider).
3. Enable **Cloud Firestore** (Start in Test Mode for development).
4. Create a file named `firebaseConfig.ts` in the `@/Services/` directory.
5. Paste your credentials:

```ts
// @/Services/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```


## 🧠 Architecture & Logic

### Authentication
Authentication is handled via **Firebase Auth**.
- **State Management:** An `AuthContext` wraps the application. It uses an `onAuthStateChanged` listener to detect if a user is logged in or out.
- **Navigation Flow:** The `AppNavigator` listens to the `user` state.
  - If `user` exists: Renders the **Main Stack** (Home, Details, Cart).
  - If `user` is null: Renders the **Auth Stack** (Login, Signup).

### Firestore Data Structure
The app relies on a collection named `products`.

**Collection:** `products`
**Document Structure:**
```json
{
  "id": "auto-generated-or-custom-id",
  "name": "Avocado",
  "price": 12.00,
  "description": "Fresh organic avocados.",
  "category": "Fruits",
  "imageUrl": "https://example.com/avocado.png",
  "rating": 4.5,
  "stock": 10,
  "unit": "kg"
}
```

## ⚠️ Assumptions & Limitations

1. **Search Logic:** Search filtering is performed client-side on the fetched dataset. For very large datasets, this should be moved to a backend Algolia/Firestore query.
2. **Data Entry:** The app assumes the Firestore database is pre-populated with products. If the database is empty, the app displays a "No products found" message.
