### Project Overview

This project is an e-commerce web application that allows users to browse, filter, sort, and add products to a cart using React, Redux, and Material-UI. The application integrates with an external product API (https://dummyjson.com/products?limit=100) to fetch and display a list of products. The app offers a smooth user experience with sorting, filtering, and cart management features, all without additional API calls for sorting and filtering. 

### Objectives

1. **Display all products**: Fetch and display the product list from the provided API.
2. **Filter products by title & category**: Allow users to search products by title or filter by category.
3. **Sort products by price**: Enable sorting products by price, both from high to low and low to high.
4. **Add to cart functionality**: Allow users to add products to their cart and view the cart icon with the total number of items.
5. **Cart management**: When the cart icon is clicked, redirect users to a cart page displaying the selected products, their individual prices, quantities, and the total sum of all products.
6. **Sort and filter without additional API calls**: Implement sorting and filtering functionalities on the frontend without making repeated API requests.

---

### Technologies Used

1. **React**: Used for building the user interface components.
2. **Redux**: For managing global state, particularly cart and product management.
3. **Material-UI**: Used for styling components and creating a modern UI.
4. **Axios**: Used to handle API requests to fetch the product list.
5. **React-Router**: For navigation and routing between pages such as the product list, cart, and checkout.
6. **React Testing Library & Vitest**: Used for testing the components.

---

### Directory Structure

```bash
src/
├── components/
│   ├── Cart.js                # Cart component to manage and display cart items
│   ├── ProductCard.js          # Displays each product card in the product list
│   ├── ProductList.js          # Displays the product list fetched from the API
├── pages/
│   ├── Home.js                 # Home page that contains the product list, search, sort, and filter functionality
│   ├── Checkout.js             # Checkout page where users can confirm and finalize their order
│   ├── CartPage.js             # Displays cart page with added products and total price
├── redux/
│   ├── store.js                # Redux store configuration
│   ├── cartSlice.js            # Redux slice to manage cart state (add, remove, clear items)
├── App.js                      # Main app component managing routes and structure
├── index.js                    # Entry point for the application
```

---

### Code Explanation

#### 1. **Displaying All Products**

The app fetches products from the API (`https://dummyjson.com/products?limit=100`) using Axios in the `ProductList` component:

```javascript
useEffect(() => {
  axios.get('https://dummyjson.com/products?limit=100')
    .then(response => {
      setProducts(response.data.products);
    })
    .catch(error => console.log(error));
}, []);
```

This API call fetches the product data, which is then stored in local state and displayed using the `ProductCard` component.

#### 2. **Filtering by Title and Category**

The app allows users to filter products by title or category using input fields. This filtering is done client-side without additional API calls.

```javascript
const filteredProducts = products.filter(product => 
  product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
  product.category.toLowerCase().includes(selectedCategory.toLowerCase())
);
```

#### 3. **Sorting Products by Price**

Sorting is handled directly in the `ProductList` component, where users can choose to sort the products in either ascending or descending order:

```javascript
const sortedProducts = [...filteredProducts].sort((a, b) => {
  return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
});
```

#### 4. **Adding to Cart**

The `addToCart` function in the `ProductCard` component dispatches an action to the Redux store to add items to the cart:

```javascript
const handleAddToCart = () => {
  dispatch(addToCart(product));
};
```

This adds the selected product to the cart slice of the Redux store, which also updates the cart count in the header.

#### 5. **Cart Management and Display**

When users click the cart icon, they are redirected to the cart page where all selected items are displayed. The cart page shows the individual product details, quantities, and total price by summing up the prices of all items:

```javascript
const getTotalPrice = () => {
  return cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
};
```

#### 6. **Sorting and Filtering Without API Call**

The sorting and filtering logic is handled entirely on the client side. After fetching the products from the API, the data is stored in local state, and all subsequent filtering and sorting operations are done on this local state. This improves performance and avoids unnecessary network requests.

---

### Conclusion

This e-commerce web app provides a seamless shopping experience by integrating essential features such as product display, filtering, sorting, and cart management. With client-side filtering and sorting, the application minimizes unnecessary API calls, improving responsiveness. The Redux state management ensures that the cart functionality is consistent throughout the application, while Material-UI delivers a polished, modern UI.

The use of best practices such as breaking down components, using state management with Redux, and handling routing effectively via React Router makes the codebase scalable and maintainable. The project meets the core objectives and showcases how to build a functional e-commerce app with modern web development tools and techniques.

---

### Key Features Recap

- **Product display with search, filter, and sort capabilities**
- **Cart management with item count and total price calculation**
- **Responsive and modern UI using Material-UI**
- **Client-side operations for sorting and filtering**
- **Persistent global state using Redux**
- **Seamless routing and navigation across pages**

This project serves as a robust foundation for building larger e-commerce applications by incorporating efficient frontend development practices and maintaining a user-friendly experience.