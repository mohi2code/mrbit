/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { useMemo, useState } from 'react';
import { selectCreds } from '../../auth/authSlice';
import { firestore } from '../../../services/firebaseConfig';
import { query, collection, and, where, doc, deleteDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { StyledSpace } from './NewProposalDetails';
import { Badge, Button, Card, Descriptions, Popconfirm, Skeleton, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';

function ProposalsList() {
  const user = useSelector(selectCreds);

  const [snapshot, loading, error] = useCollection(
    query(collection(firestore, 'proposals'), and(
      where('client', '==', user.email)
    ))
  );

  if (error)
    return <h1>Unexpected Error, Check the Console</h1>;

  if (loading)
    return <Skeleton active />;
  else {
    if (snapshot?.docs.length > 0)
      return <ProposalsCards data={serializeDocuments(snapshot?.docs)} />;
    else
      return <Empty />;
  }
}

function serializeDocuments(documents) {
  return documents.map(document => ({
    key: document.id,
    data: document,
  }));
}

function ProposalsCards({ data }) {
  const proposals = useMemo(() => data.map(({ key, data }) => (
    <ProposalCard key={key} data={data} />
  )), [data]);

  return (
    <StyledSpace>
      {proposals}
    </StyledSpace>
  );
}

function ProposalCard({ data }) {
  return (
    <Card
      bordered={false}
      actions={[
        <InviteAnotherTranslator isTranslator={data.get('translator')} id={data.id} key='invite-another' />,
        <DeleteProposal key='delete' id={data.id} />,
      ]}
    >
      <Descriptions
        bordered
        title={data.get('title')}
        items={cardItems(data)}
      />
    </Card>
  );
}

function cardItems(data) {
  const items = [];
  items.push(
    {
      key: 1,
      label: 'Details',
      children: data.get('description'),
    },
    {
      key: 2,
      label: 'Type',
      children: data.get('type') === 'document' ? 'Document Translation' :
        'Session Translation',
    },
    {
      key: 101,
      label: 'Assigned Translator',
      children: data.get('translator') ? <Badge status='processing' text={data.get('translator')} />
        : <Badge status='default' text='Not assigned yet' />
    },
    {
      key: 102,
      label: 'Invited Translator',
      children: data.get('invitedTranslator') ? <Badge status='warning' text={data.get('invitedTranslator')} />
        : <Badge status='default' text='Not assigned yet' />
    },
  );

  if (data.get('type') === 'document')
    items.push(
      {
        key: 3,
        label: 'Deadline',
        children: data.get('deadline'),
      },
      {
        key: 4,
        label: 'Language',
        children: data.get('language'),
      },
    );
  else
    items.push(
      {
        key: 5,
        label: 'Date',
        children: data.get('date'),
      },
      {
        key: 6,
        label: 'Starting Time',
        children: data.get('starting_time'),
      },
      {
        key: 7,
        label: 'Finishing Time',
        children: data.get('finishing_time'),
      },
    );

  return items;
}

function InviteAnotherTranslator({ isTranslator, id }) {
  const navigate = useNavigate();

  return !isTranslator && <Button
    type='primary'
    onClick={() => navigate(`new/proposal-translator/${id}`)}
  >
    Invite different translator
  </Button>;
}

function DeleteProposal({ id }) {
  const [loading, setLoading] = useState(false);

  async function deleteProposal() {
    setLoading(true);
    try {
      const proposalRef = doc(firestore, 'proposals', id);
      await deleteDoc(proposalRef);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Popconfirm
      title='Delete the proposal'
      description='Are you sure to delete this proposal? data cannot be restored'
      onConfirm={() => deleteProposal()}
      okText='Yes, delete now'
      cancelText='Cancel'
    >
      <Button loading={loading} danger >Delete</Button>
    </Popconfirm>
  );
}

export default ProposalsList;
