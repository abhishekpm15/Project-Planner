import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { DatePicker, Form, Input, Rate, Select, Upload, Button } from 'antd'

const { TextArea } = Input

const normFile = e => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}


const selectOption = [
  'Core service',
  'Infra service',
  'Parent service',
  'Security service',
  'Omnichannel service',
  'Tax service',
  'Transaction service',
  'Transaction support service',
  'Backoffice service',
  'Sale service',
  'Price service',
  'Item service',
  'Tender service',
  'General issue (UI, Deployment)'
]
const API_URL = import.meta.env.VITE_BACKEND_URL

const TaskForm = ({ userId, setOpenResponsive, onFinish ,form}) => {

  // useEffect(() => {
  //   axios.post(`${API_URL}/api/task/addTasks`,
  //     {
  //       userId: userId,
  //       taskName: values.name,
  //       taskDescription: values.description,
  //       priority: getPriorityLabel(values.priority),
  //       dueDate: values.date
  //     }
  //   ).then((res) => {
  //     console.log("response " + res)
  //     setOpenResponsive(false)
  //   }).catch((error) => {
  //     console.log("error " + error)
  //   })
  // }, [])

 

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout='horizontal'
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
    >
      <Form.Item
        label='Task Name'
        name='taskName'
        rules={[{ required: true, message: 'Please enter task name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Select service'
        name='service'
        rules={[{ required: true, message: 'Please select a service' }]}
      >
        <Select>
          {selectOption.sort().map(option => (
            <Select.Option value={option} key={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label='End Date'
        name='endDate'
        rules={[{ required: true, message: 'Please select an end date' }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label='Description'
        name='description'
        rules={[{ required: true, message: 'Please enter task description' }]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label='Image'
        name='image'
        valuePropName='fileList'
        getValueFromEvent={normFile}
      >
        <Upload action='/upload.do' listType='picture-card'>
          <button type='button' style={{ border: 0, background: 'none' }}>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        </Upload>
      </Form.Item>

      <Form.Item label='Priority' name='priority'>
        <Rate />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default TaskForm
