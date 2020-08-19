import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    loadRepositories();
  }, []);

  async function loadRepositories() {
    const response = await api.get('repositories');
    setRepositories(response.data);
  }

  async function handleAddRepository() {
    const newRepository = {
      url: 'https://github.com/josepholiveira',
      title: 'Desafio ReactJS',
      techs: ['React', 'Node.js'],
    };

    await api.post('repositories', newRepository);

    setRepositories([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repositoriesUpdated = repositories.filter(repository => repository.id !== id);
    
    setRepositories(repositoriesUpdated);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository, index) => (
          <li key={index}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
