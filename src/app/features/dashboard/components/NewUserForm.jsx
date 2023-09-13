/* eslint-disable react/prop-types */
import { Col, Form, Row, Button, Checkbox, Alert } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { AccountTypeField, EmailField, PasswordConfirmField, PasswordField } from '../../auth/components/Register';
import { auth, firestore } from '../../../services/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

function NewUserForm({ setNewAccDrawer }) {
  const [createUser, , loading, error] = useCreateUserWithEmailAndPassword(auth);

  async function onFinish({
    email,
    password,
    accountType,
    isActivated = false
  }) {
    const user = await createUser(email, password);
    user && await addDoc(collection(firestore, 'accounts'), {
      email: user.user.email,
      accountType,
      isActivated
    });
    setNewAccDrawer(false);
  }

  return (
    <Form
      onFinish={onFinish}
      layout='vertical'
      autoComplete='off'
      initialValues={{
        isActivated: true,
      }}
      disabled={loading}
    >
      {error && (
        <Form.Item>
          <Alert message={error.code} type='error' showIcon closable />
        </Form.Item>
      )}

      <EmailField />

      <Row gutter={16}>
        <Col span={12}>
          <PasswordField />
        </Col>
        <Col span={12}>
          <PasswordConfirmField />
        </Col>
      </Row>

      <AccountTypeField />

      <IsActivatedField />

      <SubmitButton loading={loading} />
    </Form>
  );
}

function IsActivatedField() {
  return (
    <Form.Item
      name="isActivated"
      valuePropName="checked"
    >
      <Checkbox>User activated by default</Checkbox>
    </Form.Item>
  );
}

function SubmitButton({ loading }) {
  return (
    <Form.Item>
      <Button loading={loading} icon={<UserAddOutlined />} type="primary" htmlType="submit" block>
        Create user account
      </Button>
    </Form.Item>
  );
}

export default NewUserForm;
