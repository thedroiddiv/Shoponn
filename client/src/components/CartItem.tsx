import { getImage } from '../data/api/coreApiCalls'
import { CartProduct } from '../data/models/product'
import QuantityInput from './QuantityInput'
import { useContext } from 'react'
import { getTheme } from '../theme/Apptheme'
import { ThemeContext } from '../theme/Context'

interface cartItemProps {
  product: CartProduct;
  preload?: () => void;
  removeFromCart: () => void
  increment: (quantity: number) => void
  decrement: (quantity: number) => void
}

function CartItem({ product, preload, removeFromCart, increment, decrement }: cartItemProps) {

  const { bootstrap } = getTheme(useContext(ThemeContext)[0]);

  return (
    <div className={`card mb-3 ${bootstrap.textColor} ${bootstrap.cardBackground}`}>
      <div className="row g-0">
        <div className="col-md-5">
          <img src={getImage(product._id)} className="img-fluid card-img rounded-start" alt="..." />
        </div>
        <div className="col-md-7">
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <QuantityInput
              quantity={product.quantity}
              increment={inc => increment(inc)}
              decrement={dec => decrement(dec)}
            />
            <button className={`mt-4 btn btn-outline-${bootstrap.cardBtnVarient}`} type="button" onClick={removeFromCart}>Remove From cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
