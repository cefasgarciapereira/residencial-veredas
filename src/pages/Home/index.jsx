import {
    CContainer,
    CCol,
    CRow
} from '@coreui/react'

import PaymentPerPerson from "../../components/PaymentPerPerson"

import BalancesCardWidget from "../../components/BalancesCardWidget"
import IncomeCardWidget from "../../components/IncomeCardWidget"
import OutcomeCardWidget from "../../components/OutcomeCardWidget"
import CashFlowCardWidget from "../../components/CashFlowCardWidget"

export default function Home() {
    return (
        <>
            <h1>Relatório financeiro do Residencial Veredas</h1>
            <CContainer>
                <CRow xs={{ rows: '*' }} md={{ rows: 1 }} className='gap-2'>
                    <CCol><BalancesCardWidget /></CCol>
                    <CCol><IncomeCardWidget /></CCol>
                    <CCol><OutcomeCardWidget /></CCol>
                    <CCol><CashFlowCardWidget /></CCol>
                </CRow>
            </CContainer>
            <PaymentPerPerson />
        </>
    )
}