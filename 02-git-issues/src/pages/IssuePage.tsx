import { FC } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { IssueComment, LoadingIcon } from '../components'
import { useIssue } from '../hooks'

export const IssuePage: FC = () => {
    const { id } = useParams()
    const { issueQuery, issueCommentsQuery } = useIssue(Number(id || 0))

    if (issueQuery.isLoading) return (<LoadingIcon />)

    if (!id || !issueQuery.data) return (<Navigate to='issues' />)

    return (
        <div className='row mb-5'>
            <div className='col-12 mb-3'>
                <Link to='issues'>Go Back</Link>
            </div>
            <IssueComment issue={issueQuery.data} />
            {
                issueCommentsQuery.isLoading
                    ? (<LoadingIcon />)
                    : (
                        issueCommentsQuery.data?.map(issue => (
                            <IssueComment key={issue.id} issue={issue} />
                        ))
                    )
            }
        </div>
    )
}