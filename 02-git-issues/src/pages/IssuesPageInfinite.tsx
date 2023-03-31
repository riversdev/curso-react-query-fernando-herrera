import { FC, useState } from 'react'
import { IssueList, LabelPicker, LoadingIcon } from '../components'
import { useIssuesInfinite } from '../hooks'
import { State } from '../interfaces'

export const IssuesPageInfinite: FC = () => {
    const [state, setState] = useState<State>()
    const [selectedLabels, setSelectedLabels] = useState<string[]>([])

    const { issuesQuery } = useIssuesInfinite({ state, labels: selectedLabels })

    const onLabelChange = (labelName: string) => {
        if (selectedLabels.includes(labelName)) {
            setSelectedLabels(selectedLabels.filter(x => x !== labelName))
        } else {
            setSelectedLabels([...selectedLabels, labelName])
        }
    }

    return (
        <div className='row mt-5'>
            <div className='col-8'>
                {
                    issuesQuery.isLoading
                        ? (<LoadingIcon />)
                        : (<IssueList issues={issuesQuery.data?.pages.flat() || []} state={state} handleStateChange={setState} />)
                }
                <button
                    className='btn btn-outline-primary'
                    onClick={() => issuesQuery.fetchNextPage()}
                    disabled={!issuesQuery.hasNextPage}
                >
                    Load more...
                </button>
            </div>
            <div className='col-4'>
                <LabelPicker selectedLabels={selectedLabels} onChange={onLabelChange} />
            </div>
        </div>
    )
}