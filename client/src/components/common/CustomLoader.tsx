import React from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader'

const CustomLoader: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '3rem',
      }}
    >
      <ScaleLoader loading={true} color={'var(--clr-primary-6)'} />
    </div>
  )
}

export default CustomLoader
