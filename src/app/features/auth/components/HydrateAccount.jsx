import { firestore } from '../../../services/firebaseConfig';
import { collection, query, where, and } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { selectCreds, setAccount } from '../authSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function HydrateAccount() {
  const dispatch = useDispatch();
  const credentials = useSelector(selectCreds);

  const [snapshot, loading, error] = useCollection(
    query(
      collection(firestore, 'accounts'),
      and(where('email', '==', credentials.email))
    )
  );

  useEffect(() => {
    if (!error && snapshot) {
      const document = snapshot?.docs[0];
      dispatch(setAccount({
        accounType: document.get('accountType'),
        isActivated: document.get('isActivated'),
      }));
    }

  }, [snapshot, error, dispatch]);

  return loading ? <h1>Hydrating user profile, processing</h1> : <Outlet />;
}

export default HydrateAccount;