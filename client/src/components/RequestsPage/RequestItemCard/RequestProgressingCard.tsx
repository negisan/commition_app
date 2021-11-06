// @ts-nocheck
import React from 'react'
import styled from 'styled-components'
import { useFileUpload } from 'use-file-upload'

import {
  useRequestsDispatchContext,
  useRequestsStateContext,
} from '../../../context/requests.context'
import {
  CardWrapper,
  CardHeader,
  OrderPrice,
  OrderContent,
  ButtonContainer,
} from './CardComon'
import no_image from '../../../statics/images/no_image.jpg'

const RequestProgressingCard: React.FC<any> = ({ item }) => {
  const { role } = useRequestsStateContext()
  const { submitRequest } = useRequestsDispatchContext()
  const [fies, selectFilles] = useFileUpload()

  if (role === 'client') {
    return (
      <CardWrapper>
        <CardHeader
          userName={item?.creator.name}
          orderPrice={item?.order_price}
          createdAt={item?.createdAt}
          request={item}
        />
        <OrderContent order_content={item?.order_content} />
        <MessageContainer>
          <p>受注されました！投稿をお待ちください。</p>
        </MessageContainer>
      </CardWrapper>
    )
  }

  if (role === 'creator') {
    return (
      <CardWrapper>
        <CardHeader
          userName={item?.client.name}
          orderPrice={item?.order_price}
          createdAt={item?.createdAt}
          request={item}
        />
        <OrderContent order_content={item?.order_content} />
        <UploadForm>
          <PreviewContainer>
            <img src={fies?.source || no_image} alt='preview' />
          </PreviewContainer>
          <div>
            <button
              onClick={() =>
                selectFilles({ accept: 'image/*,.png,.jpg,.jpeg,.gif' })
              }
              className='btn_primary'
              style={{ background: 'var(--clr-grey-7)' }}
            >
              ファイルを選択
            </button>
          </div>
        </UploadForm>
        <ButtonContainer>
          <button
            onClick={() => submitRequest(item, fies.file)}
            className='btn_primary'
          >
            送信する
          </button>
        </ButtonContainer>
      </CardWrapper>
    )
  }
  return <></>
}

const PreviewContainer = styled.div`
  img {
    width: 100%;
    object-fit: contain;
    border-radius: var(--radius);
  }
  max-width: 768px;
`

const UploadForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 5rem;
`

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
  p {
    font-weight: 600;
    color: var(--clr-grey-4);
  }
`

export default RequestProgressingCard
