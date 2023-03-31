import { useQuery } from '@tanstack/react-query'
import { githubApi } from '../api/githubApi'
import { sleep } from '../helpers'
import { Issue, State } from '../interfaces'
import { useEffect, useState } from 'react';

interface Props {
    state?: State
    labels: string[]

    // getIssues
    page?: number
}

const getIssues = async ({ state, labels, page }: Props): Promise<Issue[]> => {
    await sleep(2)

    const params = new URLSearchParams()

    if (state) params.append('state', state)
    if (labels.length > 0) params.append('labels', labels.join(','))

    params.append('page', String(page))
    params.append('per_page', '5')

    const { data } = await githubApi.get<Issue[]>('/issues', { params })

    return data
}


export const useIssues = ({ state, labels }: Props) => {
    const [page, setPage] = useState(1)

    const query = useQuery({
        queryKey: ['issues', { state, labels, page }],
        queryFn: () => getIssues({ state, labels, page })
    })

    const prevPage = () => {
        if (page > 1) setPage(page - 1)
    }
    const nextPage = () => {
        if (query.data && query.data.length > 0) setPage(page + 1)
    }

    useEffect(() => {
        setPage(1)
    }, [state, labels])

    return {
        issuesQuery: query,
        page: query.isFetching ? `Loading ${page}` : page,
        prevPage,
        nextPage
    }
}