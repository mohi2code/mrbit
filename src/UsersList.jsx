/* eslint-disable react/prop-types */
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
  const rows = data.map((row, i) => (
    <tr key={i}>
      <td>{row.id}</td>
      <td>{row.email}</td>
      <td>{row.accountType}</td>
      <td>{row.isActivated ? <>Active</> : <>Not Active</>}</td>
      <td>{
        row.isActivated ? <></> :
          <ActivateButton id={row.id} />
      }</td>
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Account Type</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

function serializeDocuments(documents) {
  return documents.map(document => ({
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

  return <button onClick={() => activateAccount()}>Activate</button>;
}

export default UsersList;
