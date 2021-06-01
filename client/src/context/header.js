import { createContext, useReducer } from 'react'

const HeaderContext = createContext({
  activeItem: 'register',
  activateHeaderItem: (name) => {},
})

function changeHeaderReducer(state, action) {
  switch (action.type) {
    case 'CHANGE':
      return { ...state, activeItem: action.payload }
    default:
      return state
  }
}

function HeaderProvider(props) {
  const [state, dispatch] = useReducer(changeHeaderReducer, {
    activeItem: null,
  })

  function activateHeaderItem(name) {
    dispatch({
      type: 'CHANGE',
      payload: name,
    })
  }

  return (
    <HeaderContext.Provider
      value={{ activeItem: state.activeItem, activateHeaderItem }}
      {...props}
    />
  )
}

export { HeaderContext, HeaderProvider }
