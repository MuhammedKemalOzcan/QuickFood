import React, { useEffect } from 'react'
import productsData from "../data.json"
import cartIcon from "../assets/images/icon-add-to-cart.svg"
import minus from "../assets/images/icon-decrement-quantity.svg"
import plus from "../assets/images/icon-increment-quantity.svg"

function Products({ addToCart, products, setProducts }) {
  useEffect(() => {
    if (products.length === 0) {
      setProducts(productsData); // İlk yükleme sırasında ürün listesini ayarlıyoruz.
    }
  }, [setProducts, products.length]);

  const handleAddToCart = (index) => {
    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, isAdded: true } : product
    );
    setProducts(updatedProducts);
    const updatedProduct = updatedProducts[index];
    addToCart(updatedProduct);
  };

  const handleQuantity = (index, amount) => {
    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, quantity: product.quantity + amount } : product
    );
    setProducts(updatedProducts);
    const updatedProduct = updatedProducts[index];
    addToCart(updatedProduct);
  };

  return (
    <div>
      <p className='text-start font-bold text-3xl mb-4'>Desserts</p>
      <div className='max-sm:flex flex-col gap-4 grid-cols-1 xl:grid grid-cols-3 flex items-start'>
        {products.map((p, index) => (
          <div key={index}>
            <div className='flex flex-col justify-center'>
              <img src={p.image.mobile} className=' border rounded-2xl' />
            </div>
            <div className='relative top-8 flex items-end justify-center h-0'>
              {p.isAdded ? (
                <div>
                  <div className='border-gray-500 border rounded-3xl p-3 bg-orange-600 flex items-center' role='button'>
                    <button className='mx-4' onClick={() => handleQuantity(index, -1)} disabled={p.quantity === 1}>
                      <img src={minus} />
                    </button>
                    <span className='mx-4 text-white'>{p.quantity}</span>
                    <button className='mx-4' onClick={() => handleQuantity(index, 1)}>
                      <img src={plus} />
                    </button>
                  </div>
                </div>
              ) : (
                <button className='border-gray-500 border rounded-3xl p-3 bg-white flex items-center' onClick={() => handleAddToCart(index)}>
                  <img className="mx-2" src={cartIcon} />
                  <p className="mx-2">Add to Cart</p>
                </button>
              )}
            </div>
            <div className='text-left mt-12'>
              <p className='text-gray-400'>{p.category}</p>
              <p className='font-bold'>{p.name}</p>
              <p className='text-orange-600 font-bold mb-8'>${p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
