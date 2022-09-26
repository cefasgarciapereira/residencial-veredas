import { useSelector } from 'react-redux'

import Currency from "../Currency"

export default function ReportSummary() {
    const { sheets } = useSelector((state) => state)
    const { totalInAccount, totalExpenses, totalProfit, loading, error } = sheets

    if (error) return "Erro ao calcular o total na conta"

    if (loading) return null;

    return (
        <>
            <h2>Resumo de todo período</h2>
            <h4>
                <Currency
                    label="Entrada"
                    value={totalProfit}
                />
            </h4>
            <h4>
                <Currency
                    label="Gastos"
                    value={totalExpenses}
                />
            </h4>
            <h3>
                <Currency
                    label="Total em conta"
                    value={totalInAccount}
                />
            </h3>
        </>
    )
}