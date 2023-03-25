import { FC, useState } from 'react'
import { IssueList, LabelPicker } from '../components'

export const IssuesPage: FC = () => {
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
                <IssueList />
            </div>
            <div className='col-4'>
                <LabelPicker selectedLabels={selectedLabels} onChange={onLabelChange} />
            </div>
        </div>
    )
}