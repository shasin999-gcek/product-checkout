import { useEffect, useState } from 'react';

function QuantityInput({ initialQuantity, onQuantityChange }) {
  const [quantity, setQuantity] = useState(initialQuantity? initialQuantity: 0);

  function addQuantity(e) {
    setQuantity(quantity + 1);
  }

  function decrementQuantity(e) {
    setQuantity((quantity) => {
      return quantity > 0? quantity - 1: quantity;
    });
  }

  function handleChange(e) {
    setQuantity(e.target.value);
  }

  useEffect(() => {
    onQuantityChange(quantity);
  }, [quantity])

  return (
    <div className="number">
      <span className="minus" onClick={decrementQuantity}><i className="fa fa-minus-circle fa-3"></i></span>
      <input type="number" value={quantity} onChange={handleChange}/>
      <span className="plus" onClick={addQuantity}><i className="fa fa-plus-circle fa-3"></i></span>
    </div>
  )
}


export default QuantityInput;