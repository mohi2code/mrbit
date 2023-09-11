/* eslint-disable react/prop-types */
import { Form, Space, Radio, theme } from 'antd';
import { useState } from 'react';
import NewDocumentProposal from './NewDocumentProposal';
import NewSessionProposal from './NewSessionProposal';

function NewProposalDetails() {
  const [type, setType] = useState('document');

  function onValuesChange({ type }) {
    setType(type);
  }

  return (
    <StyledSpace>
      <Form
        {...formItemLayout}
        onValuesChange={onValuesChange}
        initialValues={{ type }}
      >
        <SelectProposalType type={type} />
      </Form>

      {type === 'document' && <NewDocumentProposal />}
      {type === 'session' && <NewSessionProposal />}
    </StyledSpace>
  );
}

export function StyledSpace({ children }) {
  const { token } = theme.useToken();

  const spaceStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: token.colorBgContainer,
    padding: token.padding,
    borderRadius: token.borderRadius,
    border: `1px solid ${token.colorBorder}`,
    overflow: 'scroll'
  };

  return (
    <Space
      direction='vertical'
      size='large'
      style={spaceStyle}
    >
      {children}
    </Space>
  );
}

function SelectProposalType({ type }) {
  return (
    <Form.Item
      name='type'
      label='Select proposal type'
    >
      <Radio.Group value={type}>
        <Radio.Button value="document">Document Translation</Radio.Button>
        <Radio.Button value="session">Session Translation</Radio.Button>
      </Radio.Group>
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

export default NewProposalDetails;
