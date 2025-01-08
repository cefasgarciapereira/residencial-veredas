import Menu from "./Menu"
import ReportSummary from "../../components/ReportSummary"
import PaymentPerPerson from "../../components/PaymentPerPerson"

import IncomeCardWidget from "../../components/IncomeCardWidget"

export default function Home() {
    return (
        <>
            <h1>Relatório financeiro do Residencial Veredas</h1>
            <IncomeCardWidget />
            <ReportSummary />
            <PaymentPerPerson />
        </>
    )
}