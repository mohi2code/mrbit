/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCreds } from '../../auth/authSlice';
import { firestore, storage } from '../../../services/firebaseConfig';
import { query, collection, and, where, doc, updateDoc } from 'firebase/firestore';
import { ref as storageRef } from 'firebase/storage';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { useMemo, useState } from 'react';
import { StyledSpace } from './NewProposalDetails';
import { Button, Card, Descriptions, Empty, Skeleton } from 'antd';

function InvitationsList() {
  const user = useSelector(selectCreds);
  const [snapshot, loading, error] = useCollection(
    query(collection(firestore, 'proposals'), and(
      where('invitedTranslator', '==', user?.email)
    ))
  );

  if (error)
    return <h1>Unexpected Error, Check Console</h1>;

  if (loading)
    return <Skeleton active />;
  else {
    if (snapshot?.docs.length > 0)
      return <InvitationsCards data={serializeDocuments(snapshot?.docs)} />;
    else
      return <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} />;
  }
}

function serializeDocuments(documents) {
  return documents.map(document => ({
    key: document.id,
    data: document,
  }));
}

function InvitationsCards({ data }) {
  const invitations = useMemo(() => data.map(({ key, data }) => (
    <InvitationsCard key={key} data={data} />
  )), [data]);

  return (
    <StyledSpace>
      {invitations}
    </StyledSpace>
  );
}

function InvitationsCard({ data }) {
  return (
    <Card
      actions={[
        <AcceptInvitation id={data.id} key='accept' />,
        <RjectInvitation id={data.id} key='reject' />,
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
  );

  if (data.get('type') === 'document') {
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

    if (data.get('documentFullPath') != null)
      items.push(
        {
          key: 102,
          label: 'Document',
          children: <DocumentDownloadURL
            fullPath={`/${data.get('documentFullPath')}`}
          />
        }
      );
  } else {
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
  }

  return items;
}

function DocumentDownloadURL({ fullPath }) {
  const [value] = useDownloadURL(storageRef(storage, fullPath));

  return <Link to={value} target="_blank" rel="noopener noreferrer">View document</Link>;
}

function AcceptInvitation({ id }) {
  const user = useSelector(selectCreds);
  const [loading, setLoading] = useState(false);

  async function acceptInvitation() {
    setLoading(true);
    try {
      const proposalRef = doc(firestore, 'proposals', id);
      await updateDoc(proposalRef, {
        translator: user.email,
        invitedTranslator: null,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return <Button loading={loading} onClick={() => acceptInvitation()}>Accept</Button>;
}

function RjectInvitation({ id }) {
  const [loading, setLoading] = useState(false);

  async function rjectInvitation() {
    setLoading(true);
    try {
      const proposalRef = doc(firestore, 'proposals', id);
      await updateDoc(proposalRef, {
        invitedTranslator: null,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return <Button loading={loading} onClick={() => rjectInvitation()}>Reject</Button>;
}

export default InvitationsList;
