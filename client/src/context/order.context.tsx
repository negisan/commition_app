import React, {useContext, useState} from "react";

const OrderStateContext = React.createContext<any | null>({})
const OrderDispatchContext = React.createContext<any | null>({})

interface OrderState {
  order_price: number,
  order_content: string,
  creator_id: number,
  client_id: number
}

export const OrderProvider = ({children}: any) => {
  const [orderState, setOrderState] = useState<OrderState>({
    order_price: 0,
    order_content: '',
    creator_id: 0,
    client_id: 0
  })



  return (
    <OrderStateContext.Provider value={{orderState}}>
      <OrderDispatchContext.Provider value={{setOrderState}}>
        {children}
      </OrderDispatchContext.Provider>
    </OrderStateContext.Provider>
  )
}

export const useOrderStateContext = () => {
  return useContext(OrderStateContext)
}

export const useOrderDispatchContext = () => {
  return useContext(OrderDispatchContext)
}