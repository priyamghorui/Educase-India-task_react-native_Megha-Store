# 🛍️ React Native Shopping App (Category → Products → Cart)

A simple shopping application built with **React Native** where users can browse product categories, view products, search items, add them to cart, and retain their cart even after the app is closed or restarted.

This project was designed to demonstrate **navigation**, **API handling**, **Redux state management**, **local persistence**, **search**, **pagination**, and **app lifecycle handling** in a clean, scalable way.

---

## 💠 App Functionality

This app contains three main screens:

1. **Categories Screen**

   * Fetches product categories from a public API (https://dummyjson.com)
   * Displays list of categories (Men, Women, Beauty, etc.)
   * Navigates to product list on selection

2. **Products Screen**

   * Fetches products based on selected category
   * Displays large list using `FlatList`
   * Implements **search** by product title
   * Implements **infinite scrolling / pagination (After reaching at end it load 10 more product)** 
   * Allows user to **add products to cart**

3. **Cart Screen**

   * Shows all added items
   * Displays total price
   * Cart data persists even the app in background or killed

---

## 🌐 Public API Used

**Fake Store API**
Base URL: [https://dummyjson.com](https://dummyjson.com)

Used endpoints:

* `/products/category-list`
* `/products?limit=${limit}&skip=${currentSkip}`

---

## 🧭 Navigation Architecture

Built using **React Navigation** with nested navigation:

* Bottom Tab Navigator

  * Home Stack (Categories → Products)
  * Cart Screen

This ensures the cart is always accessible.

---

## 🧠 State Management

State is managed using **Redux Toolkit**.

* `cartProduct`

Redux is also hydrated on app start using persisted storage (@react-native-async-storage/async-storage).

---

## 💾 Local Data Persistence & Lifecycle Handling

Implemented using:

* **AsyncStorage**
* **AppState**

When the app goes to background:

* Redux state is saved to storage

When the app restarts:

* Saved state is restored into Redux

This ensures the cart and data are never lost.

---

## 📁 Folder Structure

```
  Root/
     |
    src/
     ├── navigation/
     │     └── Navigation.tsx
     │
     ├── screens/
     │     ├── homeTab/
     │     |     ├── Home.tsx
     │     |     └── ProductsScreen.tsx
     |     |
     │     └── cartTab/
     │           ├── CartScreen.tsx
     │           └── CheckoutScreen.tsx
     │
     ├── redux/
     │     ├── store/
     │     |     └── store.tsx
     │     ├── action/
     │     |     └── action.tsx
     │     └── reducer/
     │           └── reducer.tsx
     │
     ├── components/
     │     └── carTab/
     │     |     └── EmptyCart.tsx
     │     └── universal/
     │            └── BackButton.tsx
     │
     ├── services/
     │     ├── apiClient.tsx
     │     ├── categoryApi.tsx
     │     └── productApi.tsx
     │
     └── utils/
           └── persistence.tsx
```

This structure keeps the project clean and scalable.

---

## ▶️ How to Run the Project

1. Clone the repository

```
git clone https://github.com/priyamghorui/Educase-India-task_react-native_Megha-Store.git
```

2. Install dependencies

```
npm install
```

3. Run on Android

```
npx run android
```
4. Start Metro bundler

```
npx start
```
> Make sure emulator or device is connected.

---

## ⚙️ Key Technical Decisions

* Used Redux Toolkit for predictable state management
* Separated API layer using Axios service files
* Used nested navigation (Tabs + Stack) for better UX
* Implemented infinite scroll with FlatList for performance
* All datas are not fetch in one time, we fetch first 10 item then
    after user reach at end then load more 10 item. It will give less load in API server
* Implemented search Search functionality without extra API calls
* Used AsyncStorage + AppState for persistence and lifecycle handling
* Screen's and other file other file prefectly organized for scalability
* Organized code inside `src/` for scalability

---

## 🛠️ Improvements With More Time

If given more time, I would:

* Add product detail screen
* Add animations and better UI polish
* Add loading skeletons and error handling UI
* Implement dark mode
* Implement wishlist
* Implement Sign In and Sign Up functionality
* Implement backend for online seller for list item in the app
* Optimize images and caching

---

## ✅ What This Project Demonstrates

This project demonstrates understanding of:

* Clean project architecture
* React Native navigation patterns
* Redux state management
* API separation and handling
* Performance with large lists
* Persistence across app restarts
* Real-world mobile app lifecycle handling

---

### Thank You.
