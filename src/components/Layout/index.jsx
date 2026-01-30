import { useAuth } from '../../contexts/AuthContext'

export default function Layout({ children }) {
    const { logout } = useAuth()

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Logout button */}
                <div className="flex justify-end mb-4">
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors shadow-md p-3 bg-white rounded-xl"
                        title="Sair da conta"
                    >
                        <span className="text-sm">Sair</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>

                {children}
            </div>
        </div>
    )
}
