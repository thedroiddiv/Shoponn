import { useContext } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi'
import { getTheme } from '../theme/Apptheme'
import { ThemeContext } from '../theme/Context'

interface QuantityInputProps {
    quantity: number;
    increment: (inc: number) => void;
    decrement: (dec: number) => void;
}

function QuantityInput({ quantity, increment, decrement }: QuantityInputProps) {
    const { bootstrap } = getTheme(useContext(ThemeContext)[0]);

    return (
        <div className={`input-group ${bootstrap.textColor}`}>
            <span>
                <button type="button" className={`btn btn-sm btn-outline-${bootstrap.outlineBtnVarient}`} onClick={e=>decrement(quantity-1)}><HiMinus /></button>
            </span>
            <span className={`border rounded border-${bootstrap.outlineBtnVarient} px-4 mx-2`}>{quantity}</span>
            <span>
                <button type="button" className={`btn btn-sm btn-outline-${bootstrap.outlineBtnVarient}`} onClick={e=>increment(quantity+1)}><HiPlus /></button>
            </span>
        </div>
    )
}

export default QuantityInput
