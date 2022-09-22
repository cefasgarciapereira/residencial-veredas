import { useEffect, useState } from "react";
import {
    useParams
} from "react-router-dom"

import { fetchByDate } from "../../services/sheets";

export default function Report() {
    const { year, month } = useParams();
    const [data, setData] = useState(null);
    const [cashFlow, setCashFlow] = useState();

    useEffect(() => {
        async function fetchData() {
            let res = await fetchByDate(month, year);
            setData(res)
            setCashFlow(res.reduce((previousValue, item) => previousValue + parseFloat(item["Valor"].replace("R$ ", "").replace(".", "").replace(",", ".")), 0).toFixed(2))
        }
        fetchData()
    }, [])

    if (!data) return "Buscando dados..."

    return (
        <div>
            <h1>Relatório de {month} de {year}</h1>

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