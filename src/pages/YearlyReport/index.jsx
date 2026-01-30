import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'

import Currency from "../../components/Currency"
import { filterByDate, calculateCashFlow } from "../../services/sheets"
import { parseMonthToString } from "../../services/utils"

export default function YearlyReport() {
    const { year } = useParams()
    const loading = useSelector((state) => state.sheets.loading)
    const entities = useSelector((state) => state.sheets.entities)

    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth() + 1

    // Generate months for this year
    const startMonth = parseInt(year) === 2020 ? 4 : 1
    const endMonth = parseInt(year) === currentYear ? currentMonth : 12

    const months = []
    for (let m = startMonth; m <= endMonth; m++) {
        const monthName = parseMonthToString(m)
        const data = filterByDate(monthName, year, entities)
        const cashFlow = calculateCashFlow(data)
        months.push({ month: m, monthName, data, cashFlow })
    }

    // Calculate yearly totals
    const yearlyTotal = months.reduce((sum, m) => sum + parseFloat(m.cashFlow), 0).toFixed(2)

    useEffect(() => {
        if (!loading && entities.length > 0) {
            // Small delay to ensure content is rendered before print dialog
            const timer = setTimeout(() => {
                window.print()
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [loading, entities])

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <svg className="animate-spin w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <p className="text-gray-600">Carregando relatório...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Print styles */}
            <style>{`
                @media print {
                    @page {
                        size: A4;
                        margin: 1cm;
                    }
                    body {
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                    }
                    .no-print {
                        display: none !important;
                    }
                    .page-break {
                        page-break-before: always;
                    }
                    .avoid-break {
                        page-break-inside: avoid;
                    }
                }
            `}</style>

            {/* Print button - hidden when printing */}
            <div className="no-print fixed top-4 right-4 z-50">
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Imprimir / Salvar PDF
                </button>
            </div>

            {/* Report content */}
            <div className="max-w-4xl mx-auto p-8">
                {/* Header */}
                <header className="text-center mb-8 pb-6 border-b-2 border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-800">Residencial Veredas</h1>
                    <h2 className="text-xl text-gray-600 mt-2">Relatório Financeiro Anual - {year}</h2>
                </header>

                {/* Monthly reports */}
                {months.map((monthData, idx) => (
                    <section key={monthData.month} className={`mb-8 avoid-break ${idx > 0 && idx % 3 === 0 ? 'page-break' : ''}`}>
                        <h3 className="text-lg font-bold text-gray-800 bg-gray-100 px-4 py-2 rounded-t-lg capitalize border border-gray-200 border-b-0">
                            {monthData.monthName} de {year}
                        </h3>

                        {monthData.data.length > 0 ? (
                            <div className="border border-gray-200 rounded-b-lg overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="text-left py-2 px-3 font-semibold text-gray-600 border-b">Data</th>
                                            <th className="text-left py-2 px-3 font-semibold text-gray-600 border-b">Morador</th>
                                            <th className="text-right py-2 px-3 font-semibold text-gray-600 border-b">Valor</th>
                                            <th className="text-left py-2 px-3 font-semibold text-gray-600 border-b">Observação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {monthData.data.map((item, index) => (
                                            <tr key={`${item["Valor"]}${item["Morador"]}${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="py-2 px-3 text-gray-600 border-b border-gray-100">{item["Data"]}</td>
                                                <td className="py-2 px-3 text-gray-800 border-b border-gray-100">{item["Morador"]}</td>
                                                <td className="py-2 px-3 text-right font-medium text-gray-800 border-b border-gray-100">{item["Valor"]}</td>
                                                <td className="py-2 px-3 text-gray-600 border-b border-gray-100">{item["Observação"]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className={`${parseFloat(monthData.cashFlow) >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                                            <td colSpan="2" className="py-2 px-3 font-semibold text-gray-800">
                                                Fluxo de caixa do mês
                                            </td>
                                            <td className="py-2 px-3 text-right">
                                                <Currency value={monthData.cashFlow} />
                                            </td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        ) : (
                            <div className="border border-gray-200 border-t-0 rounded-b-lg p-4 text-center text-gray-500 bg-gray-50">
                                Nenhum registro encontrado para este mês.
                            </div>
                        )}
                    </section>
                ))}

                {/* Yearly summary */}
                <section className="mt-12 pt-6 border-t-2 border-gray-300 avoid-break">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Resumo do Ano {year}</h3>
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-gray-300">
                                    <th className="text-left py-2 font-semibold text-gray-700">Mês</th>
                                    <th className="text-right py-2 font-semibold text-gray-700">Fluxo de Caixa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {months.map((monthData) => (
                                    <tr key={monthData.month} className="border-b border-gray-200">
                                        <td className="py-2 capitalize text-gray-700">{monthData.monthName}</td>
                                        <td className="py-2 text-right">
                                            <Currency value={monthData.cashFlow} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className={`font-bold ${parseFloat(yearlyTotal) >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                                    <td className="py-3 text-lg">Total do Ano</td>
                                    <td className="py-3 text-right text-lg">
                                        <Currency value={yearlyTotal} />
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </section>

                {/* Footer */}
                <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
                    <p>Relatório gerado em {new Date().toLocaleDateString('pt-BR')}</p>
                    <p className="mt-1">Residencial Veredas - Gestão de Condomínio</p>
                </footer>
            </div>
        </div>
    )
}
