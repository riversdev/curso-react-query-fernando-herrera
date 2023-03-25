import { useEffect, useReducer, useState } from 'react'
import './App.css'

const getRandomNumberFromApi = async (): Promise<number> => {
  const response = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new')
  const data = await response.text()

  // throw new Error('Aiudaaaaa !')

  return +data
}

export const App = () => {
  const [number, setNumber] = useState<number>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>()
  const [state, dispatch] = useReducer((x) => x + 1, 0) // force refetch

  useEffect(() => {
    setIsLoading(true)
    getRandomNumberFromApi().then(setNumber).catch(x => setError(x.message))
  }, [state])

  useEffect(() => {
    if (number) setIsLoading(false)
  }, [number])

  useEffect(() => {
    if (error) setIsLoading(false)
  }, [error])

  return (
    <div>
      {
        isLoading
          ? (<h2>Cargando...</h2>)
          : (
            <>
              {
                error
                  ? (<h2>{error}</h2>)
                  : (<h2>Numero aleatorio: {number}</h2>)
              }
            </>
          )
      }
      <button onClick={dispatch} disabled={isLoading}>Nuevo numero</button>
    </div>
  )
}