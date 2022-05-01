import { useEffect, useState, forwardRef, useImperativeHandle } from "react";

const INVALID = 'INVALID';
const VALID = 'VALID';
const MIN_ORDER_REQUIRED = 'MIN_ORDER_REQUIRED';

const AddPromoCode = forwardRef(({ promoCodes, orderSubtotal, onPromoCodeApplied }, ref) => {
  const [promocode, setPromocode] = useState('');
  const [minOrder, setMinOrder] = useState('');
  const [statusType, setStatusType] = useState(INVALID);
  const [showStatus, setShowStatus] = useState(false);

  function handleOnChange(e) {
    setPromocode(e.target.value);
  }

  function handleOnBtnClick(e) {
    const found = promoCodes.find(e => e.code === promocode);
    setShowStatus(true);
    if(found && parseFloat(orderSubtotal) > found.minimumOrder) {
      setStatusType(VALID);
      setMinOrder(found.minimumOrder);
      onPromoCodeApplied(promocode);
    } 
    else if(parseFloat(orderSubtotal) < found.minimumOrder) {
      setStatusType(MIN_ORDER_REQUIRED);
      setMinOrder(found.minimumOrder);
    } 
    else {
      setStatusType(INVALID);
    }
  }

  // function resetForm() {
  //   setPromocode('');
  //   setMinOrder('');
  //   setShowStatus(false);
  //   setStatusType(INVALID);
  // };

  useImperativeHandle(ref, () => ({
    resetForm() {
      setPromocode('');
      setMinOrder('');
      setShowStatus(false);
      setStatusType(INVALID);
    }
  }))

  return (
    <div className="p-4">
      <p className="font-italic mb-4">If you have a promo code, please enter it in the box below</p>
      <div className="input-group mb-4 border rounded-pill p-2">
        <input 
          type="text" 
          placeholder="Apply promocode"
          className="form-control border-0" 
          value={promocode}
          onChange={handleOnChange} />
        <div className="input-group-append border-0">
          <button 
            type="button" 
            className="btn btn-dark px-4 rounded-pill"
            onClick={handleOnBtnClick}>
              <i className="fa fa-gift mr-2"></i>
            Apply promocode
          </button>
        </div>
      </div>
      { showStatus && statusType === INVALID && <p className="text-danger">Invalid promo code</p> }
      { showStatus && statusType === VALID && <p className="text-success">Promo code applied</p> }
      { showStatus && statusType === MIN_ORDER_REQUIRED && <p className="text-success">Please order for above {minOrder}</p> }
    </div>
  )
})

export default AddPromoCode;