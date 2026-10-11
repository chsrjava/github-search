import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchRepos } from './fakeApi';
import { useDebounce } from './useDebounce';

// We extract the item type directly from the searchRepos promise response structure dynamically
type ApiItemType = Awaited<ReturnType<typeof searchRepos>>['items'][number];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  // Uses the dynamic type inline without ever defining a "Repo" object name
  const [repos, setRepos] = useState<ApiItemType[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPage(1);
    setRepos([]);
  }, [debouncedQuery]);

  useEffect(() => {
    let isCurrentRequest = true;

    async function fetchResults() {
      if (page === 1) {
        setIsInitialLoading(true);
      } else {
        setIsMoreLoading(true);
      }
      setError(null);

      try {
        const result = await searchRepos(debouncedQuery, page);
        
        if (!isCurrentRequest) return;

        setTotalCount(result.totalCount);
        setHasNextPage(result.hasNextPage);
        setRepos((prev) => (page === 1 ? result.items : [...prev, ...result.items]));
      } catch (err) {
        if (isCurrentRequest) {
          setError('Something went wrong fetching data.');
        }
      } finally {
        if (isCurrentRequest) {
          setIsInitialLoading(false);
          setIsMoreLoading(false);
        }
      }
    }

    fetchResults();

    return () => {
      isCurrentRequest = false;
    };
  }, [debouncedQuery, page]);

  const handleLoadMore = () => {
    if (hasNextPage && !isMoreLoading) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div>
      <h1>GitHub Repository Search</h1>
      
      <input
        type="text"
        placeholder="Search repositories..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '20px', fontSize: '16px' }}
      />

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      {!isInitialLoading && !error && (
        <p style={{ fontWeight: 'bold' }}>
          Showing {repos.length} of {totalCount} repositories
        </p>
      )}

      {isInitialLoading && <p>Loading repositories...</p>}

      {!isInitialLoading && repos.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {repos.map((item) => (
            <li key={item.id} style={{ borderBottom: '1px solid #ccc', padding: '15px 0' }}>
              <Link 
                to={`/repo/${item.full_name}`} 
                style={{ fontSize: '18px', fontWeight: 'bold', textDecoration: 'none', color: '#0066cc' }}
              >
                {item.name}
              </Link>
              <p style={{ margin: '5px 0', color: '#555' }}>{item.description || 'No description provided.'}</p>
              <small style={{ color: '#888' }}>⭐️ {item.stargazers_count.toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}

      {!isInitialLoading && repos.length === 0 && !error && (
        <p>No results found.</p>
      )}

      {hasNextPage && !isInitialLoading && (
        <button
          onClick={handleLoadMore}
          disabled={isMoreLoading}
          style={{ padding: '10px 20px', marginTop: '15px', cursor: isMoreLoading ? 'not-allowed' : 'pointer' }}
        >
          {isMoreLoading ? '⏳ Loading more...' : 'Load more'}
        </button>
      )}
    </div>
  );
}
