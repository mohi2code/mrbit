/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { selectCreds } from '../../auth/authSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore, storage } from '../../../services/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { ref as storageRef } from 'firebase/storage';
import { useUploadFile } from 'react-firebase-hooks/storage';
import { Form, Input, Upload, DatePicker, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function NewDocumentProposal() {
  const user = useSelector(selectCreds);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadFile] = useUploadFile();

  async function onFinish({
    title,
    language,
    deadline,
    description,
    upload,
  }) {
    setLoading(true);
    try {
      /** File Upload logic  */
      const file = upload?.fileList[0];
      const fileRef = storageRef(storage, `${file.name}-${Date.now()}`);
      const result = await uploadFile(fileRef, file.originFileObj);
      const documentFullPath = result.metadata.fullPath;

      const ref = collection(firestore, 'proposals');
      const doc = await addDoc(ref, {
        type: 'document',
        title,
        language,
        deadline: deadline?.toString(),
        description,
        client: user.email,
        documentFullPath,
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
      onFinish={onFinish}
      disabled={loading}
      initialValues={{ description: "" }}
    >
      <TitleField />
      <LanguageField />
      <DocumentUploadField />
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

function DocumentUploadField() {
  return (
    <Form.Item
      name='upload'
      label='Document PDF'
      valuePropName='file'
    >
      <Upload
        beforeUpload={() => { return false; }}
        listType="picture-card"
      >
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
