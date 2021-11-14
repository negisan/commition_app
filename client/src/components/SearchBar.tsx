// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  useUsersDispatchContext,
  useUsersStateContext,
} from '../context/users.context'

const SearchBar: React.FC = () => {
  const inputRef = useRef(null!)
  const { searchUser, searchUserCleanup } = useUsersDispatchContext()
  const { search_results } = useUsersStateContext()
  const [query, setQuery] = useState<string>('')
  const [ShowResultsBox, setShowResultsBox] = useState(false)

  useEffect(() => {
    const timeOutId = setTimeout(() => searchUser(query), 300)
    return () => clearTimeout(timeOutId)
    // eslint-disable-next-line
  }, [query])

  const handleOnChange = () => {
    // 先頭の空白文字もしくは連続した空白文字を空文字に置き換え
    let inputWithoutBlank = inputRef.current.value.replace(
      /^(\s*)|\s+(?=\s)/g,
      ''
    )
    if (inputWithoutBlank) {
      setShowResultsBox(true)
      setQuery(inputWithoutBlank)
    } else {
      setShowResultsBox(false)
    }
  }

  const handleOnClickLink = () => {
    inputRef.current.value = ''
    setQuery('')
    searchUserCleanup()
    setShowResultsBox(false)
  }

  const handleOnClickOverlay = () => {
    setQuery('')
    searchUserCleanup()
    setShowResultsBox(false)
  }

  return (
    <Wrapper>
      <SearchForm onSubmit={(e) => e.preventDefault()}>
        <input
          type='text'
          ref={inputRef}
          placeholder={'検索'}
          onChange={() => handleOnChange()}
        />
      </SearchForm>
      {ShowResultsBox && (
        <>
          <ResultsContainer>
            <ul>
              {search_results.map((result: any) => {
                return (
                  <Link
                    to={`/user/${result.name}`}
                    key={result.id}
                    onClick={() => handleOnClickLink()}
                  >
                    <ResultItem>{result.name}</ResultItem>
                  </Link>
                )
              })}
            </ul>
          </ResultsContainer>
          <div onClick={() => handleOnClickOverlay()}>
            <Overlay />
          </div>
        </>
      )}
    </Wrapper>
  )
}

const Overlay: React.FC = () => {
  const disableScroll = (e: any) => {
    e.preventDefault()
  }
  useEffect(() => {
    document.addEventListener('touchmove', disableScroll, {
      passive: false,
    })
    document.addEventListener('mousewheel', disableScroll, {
      passive: false,
    })
    return () => {
      document.removeEventListener('touchmove', disableScroll)
      document.removeEventListener('mousewheel', disableScroll)
    }
  }, [])

  return <OverlayStyle />
}

const OverlayStyle = styled.div`
  position: fixed;
  top: 3rem;
  left: 0;
  width: 100vw;
  height 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
`

const SearchForm = styled.form`
  input {
    z-index: 10;
    width: 100%;
    height: 100%;
    border: 1px solid var(--clr-grey-8);
    border-radius: 100px;
    padding: 0.25rem 1.25rem;
    font-size: 1.1rem;
    color: var(--clr-grey-6);
    :focus {
      outline: none;
    }
    :-webkit-autofill {
      box-shadow: 0 0 0 1000px white inset;
    }
    ::placeholder {
      color: var(--clr-grey-8);
    }
  }
`

const ResultItem = styled.li`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--clr-grey-6);
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  transition: var(--transition);
  :hover {
    background: var(--clr-grey-10);
  }
`

const ResultsContainer = styled.div`
  position: absolute;
  top: 2.45rem;
  left: 0;
  z-index: 10;
  background: var(--clr-white);
  width: 100%;
  max-height: 60vh;
`

const Wrapper = styled.div`
  display: none;
  @media (min-width: 1024px) {
    position: relative;
    display: block;
    width: 50%;
    margin: 0 3rem;
  }
`

export default SearchBar
