import { useRandom } from './hooks/useRandom'
import './App.css'

export const App = () => {
  const query = useRandom()

  return (
    <div>
      {
        query.isFetching // isLoading solo es la primera vez, el resto es isFetching
          ? (<h2>Cargando...</h2>)
          : (
            <>
              {
                query.isError
                  ? (<h2>{`${query.error}`}</h2>)
                  : (<h2>Numero aleatorio: {query.data}</h2>)
              }
            </>
          )
      }
      <button onClick={() => query.refetch()} disabled={query.isFetching}>Nuevo numero</button>
    </div>
  )
}