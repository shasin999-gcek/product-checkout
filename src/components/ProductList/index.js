import { useEffect, useState } from 'react';
import QuantityInput from '../QuantityInput';
import './ProductList.css';

function ProductList({ productList, onProductListUpdate }) {

  const [_productList, setProductList] = useState([...productList]);

  function handleQuantityChange(productId, quantity) {
    console.log(productId, quantity);
    const updatedProductList = _productList.map(product => {
      if(product.id === productId) {
        return {...product, quantity}
      }
      return product;
    });
    setProductList(updatedProductList);
  }

  useEffect(() => {
    onProductListUpdate(_productList);
  }, [_productList])

  if(_productList) {
    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="border-0 bg-light">
                <div className="p-2 px-3 text-uppercase">Product</div>
              </th>
              <th scope="col" className="border-0 bg-light">
                <div className="py-2 text-uppercase">Price</div>
              </th>
              <th scope="col" className="border-0 bg-light">
                <div className="py-2 text-uppercase">Quantity</div>
              </th>
              {/* <th scope="col" className="border-0 bg-light">
                <div className="py-2 text-uppercase">Total</div>
              </th> */}
            </tr>
          </thead>
          <tbody>
            {_productList.map(product => {
              return (
                <tr key={product.id}>
                  <th scope="row" className="border-0">
                    <div className="p-2">
                    
                      <div className="ml-3 d-inline-block align-middle">
                        <h5 className="mb-0"> 
                          <a href="#" className="text-dark d-inline-block align-middle">
                            { product.name }
                          </a>
                        </h5>
                      </div>
                    </div>
                  </th>
                  <td className="border-0 align-middle"><strong>$ { product.rate }</strong></td>
                  <td className="border-0 align-middle">
                      <QuantityInput 
                        initialQuantity={0} 
                        onQuantityChange={(quantity) => handleQuantityChange(product.id, quantity)} />
                  </td>
                  {/* <td className="border-0 align-middle"><a href="#" className="text-dark"><i className="fa fa-trash"></i></a></td> */}
                </tr>
              )
            })}
            
          </tbody>
        </table>
      </div>
    )
  }
 
}

export default ProductList;