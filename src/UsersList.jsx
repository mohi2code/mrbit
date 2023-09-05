import { Button, Table, Tag } from 'antd';
import { useAccountsListQuery } from './app/services/firebaseAPI';

const columns = [
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'name',
    render: (text) => <>{text}</>,
  },
  {
    title: 'Account Type',
    dataIndex: 'accountType',
    key: 'age',
  },
  {
    dataIndex: 'isActivated',
    render: (_, { isActivated }) => (
      isActivated
        ?
        <></>
        :
        <Tag color='warning'>Not Activated</Tag>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      record.isActivated
        ?
        <></>
        :
        <Button type='default'>activate</Button>
    ),
  },
];

function UsersList() {
  const usersList = useAccountsListQuery();

  return <Table
    loading={usersList.isLoading}
    columns={columns}
    dataSource={usersList.data}
  />
}

export default UsersList
