import { Link } from "react-router-dom"
import SecurityCameraQRCode from "../../components/SecurityCameraQRCode"

export default function SecurityCamera() {
    return (
        <div className="space-y-6">
            <Link
                to="/"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar
            </Link>

            <header className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                    Acesso às Câmeras de Segurança
                </h1>
                <p className="text-blue-100 mt-1">
                    Guia de instalação e configuração
                </p>
            </header>

            <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">1</span>
                        Baixe o aplicativo
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Para visualizar as câmeras de segurança do condomínio, você precisa instalar o aplicativo
                        <strong> Intelbras iSIC Lite</strong> no seu celular. Escolha a versão compatível com seu dispositivo:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a
                            href="https://play.google.com/store/apps/details?id=com.intelbras.isiclite&hl=pt_BR"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="p-3 bg-green-100 rounded-lg">
                                <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.523 2.047a.585.585 0 0 0-.57.065L3.185 11.058a.594.594 0 0 0 0 1.004l13.768 8.946a.585.585 0 0 0 .57.065.59.59 0 0 0 .342-.474l.015-18.075a.59.59 0 0 0-.357-.477zM5.025 12l11.834-7.695-.012 15.39L5.025 12z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Android</p>
                                <p className="text-sm text-gray-500">Google Play Store</p>
                            </div>
                            <svg className="w-5 h-5 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>

                        <a
                            href="https://apps.apple.com/br/app/intelbras-isic-lite/id1323192678"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="p-3 bg-gray-100 rounded-lg">
                                <svg className="w-8 h-8 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">iPhone / iPad</p>
                                <p className="text-sm text-gray-500">App Store</p>
                            </div>
                            <svg className="w-5 h-5 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </section>

                <hr className="border-gray-200" />

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">2</span>
                        Crie sua conta
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Ao abrir o aplicativo pela primeira vez, siga as instruções na tela para criar sua conta.
                        Você precisará informar um e-mail válido e criar uma senha pessoal.
                    </p>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex gap-3">
                            <svg className="w-6 h-6 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-amber-800 text-sm">
                                <strong>Dica:</strong> Guarde bem sua senha pessoal. Ela será usada para acessar o aplicativo no futuro.
                            </p>
                        </div>
                    </div>
                </section>

                <hr className="border-gray-200" />

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">3</span>
                        Adicione a câmera
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Após criar sua conta e fazer login, siga os passos abaixo para adicionar as câmeras do condomínio:
                    </p>
                    <ol className="list-decimal list-inside space-y-3 text-gray-600 mb-6">
                        <li>
                            Na tela inicial do aplicativo, toque no botão <strong className="text-gray-800">+</strong> (adicionar dispositivo)
                        </li>
                        <li>
                            Selecione a opção <strong className="text-gray-800">"Escanear QR Code"</strong> ou similar
                        </li>
                        <li>
                            Aponte a câmera do seu celular para o QR Code abaixo
                        </li>
                    </ol>

                    <div className="flex flex-col items-center my-8 space-y-4">
                        <SecurityCameraQRCode className="w-64 h-64 md:w-80 md:h-80" />
                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="font-mono font-semibold text-gray-800">U5EK3602054FM</span>
                            <button
                                onClick={() => navigator.clipboard.writeText('U5EK3602054FM')}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Copiar código"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </section>

                <hr className="border-gray-200" />

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">4</span>
                        Insira as credenciais
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Se o aplicativo solicitar usuário e senha para acessar a câmera, utilize as credenciais abaixo:
                    </p>

                    <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                            <div>
                                <p className="text-sm text-gray-500">Usuário</p>
                                <p className="font-mono font-semibold text-gray-800">veredas</p>
                            </div>
                            <button
                                onClick={() => navigator.clipboard.writeText('veredas')}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Copiar usuário"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                            <div>
                                <p className="text-sm text-gray-500">Senha</p>
                                <p className="font-mono font-semibold text-gray-800">@veredas110</p>
                            </div>
                            <button
                                onClick={() => navigator.clipboard.writeText('@veredas110')}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Copiar senha"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                        <div className="flex gap-3">
                            <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <p className="text-red-800 text-sm">
                                <strong>Importante:</strong> Estas credenciais são exclusivas para moradores do Residencial Veredas.
                                Não compartilhe com pessoas de fora do condomínio.
                            </p>
                        </div>
                    </div>
                </section>

                <hr className="border-gray-200" />

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                        Pronto!
                    </h2>
                    <p className="text-gray-600">
                        Após seguir todos os passos acima, você poderá visualizar as câmeras de segurança do condomínio
                        diretamente no seu celular, a qualquer momento. O aplicativo permite assistir em tempo real
                        e também acessar gravações anteriores (quando disponíveis).
                    </p>
                </section>
            </div>
        </div>
    )
}
