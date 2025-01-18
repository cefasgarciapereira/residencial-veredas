import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilArrowTop } from '@coreui/icons'
import { CChartLine } from '@coreui/react-chartjs'
import {
  CWidgetStatsA,
} from '@coreui/react'
import { useSelector } from 'react-redux'

import { parseMonthToString, getMaximumValueFromArray, getMinimumValueFromArray } from "../../services/utils"

const OutcomeCardWidget = () => {
  const { sheets } = useSelector((state) => state)
  const { outcomes, loading, error } = sheets

  if (error) return "Erro ao calcular o total na conta"

  if (loading) return null;

  return (
    <CWidgetStatsA
      color="danger"
      value={
        <>
          R$ {parseFloat(outcomes.reduce((total, item) => total + item.value, 0)).toFixed(2)}{' '}
          <span className="fs-6 fw-normal">
            (40.9% <CIcon icon={cilArrowTop} />)
          </span>
        </>
      }
      title="Despesas"
      chart={
        <CChartLine
          className="mt-3 mx-3"
          style={{ height: '70px' }}
          data={{
            labels: outcomes.map(item => parseMonthToString(item.month)),
            datasets: [
              {
                label: 'Receita',
                backgroundColor: 'transparent',
                borderColor: 'rgba(255,255,255,.55)',
                pointBackgroundColor: 'transparent',
                data: outcomes.map(item => item.value),
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
                  display: true,
                  color: 'rgba(255,255,255,.55)'
                },
              },
              y: {
                min: getMinimumValueFromArray(outcomes.map(item => item.value)) * 0.5,
                max: getMaximumValueFromArray(outcomes.map(item => item.value)) * 1.1,
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

export default OutcomeCardWidget