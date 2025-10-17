import Card from '../UI/Card';
import styles from './ProductItem.module.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

const ProductItem = (props) => {
  // const cart = useSelector((state) => state.cart);

  const { id, title, price, description } = props;
  const dispatch = useDispatch();
  //  Не ЖЕЛАТЕЛЬНО РАЗМЕЩАТЬ СИНХРОННЫЙ КОД В КОМПОНЕНТЕ !!!
  const addItemHandler = () => {
    //   const updatedItemsQuantity = cart.itemsQuantity + 1;
    //   const updatedItems = cart.items.slice();
    //
    //   const existingItem = updatedItems.find((i) => i.id === id);
    //
    //   if (existingItem) {
    //     const updatedExistingItem = { ...updatedItems };
    //
    //     updatedExistingItem.quantity++;
    //     updatedExistingItem.totalPrice = updatedExistingItem.totalPrice + price;
    //
    //     const existingItem = updatedItems.findIndex((i) => i.id === id);
    //     updatedItems[existingItem] = updatedExistingItem;
    //   } else {
    //     updatedItems.push({
    //       id: id,
    //       price: price,
    //       quantity: 1,
    //       totalPrice: price,
    //       title: title
    //     });
    //   }
    //   const udatedCart = {
    //     itemsQuantity: updatedItemsQuantity,
    //     items: updatedItems
    //   };
    //   dispatch(cartActions.updateCart(udatedCart));
    dispatch(cartActions.addItem({ id, title, price }));
  };

  return (
    <li className={styles.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={styles.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={styles.actions}>
          <button onClick={addItemHandler}>Добавить в Корзину</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
