import axios from 'axios'

export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    }
})