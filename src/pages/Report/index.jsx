import {
    Link,
    useParams
} from "react-router-dom"
import { useSelector } from 'react-redux'

import Currency from "../../components/Currency"

import { filterByDate, calculateCashFlow } from "../../services/sheets"

export default function Report() {
    const { year, month } = useParams();
    const loading = useSelector((state) => state.sheets.loading)
    const data = useSelector((state) => filterByDate(month, year, state.sheets.entities))
    const cashFlow = calculateCashFlow(data)

    if (loading) return "Buscando dados..."

    return (
        <div>
            <Link to="/">Voltar</Link>
            <h2>Relatório de {month} de {year}</h2>
            <table>
                <tr>
                    <th>Data</th>
                    <th>Morador</th>
                    <th>Valor</th>
                    <th>Observação</th>
                </tr>
                {data.map(item =>
                    <tr>
                        <td>{item["Data"]}</td>
                        <td>{item["Morador"]}</td>
                        <td>{item["Valor"]}</td>
                        <td>{item["Observação"]}</td>
                    </tr>
                )}
            </table>

            <h3>
                <Currency
                    label="Fluxo de Caixa"
                    value={cashFlow}
                />
            </h3>
        </div>
    )
}