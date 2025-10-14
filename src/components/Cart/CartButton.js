import styles from './CartButton.module.css';
import { useDispatch } from 'react-redux';
import { mainActions } from '../../store/main-slice';

const CartButton = (props) => {
  const dispatchFunction = useDispatch();

  const cartVisibilityHandler = () => {
    dispatchFunction(mainActions.toggleCartVisibility());
  };

  return (
    <button className={styles.button} onClick={cartVisibilityHandler}>
      <span>Корзина</span>
      <span className={styles.badge}>2</span>
    </button>
  );
};

export default CartButton;
