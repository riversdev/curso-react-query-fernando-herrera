import { FC, useState } from 'react'
import { IssueList, LabelPicker, LoadingIcon } from '../components'
import { useIssues } from '../hooks'
import { State } from '../interfaces'

export const IssuesPage: FC = () => {
    const [state, setState] = useState<State>()
    const [selectedLabels, setSelectedLabels] = useState<string[]>([])

    const { issuesQuery, page, prevPage, nextPage } = useIssues({ state, labels: selectedLabels })

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
                        : (<IssueList issues={issuesQuery.data || []} state={state} handleStateChange={setState} />)
                }
                <div className='w-100 d-flex justify-content-between'>
                    <button
                        className='btn btn-outline-primary'
                        onClick={prevPage}
                        disabled={issuesQuery.isFetching}
                    >
                        Prev
                    </button>
                    <div>
                        <span className='badge badge-pill bg-info text-white'>{page}</span>
                    </div>
                    <button
                        className='btn btn-outline-primary'
                        onClick={nextPage}
                        disabled={issuesQuery.isFetching}
                    >
                        Next
                    </button>
                </div>
            </div>
            <div className='col-4'>
                <LabelPicker selectedLabels={selectedLabels} onChange={onLabelChange} />
            </div>
        </div>
    )
}