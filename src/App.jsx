import './App.css'
import Cart from './components/Cart'
import Products from './components/Products'
import { useState } from 'react';

function App() {

  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]); // Ürünlerin listesini burada tutuyoruz.

  const handleAddOrUpdate = ((updatedProduct) => {
    setCartItems((prevItems) => {
        // cart içinde zaten bu ürün var mı kontrol etmek için mevcut cartItem'ların listesini tarıyoruz eğer isim uyarsa cart içerisindeki indexini yoksa -1 döndürür
      const selectedItemIndex = prevItems.findIndex((item) => item.name === updatedProduct.name); 
      // Eğer ürün sepette zaten varsa, selectedItemIndex >= 0 olacaktır; eğer yoksa, -1 dönecektir
      if (selectedItemIndex >= 0) {
        const updatedCartItem = [...prevItems];  // Güncellenmiş cartItem listesi oluşturmak için mevcut cartItem'ları kopyalıyoruz
        updatedCartItem[selectedItemIndex] = updatedProduct; // Sepetteki bu ürünün verisini güncelliyoruz
        return updatedCartItem;
      } else {
        return [...prevItems, updatedProduct]; // Ürün sepette değilse, sepetteki mevcut ürünlere yeni ürünü ekliyoruz
      }
    })
  });

  const handleRemoveFromCart = (name) => {
    // Ürünü sepetten çıkarırken Products listesinde de `isAdded` durumunu güncelliyoruz.
    //filter metoduyla ürünün adına göre arama yapıp o ada sahip olmayanları cartItems'a setliyoruz.
    setCartItems((prevItems) => prevItems.filter((item) => item.name !== name));

    //daha sonrasında products'ın isAdded durumunu false, quantity'sini ise 1 yaparak butonun eski haline dönmesini sağlıyoruz.
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.name === name ? { ...product ,quantity: 1 ,isAdded: false } : product
      )
    );
  };

  return (
    <div className='xl:flex'>
      <Products addToCart={handleAddOrUpdate} products={products} setProducts={setProducts} />
      <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
    </div>
  )
}

export default App
