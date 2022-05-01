import { useEffect, useState } from "react";

function OrderSummary({ ordersList, orderSubtotal, discountRate, total, appliedPromoCode }) {

  return (
    <div className="p-4">
      {/* <p className="font-italic mb-4">Shipping and additional costs are calculated based on values you have entered.
                </p> */}
      <ul className="list-unstyled mb-4">
        {ordersList.map(order => {
          return (
            <ListItem key={order.id}>
              <strong className="text-muted">{ order.name }</strong>
              <strong>$ { order.value }</strong>
            </ListItem>
          )
        })}
       <ListItem>
         <strong className="text-muted">Order Subtotal
         </strong><strong>$ { orderSubtotal}</strong>
        </ListItem>
        {(discountRate && appliedPromoCode.code) && 
          <ListItem>
            <strong className="text-muted">Discount({appliedPromoCode.discountPercentage}%)</strong>
            <h5 className="font-weight-bold">- $ { discountRate }</h5>
          </ListItem>
        }
       <ListItem>
          <strong className="text-muted">Total</strong>
          <h5 className="font-weight-bold">$ { total }</h5>
        </ListItem>
      </ul>
      <a href="#" className="btn btn-dark rounded-pill py-2 btn-block">Procceed to checkout</a>
    </div>
  )
}

function ListItem(props) {
  return (
    <li className="d-flex justify-content-between py-3 border-bottom">
      { props.children }
    </li>
  )
}

export default OrderSummary;