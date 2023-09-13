/* eslint-disable react/prop-types */
import { firestore } from '../../../services/firebaseConfig';
import { query, collection, updateDoc, doc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Button, Drawer, Empty, Skeleton, Table, Tag, Typography, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import NewUserForm from './NewUserForm';

function UsersList() {
  const [snapshot, loading, error] = useCollection(
    query(collection(firestore, 'accounts'))
  );

  const [newAccDrawer, setNewAccDrawer] = useState(false);

  if (error)
    return <h1>An Unexpected error occured, check the console</h1>;

  if (loading)
    return <Skeleton active />;
  else {
    if (snapshot?.docs.length > 0)
      return (
        <>
          <UsersTable
            data={serializeDocuments(snapshot.docs)}
            setNewAccDrawer={setNewAccDrawer}
          />
          <NewUserDrawer
            newAccDrawer={newAccDrawer}
            setNewAccDrawer={setNewAccDrawer}
          />
        </>
      );
    else
      return <Empty />;
  }
}

function NewUserDrawer({ newAccDrawer, setNewAccDrawer }) {
  return (
    <Drawer
      title='New User'
      placement='right'
      open={newAccDrawer}
      onClose={() => setNewAccDrawer(false)}
    >
      <NewUserForm setNewAccDrawer={setNewAccDrawer} />
    </Drawer>
  );
}

function UsersTable({ data, setNewAccDrawer }) {
  const [api, contextHolder] = notification.useNotification();

  return (
    <>
      <Table
        title={() => <TableHeader setNewAccDrawer={setNewAccDrawer} />}
        columns={[
          {
            title: 'ID',
            dataIndex: 'id',
          },
          {
            title: 'E-mail',
            dataIndex: 'email'
          },
          {
            title: 'Account Type',
            dataIndex: 'accountType'
          },
          {
            title: 'Status',
            data: 'isActivated',
            render: (_, { isActivated }) => (
              isActivated ? <Tag color='green'>active</Tag> : <Tag color='orange'>not active</Tag>
            )
          },
          {
            key: 'action',
            render: (_, { id, isActivated }) => (
              isActivated ? <></> : <ActivateButton notificationAPI={api} docId={id} />
            )
          }
        ]}
        dataSource={data}
      />
      {contextHolder}
    </>
  );
}

function TableHeader({ setNewAccDrawer }) {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
      }}
    >
      <Typography.Title level={3}>Users List</Typography.Title>
      <Button
        icon={<PlusOutlined />}
        onClick={() => setNewAccDrawer(true)}
      >
        Create a new user
      </Button>
    </div>
  );
}

function serializeDocuments(documents) {
  return documents.map(document => ({
    key: document.id,
    id: document.id,
    email: document.get('email'),
    accountType: document.get('accountType'),
    isActivated: document.get('isActivated')
  }));
}

function ActivateButton({ docId, notificationAPI }) {
  async function activateAccount() {
    try {
      const accountRef = doc(firestore, 'accounts', docId);
      await updateDoc(accountRef, { isActivated: true });
      notificationAPI?.success({
        message: 'User was activated successfully!',
        duration: 3,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return <Button onClick={() => activateAccount()}>Activate</Button>;
}

export default UsersList;
