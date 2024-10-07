import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { brlStringToFloat, floatToBrlString, parseMonthToInt } from "../../services/utils"

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

    if (error) return "Erro ao calcular o total na conta"

    if (loading) return null;

    return (
        <>
            <h2>Pagamento por residente</h2>
            <table>
                <thead>
                    <tr>
                        <td>Residente</td>
                        <td>Número de Pagamentos</td>
                        <td>Valor Total</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        residents.map(resident => {
                            const numberOfOccurencies = thisYearData
                                .filter(data => data['Morador'] === resident)
                                .length

                            const totalValue = thisYearData
                                .filter(data => data['Morador'] === resident)
                                .reduce((sum, item) => sum + brlStringToFloat(item["Valor"]), 0)

                            return (
                                <tr key={resident}>
                                    <td>{resident}</td>
                                    <td>{numberOfOccurencies}</td>
                                    <td style={{ textAlign: "right" }}>{floatToBrlString(totalValue)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {`* Valor total esperado por apartamento ${floatToBrlString(120 * ((new Date().getMonth()) + 1))}`}
        </>
    )
}