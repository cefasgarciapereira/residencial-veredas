import { CButton } from '@coreui/react'

export default function Whatssapp() {


  const GROUP_LINK = "https://chat.whatsapp.com/H7DJF9ed0CHEZAI0FPYsu7"

  return (
    <>
      Entrar no grupo de whatsapp do condomínio via link ou qrcode.

      <CButton color="primary" href={GROUP_LINK}>Entrar</CButton>
      <img src="https://api.qrserver.com/v1/create-qr-code/?color=000000&amp;bgcolor=FFFFFF&amp;data=https%3A%2F%2Fchat.whatsapp.com%2FH7DJF9ed0CHEZAI0FPYsu7&amp;qzone=1&amp;margin=0&amp;size=400x400&amp;ecc=L" alt="qr code" />
    </>
  )
}