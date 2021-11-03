import React from 'react'
import { Form, Field } from 'react-final-form'
import styled from 'styled-components'
import { useRequestsDispatchContext } from '../../../context/requests.context'

const ClientCommentForm: React.FC<any> = ({ request }) => {
  const { completeRequest } = useRequestsDispatchContext()

  const onSubmit = async (values: any) => {
    completeRequest(request, values.thanks_comment)
  }

  return (
    <Wrapper>
      <Title>
        <h3>お礼を送信する</h3>
        <div className='divider' style={{ marginTop: 0 }}></div>
      </Title>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting, pristine }) => (
          <FormWrapper onSubmit={handleSubmit}>
            <FieldContainer>
              <small>
                *納品の確認後、お礼の送信が完了したタイミングでお客様の支払い済みの料金が受注者の残高に加算されます。
              </small>
              <Field<string> name='thanks_comment'>
                {({ input, meta }) => (
                  <textarea
                    {...input}
                    placeholder='お礼のコメントを記入しましょう'
                    rows={15}
                    className={`${meta.error && meta.touched && 'error'}`}
                  />
                )}
              </Field>
            </FieldContainer>
            <ButtonWrapper>
              <button type='submit' disabled={submitting || pristine}>
                送信する
              </button>
            </ButtonWrapper>
          </FormWrapper>
        )}
      />
    </Wrapper>
  )
}

const Title = styled.div`
  h3 {
    color: var(--clr-grey-4);
  }
`
const FieldContainer = styled.div`
  small {
    color: var(--clr-grey-4);
    font-weight: 600;
  }
  textarea {
    width: 100%;
    border: none;
    border-radius: var(--radius);
    padding: 1rem;
    font-weight: 600;
    font-size: 1rem;
    font-family: Meiryo UI;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-6);
    font-color: var(--clr-grey-6);
    :-webkit-autofill {
      box-shadow: 0 0 0 1000px white inset;
    }
    :focus {
      outline: none;
    }
    ::placeholder {
      color: var(--clr-grey-8);
    }
  }
`

const ButtonWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  width: 100%;
  button {
    background: var(--clr-primary-4);
    border: none;
    border-radius: var(--radius);
    padding: 0.5rem 1.25rem;
    font-size: 1.25rem;
    color: var(--clr-white);
    cursor: pointer;
    transition: var(--transition);
    :hover {
      background: var(--clr-primary-6);
    }
  }
  button[disabled] {
    cursor: not-allowed;
    background: var(--clr-primary-8);
  }
`

const FormWrapper = styled.form`
  margin: 0 auto;
  margin-bottom: 3rem;
  width: 100%;
`

const Wrapper = styled.div`
  margin-top: 4rem;
`

export default ClientCommentForm
