import { Link, useParams } from "react-router-dom"
import { useSelector } from 'react-redux'

import Currency from "../../components/Currency"

import { filterByDate, calculateCashFlow } from "../../services/sheets"

export default function Report() {
    const { year, month } = useParams();
    const loading = useSelector((state) => state.sheets.loading)
    const data = useSelector((state) => filterByDate(month, year, state.sheets.entities))
    const cashFlow = calculateCashFlow(data)

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-64 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
            </div>
        )
    }

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
                <h2 className="text-2xl font-bold text-white capitalize">
                    Relatório Financeiro
                </h2>
                <span className="capitalize text-white">
                    {month} {year}
                </span>
            </header>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Data</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Morador</th>
                                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Valor</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Observação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr
                                    key={`${item["Valor"]}${item["Morador"]}${index}`}
                                    className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}
                                >
                                    <td className="py-4 px-6 text-gray-600">{item["Data"]}</td>
                                    <td className="py-4 px-6 text-gray-800">{item["Morador"]}</td>
                                    <td className="py-4 px-6 text-right font-medium text-gray-800">{item["Valor"]}</td>
                                    <td className="py-4 px-6 text-gray-600">{item["Observação"]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className={`p-6 border-t-2 ${cashFlow >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${cashFlow >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                                <svg
                                    className={`w-6 h-6 ${cashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-lg font-semibold text-gray-800">Fluxo de caixa</span>
                        </div>
                        <Currency value={cashFlow} />
                    </div>
                </div>
            </div>
        </div>
    )
}