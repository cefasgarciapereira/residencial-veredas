import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { brlStringToFloat, floatToBrlString } from "../../services/utils"

export default function PaymentPerPerson() {
    const { sheets } = useSelector((state) => state)
    const { loading, error } = sheets
    const [residents, setResidents] = useState([])
    const [thisYearData, setThisYearData] = useState([])
    const residentsToIgnore = ['Condominio', 'Condomínio']

    function getEntityYear(entity) {
        const date = entity.Data.split("/")
        return date[date.length - 1].toString()
    }

    function getPaymentPerPerson() {
        if (sheets.entities.length > 0) {
            const today = new Date()
            const thisYear = today.getFullYear().toString()
            const thisYearEntities = sheets.entities.filter(entity => getEntityYear(entity) === thisYear)
            const newResidents = []
            thisYearEntities.forEach(item => {
                if (!newResidents.includes(item['Morador']) && !residentsToIgnore.includes(item['Morador'])) {
                    newResidents.push(item['Morador'])
                }
            })
            setResidents(newResidents)
            setThisYearData(thisYearEntities)
        }
    }

    useEffect(() => {
        getPaymentPerPerson()
    }, [loading, error, sheets])

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
                Erro ao calcular o total na conta
            </div>
        )
    }

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="space-y-2">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-12 bg-gray-200 rounded"></div>
                    ))}
                </div>
            </div>
        )
    }

    const expectedValue = 120 * ((new Date().getMonth()) + 1)

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Pagamento por residente</h2>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b-2 border-gray-200">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Residente</th>
                            <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Pagamentos</th>
                            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Valor Total</th>
                            <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {residents.map((resident, index) => {
                            const numberOfOccurencies = thisYearData
                                .filter(data => data['Morador'] === resident)
                                .length

                            const totalValue = thisYearData
                                .filter(data => data['Morador'] === resident)
                                .reduce((sum, item) => sum + brlStringToFloat(item["Valor"]), 0)

                            const isUpToDate = totalValue >= expectedValue

                            return (
                                <tr
                                    key={resident}
                                    className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
                                >
                                    <td className="py-3 px-4 text-gray-800">{resident}</td>
                                    <td className="py-3 px-4 text-center text-gray-600">{numberOfOccurencies}</td>
                                    <td className="py-3 px-4 text-right font-medium text-gray-800">
                                        {floatToBrlString(totalValue)}
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        {isUpToDate ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                Em dia
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                Pendente
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                    * Valor total esperado por apartamento: <span className="font-semibold">{floatToBrlString(expectedValue)}</span>
                </p>
            </div>
        </div>
    )
}