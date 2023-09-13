import { firestore } from '../../../services/firebaseConfig';
import { collection, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Badge, Button, Card, Col, Row, Space, Statistic, Table } from 'antd';
import { UserOutlined, FolderOpenFilled, PlusOutlined } from '@ant-design/icons';
import { useMemo } from 'react';

function DashboardHome() {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <UsersStatistics />
      </Col>

      <Col span={12}>
        <ProposalsStatistics />
      </Col>
    </Row>
  );
}

function UsersStatistics() {
  const [snapshot, loading,] = useCollection(
    query(collection(firestore, 'accounts'))
  );

  const stats = useTransformUsersDocs(snapshot?.docs || []);

  return (
    <Space size='middle' style={{ width: '100%' }} direction='vertical'>
      <Row gutter={16}>
        <Col span={8}>
          <Card loading={loading}>
            <Statistic
              title='Total users number'
              value={stats.total}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Card loading={loading}>
            <Statistic
              title='Clients'
              value={stats.clients}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card loading={loading}>
            <Statistic
              title='Translators'
              value={stats.translators}
            />
          </Card>
        </Col>
      </Row>

      <Table
        dataSource={serializeUsersDocuments(snapshot?.docs || [])}
        columns={[
          {
            title: 'E-mail',
            dataIndex: 'email'
          },
          {
            title: 'Status',
            data: 'isActivated',
            render: (_, { isActivated }) => (
              isActivated ?
                <Badge status='processing' text='Active' /> :
                <Badge status='warning' text='Not Active' />
            )
          },
        ]}
        scroll={{ y: 300 }}
      />
    </Space>
  );
}

function useTransformUsersDocs(docs) {
  const total = useMemo(() => docs?.length, [docs]);

  const clients = useMemo(() => (
    docs.reduce((prev, current) => {
      if (current.get('accountType') === 'client')
        return prev + 1;
      else
        return prev;
    }, 0)
  ), [docs]);

  const translators = useMemo(() => (
    docs.reduce((prev, current) => {
      if (current.get('accountType') === 'translator')
        return prev + 1;
      else
        return prev;
    }, 0)
  ), [docs]);

  return { total, clients, translators };
}

function serializeUsersDocuments(documents) {
  return documents.map(document => ({
    key: document.id,
    email: document.get('email'),
    isActivated: document.get('isActivated')
  }));
}

function ProposalsStatistics() {
  const [snapshot, loading,] = useCollection(
    query(collection(firestore, 'proposals'))
  );

  const stats = useTransformProposalsDocs(snapshot?.docs || []);

  return (
    <Space size='middle' style={{ width: '100%' }} direction='vertical'>
      <Row gutter={16}>
        <Col span={16}>
          <Card loading={loading} >
            <Statistic
              title='Open Proposals'
              value={stats.open}
              prefix={<FolderOpenFilled />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Card loading={loading} >
            <Button type='dashed' icon={<PlusOutlined />}>Create a new proposal</Button>
          </Card>
        </Col>
      </Row>

      <Table
        dataSource={serializeProposalsDocuments(snapshot?.docs || [])}
        columns={[
          {
            title: 'Client',
            dataIndex: 'client'
          },
        ]}
        scroll={{ y: 300 }}
      />
    </Space>
  );
}

function useTransformProposalsDocs(docs) {
  const open = useMemo(() => (
    docs.reduce((prev, current) => {
      if (current.get('translator') == null)
        return prev + 1;
      else
        return prev;
    }, 0)
  ), [docs]);

  return { open };
}

function serializeProposalsDocuments(documents) {
  return documents.map(document => ({
    key: document.id,
    client: document.get('client'),
  }));
}

export default DashboardHome;
