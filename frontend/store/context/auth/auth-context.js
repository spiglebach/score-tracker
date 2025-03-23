import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import {jwtDecode} from "jwt-decode"
import { isAfter } from "date-fns";
import { httpInvalidateRefreshToken, httpRefresh } from "../../../util/http/auth";
import { http } from "../../../util/http/common";

export const AuthContext = createContext({
    accessToken: '',
    isAuthenticated: false,
    refresh: () => {},
    isJwtExpired: (jwt) => false,
    authenticate: ({accessToken, refreshToken}) => {},
    logout: () => {}
})

export const ASYNC_STORAGE_TOKENS_KEY = 'tokens'

export function storeTokens(tokens) {
    try {
        AsyncStorage.setItem(ASYNC_STORAGE_TOKENS_KEY, JSON.stringify(tokens))
    } catch (error) {
        console.warn("error storing tokens")
    }
}

export function removeTokensFromStorage() {
    try {
        AsyncStorage.removeItem(ASYNC_STORAGE_TOKENS_KEY)
    } catch (error) {
        console.warn("error removing tokens from storage")
    }
}

export async function getTokensFromStorage() {
    try {
        const storedTokensJsonValue = await AsyncStorage.getItem(ASYNC_STORAGE_TOKENS_KEY)
        const tokens = storedTokensJsonValue != null ? JSON.parse(storedTokensJsonValue) : null
        return tokens
    } catch (error) {
        console.warn("error getting tokens from storage")
    }
}

function AuthContextProvider({children}) {
    const [tokens, setTokens] = useState({
        accessToken: null,
        refreshToken: null
    })

    function isJwtExpired(jwt) {
        const decodedJwt = jwtDecode(jwt)
        const expClaim = decodedJwt.exp
        const expDate = new Date(expClaim * 1000)
        const now = new Date()
        return isAfter(now, expDate)
    }

    function authenticate({accessToken, refreshToken}) {
        saveTokens({accessToken, refreshToken})
        if (isJwtExpired(accessToken)) {
            refresh(refreshToken)
        }
    }

    function saveTokens({accessToken, refreshToken}) {
        setTokens({accessToken, refreshToken})
        storeTokens({accessToken, refreshToken})
        http.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    }

    async function refresh() {
        try {
            if (isJwtExpired(tokens.refreshToken)) {
                unsetTokens()
                return
            }
            http.defaults.headers.common['Authorization'] = null
            const response = await httpRefresh(tokens.refreshToken)
            const tokenResponse = response.data
            saveTokens(tokenResponse)
        } catch (error) {
            console.error("error refreshing tokens", error)
            unsetTokens()
        }
    }

    function logout() {
        try {
            httpInvalidateRefreshToken()
        } catch (error) {
            // could not invalidate refresh token
        }
        unsetTokens()
    }

    function unsetTokens() {
        setTokens({
            accessToken: null,
            refreshToken: null
        })
        removeTokensFromStorage()
        http.defaults.headers.common['Authorization'] = null
    }

    const value = {
        authToken: tokens.accessToken,
        isAuthenticated: !!tokens && !!tokens.accessToken,
        refresh: refresh,
        isJwtExpired: isJwtExpired,
        authenticate: authenticate,
        logout: logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function AxiosAuthRefreshInterceptor({children}) {
    const {isAuthenticated, authToken, refresh, isJwtExpired} = useContext(AuthContext)

    useLayoutEffect(() => {
        const requestInterceptor = (config) => {
            if (isAuthenticated && isJwtExpired(authToken)) {
                refresh()
            }
            return config
        }

        const errorInterceptor = (error) => {
            return Promise.reject(error)
        }

        const interceptors = http.interceptors.request.use(requestInterceptor, errorInterceptor)
        return () => http.interceptors.request.eject(interceptors)
    }, [])

    return children
}

export default AuthContextProvider