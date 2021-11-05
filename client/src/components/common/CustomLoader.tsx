import React from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader'

const CustomLoader: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '3rem 0 6rem',
      }}
    >
      <ScaleLoader loading={true} color={'var(--clr-primary-6)'} height={16} />
    </div>
  )
}

export default CustomLoader
