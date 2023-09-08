/* eslint-disable react/prop-types */
import { Button, Table, Tag, Typography } from 'antd';
import { firestore } from './app/services/firebaseConfig';
import { query, collection, updateDoc, doc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

function UsersList() {
  const [snapshot, loading, error] = useCollection(
    query(collection(firestore, 'accounts'))
  );

  if (error)
    return <h1>An Unexpected error occured, check the console</h1>;

  return loading ?
    <h1>UsersList, processing...</h1> :
    <UsersTable data={serializeDocuments(snapshot.docs)} />;
}

function UsersTable({ data }) {
  return <Table
    title={() => <Typography.Title level={3}>Users List</Typography.Title>}
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
          isActivated ? <></> : <ActivateButton docId={id} />
        )
      }
    ]}
    dataSource={data}
  />;
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

function ActivateButton({ docId }) {
  async function activateAccount() {
    try {
      const accountRef = doc(firestore, 'accounts', docId);
      await updateDoc(accountRef, { isActivated: true });
    } catch (error) {
      console.log(error);
    }
  }

  return <Button onClick={() => activateAccount()}>Activate</Button>;
}

export default UsersList;
