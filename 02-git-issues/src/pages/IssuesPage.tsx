import { FC, useState } from 'react'
import { IssueList, LabelPicker, LoadingIcon } from '../components'
import { useIssues } from '../hooks'

export const IssuesPage: FC = () => {
    const issuesQuery = useIssues()
    const [selectedLabels, setSelectedLabels] = useState<string[]>([])

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
                        : (<IssueList issues={issuesQuery.data || []} />)
                }
            </div>
            <div className='col-4'>
                <LabelPicker selectedLabels={selectedLabels} onChange={onLabelChange} />
            </div>
        </div>
    )
}