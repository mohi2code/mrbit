/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { selectCreds } from '../../auth/authSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../../services/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { Form, Input, DatePicker, Button, TimePicker } from 'antd';

function NewSessionProposal() {
  const user = useSelector(selectCreds);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function onFinish({
    title,
    date,
    starting_time,
    finishing_time,
    description,
  }) {
    setLoading(true);
    try {
      const ref = collection(firestore, 'proposals');
      const doc = await addDoc(ref, {
        type: 'session',
        title,
        date: date?.toString(),
        starting_time: starting_time?.toString(),
        finishing_time: finishing_time?.toString(),
        description: description,
        client: user.email,

      });
      navigate(`../proposal-translator/${doc.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form
      {...formItemLayout}
      disabled={loading}
      onFinish={onFinish}
      initialValues={{ description: "" }}
    >
      <TitleField />
      <DateField />
      <StartingTimeField />
      <FinishingTimeField />
      <DescriptionField />
      <SubmissionButton loading={loading} />
    </Form>
  );
}

function TitleField() {
  return (
    <Form.Item
      name="title"
      label="Title"
      rules={[{ required: true, message: 'Please input a title!', whitespace: true }]}
    >
      <Input />
    </Form.Item>
  );
}

function DateField() {
  return (
    <Form.Item
      name='date'
      label="Date"
    >
      <DatePicker />
    </Form.Item>
  );
}

function StartingTimeField() {
  return (
    <Form.Item
      name='starting_time'
      label='Session starting time'
    >
      <TimePicker />
    </Form.Item>
  );
}

function FinishingTimeField() {
  return (
    <Form.Item
      name='finishing_time'
      label='Session finishing time'
    >
      <TimePicker />
    </Form.Item>
  );
}

function DescriptionField() {
  return (
    <Form.Item
      name='description'
      label="Description"
    >
      <Input.TextArea rows={4} />
    </Form.Item>
  );
}

function SubmissionButton({ loading }) {
  return (
    <Form.Item {...buttonItemLayout}>
      <Button loading={loading} type='primary' htmlType='submit'>Continue</Button>
    </Form.Item>
  );
}

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 10,
  },
};

const buttonItemLayout = {
  wrapperCol: {
    span: 14,
    offset: 4,
  },
};

export default NewSessionProposal;
