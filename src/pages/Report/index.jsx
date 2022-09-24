import { useEffect, useState } from "react"
import {
    Link,
    useParams
} from "react-router-dom"
import { useSelector } from 'react-redux'

import { fetchByDate, filterByDate } from "../../services/sheets"

export default function Report() {
    const { year, month } = useParams();
    const loading = useSelector((state) => state.sheets.loading)
    const data = useSelector((state) => filterByDate(month, year, state.sheets.entities))
    const cashFlow = data.reduce((previousValue, item) => previousValue + parseFloat(item["Valor"].replace("R$ ", "").replace(".", "").replace(",", ".")), 0).toFixed(2)

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
                Fluxo de Caixa:{" "}
                <b
                    style={{
                        color: cashFlow < 0 ? "red" : "lightgreen"
                    }}
                >
                    R$ {cashFlow}
                </b>
            </h3>
        </div>
    )
}