import { FC } from 'react'
import { IssueItem } from './IssueItem'
import { Issue, State } from '../interfaces'

interface Props {
    issues: Issue[]
    state?: State
    handleStateChange: (state?: State) => void
}

export const IssueList: FC<Props> = ({ issues, state, handleStateChange }) => {
    return (
        <div className='card border-white'>
            <div className='card-header bg-dark'>
                <ul className='nav nav-pills card-header-pills'>
                    <li className='nav-item'>
                        <a className={`nav-link ${!state ? 'active' : ''}`} onClick={() => handleStateChange()}>All</a>
                    </li>
                    <li className='nav-item'>
                        <a className={`nav-link ${state === State.Open ? 'active' : ''}`} onClick={() => handleStateChange(State.Open)}>Open</a>
                    </li>
                    <li className='nav-item'>
                        <a className={`nav-link ${state === State.Closed ? 'active' : ''}`} onClick={() => handleStateChange(State.Closed)}>Closed</a>
                    </li>
                </ul>
            </div>
            <div className='card-body text-dark'>
                {
                    issues.map(issue => (
                        <IssueItem key={issue.id} issue={issue} />
                    ))
                }
            </div>
        </div>
    )
}