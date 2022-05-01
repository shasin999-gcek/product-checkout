import logo from './logo.svg';
import './App.css';
import ProductList from './components/ProductList';
import OrderSummary from './components/OrderSummary';
import AddPromoCode from './components/AddPromoCode';
import { useState, useEffect, useRef } from 'react';

function App() {
  const productList = [
    {
      id: 'mss',
      name: 'Managed Security Services',
      rate: 2549.99,
      quantity: 0
    },
    {
      id: 'e&i',
      name: 'Engineering & integration',
      rate: 1025.50,
      quantity: 0
    },
    {
      id: 'training',
      name: 'Training',
      rate: 100,
      quantity: 0
    }
  ];

  const promoCodes = [
    {
      code: 'RRD4D32',
      discountPercentage: 10,
      minimumOrder: 5000
    },
    {
      code: '44F4T11',
      discountPercentage: 15,
      minimumOrder: 10000
    }
  ];

  const [cart, setCart] = useState([]);
  const [appliedPromoCode, setAppliedPromoCode] = useState({});
  const [discountRate, setDiscountRate] = useState(0);
  const [ordersList, setOrdersList] = useState([]);
  const [orderSubtotal, setOrderSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const addPromoCodeCompRef = useRef()

  function handeOnProductListUpdate(productList) {
   const newCart = productList.filter(product => product.quantity > 0);

    setCart(() => {
      return newCart
    });
    setAppliedPromoCode({});
    
    if(addPromoCodeCompRef && addPromoCodeCompRef.current) 
      addPromoCodeCompRef.current.resetForm();
    
  }

  function handleOnPromoCodeApplied(promocode) {
    const promoCodeObj = promoCodes.find(e => e.code === promocode);
    setAppliedPromoCode(promoCodeObj);
  }

  useEffect(() => {
    let _orderSubTotal = 0;
    let _total = 0;
    let _discountRate = 0;

    const updatedOrderList = cart.map((order, i) => {
      const netRate = order.quantity * order.rate;
      _orderSubTotal = _orderSubTotal + netRate;
      return {
        id: i,
        name: `${order.quantity}x${order.name}`,
        value: netRate.toFixed(2)
      }
    });

    _discountRate = (appliedPromoCode && appliedPromoCode.discountPercentage)?
      _orderSubTotal * appliedPromoCode.discountPercentage / 100: 0;

    _total = _orderSubTotal - _discountRate;
    _orderSubTotal = _orderSubTotal.toFixed(2);
    _total = _total.toFixed(2);
    _discountRate = _discountRate.toFixed(2);
    
    setDiscountRate(_discountRate);
    setOrdersList(updatedOrderList);
    setOrderSubTotal(_orderSubTotal);
    setTotal(_total);
  }, [cart, appliedPromoCode]);

  useEffect(() => {
    const _orderSubtotal = parseFloat(orderSubtotal);
    if(_orderSubtotal > 0 && _orderSubtotal < appliedPromoCode.minimumOrder) {
      setAppliedPromoCode({});
      if(addPromoCodeCompRef) 
        addPromoCodeCompRef.current.resetForm();
        console.log(addPromoCodeCompRef)
    }
  }, [orderSubtotal]);

  return (
    <div className="px-4 px-lg-0">
      <div className="container text-white py-5 text-center">
        <h1 className="display-4">Product checkout</h1>
      </div>
      <div className="pb-5"> 
        <div className="container">
          <div className="row">
            <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">

             <ProductList 
                productList={productList} 
                onProductListUpdate={handeOnProductListUpdate}/>
            </div>
          </div>
          
          {cart.length > 0 && (
            <div className="row py-5 p-4 bg-white rounded shadow-sm">
              <div className="col-lg-6">
                <SectionHeader>Coupon code</SectionHeader>
                <AddPromoCode 
                  promoCodes={promoCodes}
                  orderSubtotal={orderSubtotal} 
                  onPromoCodeApplied={handleOnPromoCodeApplied}
                  ref={addPromoCodeCompRef} />
                        
              </div>
              <div className="col-lg-6">
                <SectionHeader>Order summary</SectionHeader>
                <OrderSummary 
                  ordersList={ordersList}
                  orderSubtotal={orderSubtotal}
                  discountRate={discountRate}
                  total={total} 
                  appliedPromoCode={appliedPromoCode}/>
              </div>
            </div>
          )}
          

        </div>
      </div>
    </div>
  );
}

function SectionHeader(props) {
  return (
    <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
      { props.children }
    </div>
  )
}

export default App;
