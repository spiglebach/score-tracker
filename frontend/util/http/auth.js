import { http } from "./common"

export async function httpAuthenticate(username, password) {
    const response = await http.post('/auth/authenticate', {
        username: username,
        password: password
    })
    return response
}

export async function httpRefresh(refreshToken) {
    const response = http.request({
        url: '/auth/refresh',
        method: 'post',
        params: {
            refreshToken: refreshToken
        }
    })
    return response
}

export function httpInvalidateRefreshToken() {
    http.delete('/auth/refresh/invalidate')
}

export async function httpRegister(username, password) {
    const response = await http.post('/auth/register', {
        username: username,
        password: password
    })
    return response
}