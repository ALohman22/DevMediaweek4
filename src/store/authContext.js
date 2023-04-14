import { useState, createContext, useEffect } from 'react'

let logoutTimer

const AuthContext = createContext({
  token: '',
  login: () => {},
  logout: () => {},
  userId: null
})

const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime()
  const expTime = exp 
  const remainingTime = expTime - currentTime
  return remainingTime
}

const getLocalData = () => {
  const storedToken = localStorage.getItem('token')
  const storedExp = localStorage.getItem('exp')

  const remainingTime = calculateRemainingTime(storedExp)

  if (remainingTime <= 1000 * 60 * 30) {
    localStorage.removeItem('token')
    localStorage.removeItem('exp')
    return null
  }


  return {
    token: storedToken,
    duration: remainingTime,
  }
}



export const AuthContextProvider = (props) => {
  const localData = getLocalData()
  
  let initialId 
  let initialToken


    if (localData) {
      initialToken = localData.token
      initialId = localData.userId
    }
  

  const [token, setToken] = useState(initialToken)
  const [userId, setUserId] = useState(initialId)


  const logout = (exp) => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem('token')
    localStorage.removeItem('exp')
    localStorage.removeItem('userId')
    if(logoutTimer){ 
      clearTimeout(logoutTimer)
    }
  }

  const login = (exp, token, userId) => {
    setToken(token)
    setUserId(userId)
    localStorage.setItem('token', token)
    localStorage.setItem('exp', exp)
    localStorage.setItem('userId', userId)
    const remainingTime = calculateRemainingTime(exp)

    logoutTimer = setTimeout(logout, remainingTime)
  }

  const contextValue = {
    token,
    login,
    logout, 
    userId
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
