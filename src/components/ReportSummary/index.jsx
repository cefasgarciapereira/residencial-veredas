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
            <table>
                <thead>
                    <tr>
                        <td>Tipo</td>
                        <td>Valor</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Entrada</td>
                        <td>
                            <Currency
                                value={totalProfit}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Gastos</td>
                        <td>
                            <Currency
                                value={totalExpenses}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Total em conta</td>
                        <td>
                            <Currency
                                value={totalInAccount}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}