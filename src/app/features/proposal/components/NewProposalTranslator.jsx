/* eslint-disable react/prop-types */
import { useCollection } from 'react-firebase-hooks/firestore';
import { query, collection, and, where, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../../services/firebaseConfig';
import { Typography, Table, Button, notification } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

function NewProposalTranslator() {
  const [snapshot, loading, error] = useCollection(
    query(collection(firestore, 'accounts'), and(
      where('accountType', '==', 'translator')
    ))
  );

  if (error)
    return <h1>An Unexpected error occured, check the console</h1>;

  return loading ?
    <h1>UsersList, processing...</h1> :
    <TranslatorsTable data={serializeDocuments(snapshot.docs)} />;
}

function TranslatorsTable({ data }) {
  const [api, contextHolder] = notification.useNotification();

  return (
    <>
      <Table
        title={() => <Typography.Title level={3}>Invite translators</Typography.Title>}
        columns={[
          {
            title: 'E-mail',
            dataIndex: 'email'
          },
          {
            key: 'actions',
            render: (_, { email }) => <InvitationButton notificationAPI={api} translatorEmail={email} />
          }
        ]}
        dataSource={data}
      />

      {contextHolder}
    </>
  );
}

function serializeDocuments(documents) {
  return documents.map(document => ({
    key: document.id,
    id: document.id,
    email: document.get('email'),
  }));
}

function InvitationButton({ translatorEmail, notificationAPI }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function InviteTranslator() {
    setLoading(true);
    try {
      const proposalRef = doc(firestore, 'proposals', id);
      await updateDoc(proposalRef, { invitedTranslator: translatorEmail });
      notificationAPI?.success({
        message: 'Translator was invited successfully!',
        duration: 1,
        onClose: () => navigate('/dashboard/proposals')
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return <Button disabled={loading} onClick={() => InviteTranslator()}>Invite</Button>;
}


export default NewProposalTranslator;
