import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilArrowTop } from '@coreui/icons'
import { CChartLine } from '@coreui/react-chartjs'
import {
  CWidgetStatsA,
} from '@coreui/react'
import { useSelector } from 'react-redux'

import { parseMonthToString, getMaximumValueFromArray, getMinimumValueFromArray } from "../../services/utils"

const BalancesCardWidget = () => {
  const { sheets } = useSelector((state) => state)
  const { totalInAccount, balances, loading, error } = sheets

  if (error) return "Erro ao calcular o total na conta"

  if (loading) return null;

  return (
    <CWidgetStatsA
      color="info"
      value={
        <>
          R$ {totalInAccount}{' '}
          <span className="fs-6 fw-normal">
            (40.9% <CIcon icon={cilArrowTop} />)
          </span>
        </>
      }
      title="Receita"
      chart={
        <CChartLine
          className="mt-3 mx-3"
          style={{ height: '70px' }}
          data={{
            labels: balances.map(item => parseMonthToString(item.date)),
            datasets: [
              {
                label: 'Receita',
                backgroundColor: 'transparent',
                borderColor: 'rgba(255,255,255,.55)',
                pointBackgroundColor: '#39f',
                data: balances.map(item => item.value),
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            maintainAspectRatio: false,
            scales: {
              x: {
                border: {
                  display: false,
                },
                grid: {
                  display: false,
                },
                ticks: {
                  display: false,
                  color: 'rgba(255,255,255,.55)'
                },
              },
              y: {
                min: getMinimumValueFromArray(balances.map(item => item.value)) * 2,
                max: getMaximumValueFromArray(balances.map(item => item.value)) * 1.5,
                display: false,
                grid: {
                  display: false,
                },
                ticks: {
                  display: false,
                },
              },
            },
            elements: {
              line: {
                borderWidth: 1,
              },
              point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
              },
            },
          }}
        />
      }
    />
  )
}

export default BalancesCardWidget