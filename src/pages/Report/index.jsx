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
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Morador</th>
                        <th>Valor</th>
                        <th>Observação</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item =>
                        <tr key={`${item["Valor"]}${item["Morador"]}`}>
                            <td>{item["Data"]}</td>
                            <td>{item["Morador"]}</td>
                            <td>{item["Valor"]}</td>
                            <td>{item["Observação"]}</td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <h3>
                                Fluxo de caixa
                            </h3>
                        </td>
                        <td></td>
                        <td>
                            <Currency value={cashFlow} />
                        </td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}