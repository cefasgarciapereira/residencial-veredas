import { useSelector } from 'react-redux'
import { calculateCashFlow } from '../../services/sheets'

import Currency from "../Currency"

export default function TotalIntoAccount() {
    const { loading, error, sheets } = useSelector((state) => state)
    const data = sheets.entities

    if (error) return "Erro ao calcular o total na conta"

    if (loading) return null;

    return (
        <h3>
            <Currency
                label="Total em conta"
                value={calculateCashFlow(data)}
            />
        </h3>
    )
}