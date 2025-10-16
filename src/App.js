import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const isCartVisible = useSelector((state) => state.main.isCartVisible);
  // Слушаем и проверяем состояние корзины и если были изменения тогда выполняем запрос на сервер (это можно сделать и в компоненте ProductItem.js )
  // НО ВАЖНО МЫ НЕ МОЖЕМ ЭТО ДЕЛАТЬ В reducers -> addItem !!!

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    fetch(
      'https://react-cours-http-3ee12-default-rtdb.firebaseio.com/cart.json',
      {
        method: 'PUT',
        body: JSON.stringify(cart)
      }
    );
  }, [cart]);

  return (
    <Layout>
      {isCartVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
