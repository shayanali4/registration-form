import React, { useRef, useEffect } from "react";

export default function Paypal(props) {
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool looking table",
                amount: {
                  currency_code: "USD",
                  value: 0.1,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log("order details ==> ",order);
        },
        onError: (err) => {
          console.log("error ==> ",err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div className="m-auto">
      <div className="m-auto" ref={paypal}></div>
    </div>
  );
}