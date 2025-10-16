import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect } from 'react';
import StatusBarMessage from './components/UI/StatusBarMessage';
import { sendCartData } from './store/cart-slice';
let isInitialRunning = true;
function App() {
  const isCartVisible = useSelector((state) => state.main.isCartVisible);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const statusMessage = useSelector((state) => state.main.statusMessage);

  useEffect(() => {
    if (isInitialRunning) {
      isInitialRunning = false;
      return;
    }

    dispatch(sendCartData(cart));
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
