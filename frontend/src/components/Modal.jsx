import { Button, Flex, Modal as ModalA } from 'antd'

const Modal = ({openResponsive, setOpenResponsive , children}) => {
  return (
    <Flex vertical gap='middle' align='flex-start'>
      <ModalA
        title='Task Details'
        centered
        open={openResponsive}
        onOk={() => setOpenResponsive(false)}
        onCancel={() => setOpenResponsive(false)}
        width={{
          xs: '90%',
          sm: '80%',
          md: '70%',
          lg: '60%',
          xl: '50%',
          xxl: '40%'
        }}
      >
        {children}
      </ModalA>
    </Flex>
  )
}
export default Modal
