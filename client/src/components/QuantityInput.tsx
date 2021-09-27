import { HiMinus, HiPlus } from 'react-icons/hi'


interface QuantityInputProps {
    quantity: number;
    increment: (inc: number) => void;
    decrement: (dec: number) => void;
}

function QuantityInput({ quantity, increment, decrement }: QuantityInputProps) {
    return (
        <div className="input-group">
            <span>
                <button type="button" className="btn btn-outline-secondary" onClick={e=>increment(quantity-1)}><HiMinus /></button>
            </span>
            <span className="border rounded border-secondary px-4 mx-2">{quantity}</span>
            <span>
                <button type="button" className="btn btn-outline-secondary" onClick={e=>decrement(quantity+1)}><HiPlus /></button>
            </span>
        </div>
    )
}

export default QuantityInput
