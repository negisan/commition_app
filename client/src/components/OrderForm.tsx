import React from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import { CardElement } from '@stripe/react-stripe-js'

import {
  useOrderDispatchContext,
  useOrderStateContext,
} from '../context/order.context'

const OrderForm: React.FC<any> = ({ client, creator }) => {
  const { isProcessing, checkoutError } = useOrderStateContext()
  const { orderWithCheckout } = useOrderDispatchContext()

  const onSubmit = async (values: any) => {
    const orderData = {
      order_price: values.order_price,
      order_content: values.order_content,
      creatorId: creator.id,
      clientId: client.id,
    }
    orderWithCheckout(orderData)
  }

  const handleValidate = (values: any) => {
    const errors: any = {}
    if (!values.order_price) {
      errors.order_price = '金額を入力してください'
    }
    if (!values.order_content) {
      errors.order_content = 'リクエスト詳細を入力してください'
    }
    return errors
  }

  const formData = {
    order_price: creator?.default_order_price,
    order_content: '',
  }

  const CardElementOpts = {
    iconStyle: 'solid',
    hidePostalCode: true,
  }

  return (
    <div className="section-wrapper">
      <SectionTitle>
        <h1>新規リクエスト</h1>
        <div className='divider'></div>
      </SectionTitle>
      <Form
        onSubmit={onSubmit}
        validate={(values) => handleValidate(values)}
        initialValues={formData}
        render={({ handleSubmit, submitting, pristine }) => (
          <FormWrapper onSubmit={handleSubmit}>
            <FieldContainer>
              <span className='required'>必須</span>
              <div className='field_label'>
                <label htmlFor='order_price'>金額</label>
              </div>
              <div className='controll'>
                <small>￥</small>
              </div>
              <div className='field_input'>
                <Field<string> name='order_price'>
                  {({ input, meta }) => (
                    <input
                      {...input}
                      type='number'
                      placeholder='0'
                      className={`${meta.error && meta.touched && 'error'}`}
                    />
                  )}
                </Field>
              </div>
            </FieldContainer>

            <FieldContainer>
              <span className='required'>必須</span>
              <div className='field_label'>
                <label htmlFor='order_content'>リクエスト詳細</label>
              </div>
              <div className='field_input'>
                <Field<string> name='order_content'>
                  {({ input, meta }) => (
                    <textarea
                      {...input}
                      placeholder='リクエスト詳細'
                      rows={10}
                      className={`${meta.error && meta.touched && 'error'}`}
                    />
                  )}
                </Field>
              </div>
            </FieldContainer>
            <CardElementContainer>
              {checkoutError && (
                <div className='checkout_error'>{checkoutError}</div>
              )}
              <div>
                {/* @ts-ignore */}
                <CardElement options={CardElementOpts} />
              </div>
              <div className='info'>
                <h2>お試しの際のカード情報について</h2>
                <table>
                  <thead>
                    <tr>
                      <td></td>
                      <td>番号</td>
                      <td>日付</td>
                      <td>セキュリティコード</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>支払い成功</th>
                      <td>4242424242424242</td>
                      <td>任意の将来の日付</td>
                      <td>任意の3桁の数字</td>
                    </tr>
                    <tr>
                      <th>支払い失敗</th>
                      <td>4000000000000002</td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardElementContainer>
            <ButtonWrapper>
              <button
                type='submit'
                disabled={submitting || pristine || isProcessing}
              >
                発注する
              </button>
            </ButtonWrapper>
          </FormWrapper>
        )}
      />
    </div>
  )
}

const CardElementContainer = styled.div`
  margin-top: 3rem;
  .checkout_error {
    color: var(--clr-red);
    font-weight: 600;
  }
  .info {
    margin-top: 3rem;
    padding: 0.5rem 0.75rem;
    border: none;
    border-radius: var(--radius);
    background: var(--clr-grey-8);
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--clr-grey-4);
    table {
      border-collapse: collapse;
      width: 100%;
      th,
      td {
        border: 1px solid var(--clr-grey-6);
        border-radius: var(--radius);
      }
    }
  }
`

const SectionTitle = styled.div`
  padding: 3rem 2rem 0;
  h1 {
    letter-spacing: -1px;
    color: var(--clr-grey-3);
  }
`

const ButtonWrapper = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  width: 100%;
  button {
    background: var(--clr-primary-4);
    border: none;
    border-radius: var(--radius);
    padding: 0.5rem 1.5rem;
    font-size: 1.25rem;
    color: var(--clr-white);
    cursor: pointer;
    transition: var(--transition);
    :hover {
      background: var(--clr-primary-5);
    }
  }
  button[disabled] {
    cursor: not-allowed;
    opacity: 0.4;
  }
`

const FieldContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.75rem;
  position: relative;
  padding-left: 2rem;
  .required {
    position: absolute;
    left: -1rem;
    top: 0;
    padding: 1px 5px;
    background: var(--clr-red);
    border-radius: var(--radius);
    color: var(--clr-white);
  }
  .field_label {
    width: 5rem;
    padding-right: 1.5rem;
    text-align: right;
    flex-grow: 1;
    label {
      color: var(--clr-grey-4);
      font-weight: 600;
    }
  }
  .field_input {
    flex-grow: 3;
  }
  .controll {
    width: 1.5rem;
    display: flex;
    small {
      justify-self: end;
      align-self: center;
      font-size: 1.5rem;
      font-family: Meiryo UI;
      color: var(--clr-grey-5);
    }
  }
  input,
  textarea {
    width: 100%;
    font-family: Meiryo UI;
    font-weight: 600;
    font-size: 1rem;
    color: var(--clr-grey-5);
    font-color: var(--clr-grey-5);
    letter-spacing: var(--spacing);
    line-height: 1.2;
    padding: 15px 25px;
    background: var(--clr-white);
    border: none;
    border-bottom: 1px solid var(--clr-grey-9);
    :-webkit-autofill {
      box-shadow: 0 0 0 1000px white inset;
    }
    :focus {
      outline: none;
    }
    ::placeholder {
      color: var(--clr-grey-9);
    }
  }
  .error {
    border-bottom: 2px solid var(--clr-red);
  }
`

const FormWrapper = styled.form`
  margin: 0 auto;
  padding: 5rem 3rem;
  width: 100%;
`

export default OrderForm
