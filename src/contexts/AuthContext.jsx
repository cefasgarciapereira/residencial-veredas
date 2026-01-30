import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'veredas_auth'
const CREDENTIALS = {
    username: 'veredas',
    password: '@veredas110'
}

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const session = localStorage.getItem(STORAGE_KEY)
        if (session === 'authenticated') {
            setIsAuthenticated(true)
        }
        setIsLoading(false)
    }, [])

    function login(username, password) {
        if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
            localStorage.setItem(STORAGE_KEY, 'authenticated')
            setIsAuthenticated(true)
            return { success: true }
        }
        return { success: false, error: 'Usuário ou senha incorretos' }
    }

    function logout() {
        localStorage.removeItem(STORAGE_KEY)
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
