import { useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Issue, State } from '../interfaces'
import { sleep } from '../helpers'
import { githubApi } from '../api/githubApi'

interface Props {
    state?: State
    labels: string[]
}

interface QueryProps {
    pageParam?: number
    queryKey: (string | Props)[]
}

const getIssues = async ({ pageParam = 1, queryKey }: QueryProps): Promise<Issue[]> => {
    await sleep(2)

    const [, , args] = queryKey
    const { state, labels } = args as Props

    const params = new URLSearchParams()

    if (state) params.append('state', state)
    if (labels.length > 0) params.append('labels', labels.join(','))

    params.append('page', String(pageParam))
    params.append('per_page', '5')

    const { data } = await githubApi.get<Issue[]>('/issues', { params })

    return data
}

export const useIssuesInfinite = ({ state, labels }: Props) => {
    const query = useInfiniteQuery({
        queryKey: ['issues', 'infinite', { state, labels }],
        queryFn: getIssues,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.length === 0) return

            return pages.length + 1
        },
    })

    return {
        issuesQuery: query,
    }
}