import useThemeStyle from '../../hooks/useThemeStyle';
import { useState } from 'react';
import {
  Col,
  Row,
  Typography,
  Steps,
  Form,
  Select,
  Input,
  Button
} from 'antd';
import { InputOTP } from 'antd-input-otp';

const columnStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  AlignItems: 'center',
  gap: '2rem',
};

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function Register() {
  const [step, setStep] = useState(0);
  const { themeStyle } = useThemeStyle();

  return (
    <Row style={{ height: '100vh', ...themeStyle }}>
      <Col span={8} offset={8} style={columnStyle}>
        {step === 1 ? (
          <Typography.Title level={2}>Please enter the verification code</Typography.Title>
        ) : (
          <Typography.Title style={{ margin: '0 auto' }} level={2}>Create a new account</Typography.Title>
        )}

        {(step === 0 || step === 1) && (
          <Steps
            size="small"
            style={{ width: '100%' }}
            labelPlacement='vertical'
            current={step}
            items={[
              {
                title: 'Account',
              },
              {
                title: 'Verification',
              },
            ]}
          />
        )}

        {step === 0 && (
          <Form
            layout='vertical'
            size='large'
          >
            <Form.Item label="I'm">
              <Select>
                <Select.Option value="client">Looking for translators</Select.Option>
                <Select.Option value="translator">A translator</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label='Phone number'>
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type='primary' block htmlType='submit'>Submit</Button>
            </Form.Item>
          </Form>
        )}

        {step === 1 && (
          <Form
            layout='vertical'
            size='large'
          >
            <Form.Item name="otp">
              <InputOTP inputType="numeric" />
            </Form.Item>

            <Form.Item>
              <Button type='primary' block htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        )}

        {step === 2 && (
          <Form
            // layout='vertical'
            {...formItemLayout}
          >
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="name"
              label="Name"
              tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: 'Please input your nickname!',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="name"
              label="Last Name"
              tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: 'Please input your nickname!',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type='primary' htmlType="submit">Continue</Button>
            </Form.Item>
          </Form>
        )}
      </Col>
    </Row>
  );
}

export { Register };