// SearchComponent.js
import React, { useState } from 'react';
import { db } from './firebase';

const FindId = () => {
  const [docId, setDocId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const searchDocument = async () => {
    try {
      const docRef = db.collection('cuspot').doc(docId);
      const doc = await docRef.get();

      if (doc.exists) {
        setResult(doc.data());
        setError(null);
      } else {
        setResult(null);
        setError('No such document!');
      }
    } catch (err) {
      console.error("Error getting document:", err);
      setError('Error getting document.');
      setResult(null);
    }
  };

  return (
    <div>
      <h1>Search Firestore Document by ID</h1>
      <input
        type="text"
        value={docId}
        onChange={(e) => setDocId(e.target.value)}
        placeholder="Enter Document ID"
      />
      <button onClick={searchDocument}>Search</button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default FindId;
