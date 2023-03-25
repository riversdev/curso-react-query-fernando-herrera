import { useQuery } from '@tanstack/react-query'
import { githubApi } from '../api/githubApi'
import { Label } from '../interfaces'
import { sleep } from '../helpers'

const getLabels = async (): Promise<Label[]> => {
    await sleep(2)

    const { data } = await githubApi.get<Label[]>('/labels')

    return data
}

export const useLabels = () => {
    const query = useQuery({
        queryKey: ['labels'],
        queryFn: getLabels,
        // refetchOnWindowFocus: false, // se hace denuevo el fetch cuando la ventana vuelve a tener el foco :v
        // staleTime: 1000 * 60 * 60, // una hora
        // initialData: [], // initialData tiene la data inicial, se pierde al llegar la primer peticion pero si se define el staleTime entonces esta se queda por ese tiempo
        placeholderData: [ // placeholderData tiene data de ejemplo, se pierde al llegar la primer peticion
            {
                id: 717031390,
                node_id: 'MDU6TGFiZWw3MTcwMzEzOTA=',
                url: 'https://api.github.com/repos/facebook/react/labels/good%20first%20issue',
                name: 'good first issue',
                color: '6ce26a',
                default: true,
            }, {
                id: 725156255,
                node_id: 'MDU6TGFiZWw3MjUxNTYyNTU=',
                url: 'https://api.github.com/repos/facebook/react/labels/good%20first%20issue%20(taken)',
                name: 'good first issue (taken)',
                color: 'b60205',
                default: false,
            }
        ],
    })

    return query
}