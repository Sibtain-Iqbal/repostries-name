import React, { useState } from 'react';


const RepoDetails = () => {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos`);
      setRepos(response.data);
      setError(null);
    } catch (err) {
      setRepos([]);
      setError('User not found. Please check the username.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          GitHub Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <button type="submit">Get Repositories</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <strong>{repo.name}</strong>: {repo.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoDetails;
