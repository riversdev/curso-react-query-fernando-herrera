import axios from 'axios'

export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    }
})