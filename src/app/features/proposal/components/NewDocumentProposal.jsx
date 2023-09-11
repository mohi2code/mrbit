/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../../services/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { Form, Input, Upload, DatePicker, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function NewDocumentProposal() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function onFinish({
    title,
    language,
    deadline,
    description
  }) {
    setLoading(true);
    try {
      const ref = collection(firestore, 'proposals');
      const doc = await addDoc(ref, {
        type: 'document',
        title,
        language,
        deadline: deadline?.toString(),
        description: description ? description : null,
      });
      navigate(`../proposal-translator/${doc.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function uploadFile() { }

  return (
    <Form
      {...formItemLayout}
      onFinish={onFinish}
      disabled={loading}
    >
      <TitleField />
      <LanguageField />
      <DocumentUploadField uploadFile={uploadFile} />
      <DeadlineField />
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

function LanguageField() {
  return (
    <Form.Item
      name="language"
      label="Language"
      tooltip="The language you wish the document to be translated to"
      rules={[{ required: true, message: 'Please write a language!', whitespace: true }]}
    >
      <Input />
    </Form.Item>
  );
}

function DocumentUploadField({ uploadFile }) {
  return (
    <Form.Item
      label='Document PDF'
      valuePropName='fileList'
    >
      <Upload action={uploadFile} listType="picture-card">
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      </Upload>
    </Form.Item>
  );
}

function DeadlineField() {
  return (
    <Form.Item
      name='deadline'
      label='Deadline'
      rules={[{ required: true, message: 'Please input your deadline!' }]}
    >
      <DatePicker />
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

export default NewDocumentProposal;