import React from 'react'
import styled from 'styled-components'

const RoleTag: React.FC<{ role: string }> = ({ role }) => {
  return <RoleTagContainer>{role}</RoleTagContainer>
}

const RoleTagContainer = styled.span`
  border: none;
  border-radius: 50px;
  padding: 0 0.25rem;
  background: var(--clr-primary-6);
  margin-left: 5px;
  letter-spacing: -5px;
  font-weight: 500;
  font-size: 12px;
  color: var(--clr-white);
`

export default RoleTag
