import React from 'react'
import {
  CBadge,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CSidebarToggler,
  CNavGroup,
  CNavItem,
  CNavTitle,
  CContainer,
  CRow,
  CCol
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilDollar, cilPuzzle, cilDrop, cilLightbulb, cilPhone, cilCamera, cilCircle } from '@coreui/icons'

import { useMonths } from '../../hooks/useMonths'

const Layout = ({ children }) => {
  const { months } = useMonths()

  return (
    <CContainer fluid>
      <CRow>
        <CCol xs={2}>
          <CSidebar
            className="border-end"
            colorScheme="dark"
            position="fixed"
            unfoldable={false}
            visible={true}
          >
            <CSidebarHeader className="border-bottom">
              <CSidebarBrand href='/'>Residencial Veredas</CSidebarBrand>
            </CSidebarHeader>
            <CSidebarNav>
              <CNavTitle>Financeiro</CNavTitle>
              <CNavGroup
                toggler={
                  <>
                    <CIcon customClassName="nav-icon" icon={cilDollar} /> Condomínio
                  </>
                }
              >
                {months.map((item, index) => (
                  <CNavItem>
                    <CNavGroup
                      toggler={
                        <>
                          <span className="nav-icon">
                            <span className="nav-icon-bullet"></span>
                          </span>{' '}
                          {item.year}
                        </>
                      }
                    >
                      {item.months.map((month, index) => (
                        <CNavItem href={`/${item.year}/${month}`}>
                          <span className="nav-icon">
                            <span className="nav-icon-bullet"></span>
                          </span>{' '}
                          {month}
                        </CNavItem>

                      ))}

                    </CNavGroup>
                  </CNavItem>
                ))}
              </CNavGroup>
              <CNavItem href="/dmae">
                <CIcon customClassName="nav-icon" icon={cilDrop} /> DMAE
              </CNavItem>
              <CNavItem href="/dme">
                <CIcon customClassName="nav-icon" icon={cilLightbulb} /> DME
              </CNavItem>
              <CNavTitle>Utilidades</CNavTitle>
              <CNavItem href="whatsapp">
                <CIcon customClassName="nav-icon" icon={cilPhone} /> Whatsapp
              </CNavItem>
              <CNavItem href="/camera">
                <CIcon customClassName="nav-icon" icon={cilCamera} /> Câmera
              </CNavItem>
            </CSidebarNav>
            <CSidebarHeader className="border-top">
              <CSidebarToggler />
            </CSidebarHeader>
          </CSidebar>
        </CCol>
        <CCol xs="auto">
          {children}
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Layout