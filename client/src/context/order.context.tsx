// @ts-nocheck
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'

import { useStripe, useElements } from '@stripe/react-stripe-js'

import { useAuthStateContext } from './auth.context'
import { BASE_API_URL } from '../helper/constants'
import { useUIContext } from './UI.context'
import RequestsService from '../services/requestsService'
import { errorMessage } from '../helper/handleErrorMessage'

const OrderStateContext = React.createContext<any | null>({})
const OrderDispatchContext = React.createContext<any | null>({})

interface OrderData {
  order_price: number
  order_content: string
  creatorId: number
  clientId: number
}

export const OrderProvider = ({ children }: any) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [checkoutError, setCheckoutError] = useState()

  const { user } = useAuthStateContext()
  const { toastError, toastSuccess } = useUIContext()
  const stripe = useStripe()
  const elements = useElements()
  const history = useHistory()

  const orderWithCheckout = async (order_data: OrderData) => {
    const cardElement = elements?.getElement('card')
    try {
      // 支払い
      const { data: clientSecret } = await axios({
        method: 'post',
        url: BASE_API_URL + '/checkout/create-payment-intent',
        data: {
          order: {
            order_price: order_data.order_price,
          },
        },
      })

      const paymentMethodReq = await stripe?.createPaymentMethod({
        type: 'card',
        card: cardElement,
      })
      if (paymentMethodReq?.error) {
        setCheckoutError(paymentMethodReq.error.message)
        setIsProcessing(false)
        return
      }

      const { error } = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq?.paymentMethod.id,
      })
      if (error) {
        setCheckoutError(error.message)
        setIsProcessing(false)
        return
      } else {
        // 支払い成功後、注文内容をデータベースに保存
        await RequestsService.createRequest(order_data)
          .then(() => {
            setIsProcessing(false)
            toastSuccess('リクエストを正常に送信しました')
            history.push('/requests')
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }
    } catch (err) {
      setIsProcessing(false)
      toastError(errorMessage(err))
    }
  }

  return (
    <OrderStateContext.Provider value={{ isProcessing, checkoutError }}>
      <OrderDispatchContext.Provider value={{ orderWithCheckout }}>
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
