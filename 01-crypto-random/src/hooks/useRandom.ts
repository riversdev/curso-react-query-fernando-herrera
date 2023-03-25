import { useQuery } from '@tanstack/react-query'

const getRandomNumberFromApi = async (): Promise<number> => {
    const response = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new')
    const data = await response.text()

    // throw new Error('Aiudaaaaa !')

    return +data
}

export const useRandom = () => {
    const query = useQuery({
        queryKey: ['numbers'],
        queryFn: getRandomNumberFromApi
    })

    return query
}