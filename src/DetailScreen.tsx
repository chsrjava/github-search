import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRepo } from './fakeApi';

// Dynamically extracts the object structure directly out of what getRepo resolves to
type ApiDetailType = NonNullable<Awaited<ReturnType<typeof getRepo>>>;

export default function DetailScreen() {
  const { owner, name } = useParams();

  // Using the inferred backend details type structure 
  const [detailData, setDetailData] = useState<ApiDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fullName = `${owner}/${name}`;

  useEffect(() => {
    let isCurrentRequest = true;
    setLoading(true);

    async function fetchRepoDetails() {
      try {
        const data = await getRepo(fullName);
        if (!isCurrentRequest) return;

        if (data) {
          setDetailData(data);
        } else {
          setError('Repository not found.');
        }
      } catch (err) {
        if (isCurrentRequest) setError('Failed to load repository info.');
      } finally {
        if (isCurrentRequest) setLoading(false);
      }
    }

    fetchRepoDetails();

    return () => {
      isCurrentRequest = false;
    };
  }, [fullName]);

  if (loading) return <p>Loading details...</p>;
  if (error || !detailData) return <p style={{ color: 'red' }}>{error || 'Not found'}</p>;

  return (
    <div>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '20px', color: '#0066cc' }}>
        ← Back to search
      </Link>

      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '6px' }}>
        <h2>{detailData.full_name}</h2>
        <p style={{ fontSize: '16px', color: '#333' }}>{detailData.description || <em>No description available.</em>}</p>
        
        <div style={{ marginTop: '20px', display: 'flex', gap: '20px', color: '#666' }}>
          <span><strong>Language:</strong> {detailData.language || 'N/A'}</span>
          <span><strong>Stars:</strong> ⭐️ {detailData.stargazers_count.toLocaleString()}</span>
        </div>

        <div style={{ marginTop: '25px' }}>
          <a 
            href={detailData.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'inline-block', padding: '10px 15px', backgroundColor: '#24292e', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}
          >
            Open on GitHub ↗
          </a>
        </div>
      </div>
    </div>
  );
}
