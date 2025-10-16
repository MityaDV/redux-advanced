import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { mainActions } from './store/main-slice';
import StatusBarMessage from './components/UI/StatusBarMessage';
let isInitialRunning = true;
function App() {
  const isCartVisible = useSelector((state) => state.main.isCartVisible);
  // Слушаем и проверяем состояние корзины и если были изменения тогда выполняем запрос на сервер (это можно сделать и в компоненте ProductItem.js )
  // НО ВАЖНО МЫ НЕ МОЖЕМ ЭТО ДЕЛАТЬ В reducers -> addItem !!!

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const statusMessage = useSelector((state) => state.main.statusMessage);

  useEffect(() => {
    const sendCardData = async () => {
      dispatch(
        mainActions.showStatusMessage({
          status: 'pending',
          title: 'Sending Data',
          message: 'Sending Data Cart...'
        })
      );
      const res = await fetch(
        'https://react-cours-http-3ee12-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart)
        }
      );

      if (!res.ok) {
        throw new Error('Failed to fetch cart data.');
      }

      // const resDate = await res.json();

      dispatch(
        mainActions.showStatusMessage({
          status: 'success',
          title: 'Data Sent Successfully',
          message: 'Cart data sent!'
        })
      );
    };

    if (isInitialRunning) {
      isInitialRunning = false;
      return;
    }

    sendCardData().catch((err) => {
      dispatch(
        mainActions.showStatusMessage({
          status: 'error',
          title: 'Error Sendining Data',
          message: 'Failed to fetch cart data.'
        })
      );
    });
  }, [cart]);

  return (
    <Fragment>
      {statusMessage && (
        <StatusBarMessage
          status={statusMessage.status}
          title={statusMessage.title}
          message={statusMessage.message}
        />
      )}
      <Layout>
        {isCartVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
