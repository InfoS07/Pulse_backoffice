import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/DarkTheme.module.css'; // Assurez-vous d'avoir le bon chemin vers vos styles

interface Challenge {
  id: number;
  name: string;
  description: string;
  photo: string;
  points: string;
  exercice_id: number;
  created_at: string;
  end_at: string;
  start_at: string;
  type: string;
  achievers: string;
  participants: string;
}

const ChallengesPage: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newChallenge, setNewChallenge] = useState<Partial<Challenge>>({
    name: '',
    description: '',
    photo: '',
    points: '',
    exercice_id: 0,
    created_at: '',
    end_at: '',
    start_at: '',
    type: '',
    achievers: '',
    participants: '',
  });

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get('/api/challenges');
        if (response.data && Array.isArray(response.data.challenges)) {
          setChallenges(response.data.challenges);
          setFilteredChallenges(response.data.challenges);
        } else {
          setError('Format de réponse invalide');
        }
      } catch (error) {
        setError('Échec de la récupération des challenges');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  useEffect(() => {
    const results = challenges.filter(challenge =>
      challenge.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredChallenges(results);
  }, [searchTerm, challenges]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/challenges', newChallenge);
      const updatedChallenges = [...challenges, response.data];
      setChallenges(updatedChallenges);
      setFilteredChallenges(updatedChallenges);
      setShowForm(false);
      setNewChallenge({
        name: '',
        description: '',
        photo: '',
        points: '',
        exercice_id: 0,
        created_at: '',
        end_at: '',
        start_at: '',
        type: '',
        achievers: '',
        participants: '',
      });
    } catch (error) {
      console.error('Failed to add new challenge:', error);
    }
  };

  if (loading) {
    return <div className={styles.centered}>Chargement...</div>;
  }

  if (error) {
    return <div className={styles.centered}>Erreur : {error}</div>;
  }

  return (
    <div>
      <h1 className={styles.mainTitle}>Les Challenges</h1>
    <div className={styles.container}>
      <div className={styles.header}>
        <input
          type="text"
          placeholder="Rechercher par nom"
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchBar}
        />
        <button className={styles.addButton} onClick={() => setShowForm(true)}>Ajouter</button>
      </div>

      {showForm && (
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <label className={styles.formGroup}>
            Nom:
            <input
              type="text"
              className={styles.input}
              value={newChallenge.name}
              onChange={(e) => setNewChallenge({ ...newChallenge, name: e.target.value })}
              required
            />
          </label>
          <label className={styles.formGroup}>
            Description:
            <textarea
              className={styles.textarea}
              value={newChallenge.description}
              onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
              required
            />
          </label>
          <label className={styles.formGroup}>
            Photo (URL):
            <input
              type="text"
              className={styles.input}
              value={newChallenge.photo}
              onChange={(e) => setNewChallenge({ ...newChallenge, photo: e.target.value })}
            />
          </label>
          <label className={styles.formGroup}>
            Points:
            <input
              type="text"
              className={styles.input}
              value={newChallenge.points}
              onChange={(e) => setNewChallenge({ ...newChallenge, points: e.target.value })}
              required
            />
          </label>
          <label className={styles.formGroup}>
            Exercice ID:
            <input
              type="number"
              className={styles.input}
              value={newChallenge.exercice_id}
              onChange={(e) => setNewChallenge({ ...newChallenge, exercice_id: parseInt(e.target.value) })}
              required
            />
          </label>
          <label className={styles.formGroup}>
            Date de début:
            <input
              type="date"
              className={styles.input}
              value={newChallenge.start_at}
              onChange={(e) => setNewChallenge({ ...newChallenge, start_at: e.target.value })}
              required
            />
          </label>
          <label className={styles.formGroup}>
            Date de fin:
            <input
              type="date"
              className={styles.input}
              value={newChallenge.end_at}
              onChange={(e) => setNewChallenge({ ...newChallenge, end_at: e.target.value })}
              required
            />
          </label>
          <label className={styles.formGroup}>
            Type:
            <input
              type="text"
              className={styles.input}
              value={newChallenge.type}
              onChange={(e) => setNewChallenge({ ...newChallenge, type: e.target.value })}
              required
            />
          </label>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.button}>Ajouter</button>
            <button type="button" className={styles.button} onClick={() => setShowForm(false)}>Annuler</button>
          </div>
        </form>
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Points</th>
            <th>Exercice ID</th>
            <th>Date de création</th>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>Type</th>
            <th>Gagnants</th>
            <th>Participants</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {filteredChallenges.map((challenge) => (
            <tr key={challenge.id} className={styles.row}>
              <td>{challenge.id}</td>
              <td>{challenge.name}</td>
              <td>{challenge.description}</td>
              <td>{challenge.points}</td>
              <td>{challenge.exercice_id}</td>
              <td>{new Date(challenge.created_at).toLocaleDateString()}</td>
              <td>{new Date(challenge.start_at).toLocaleDateString()}</td>
              <td>{new Date(challenge.end_at).toLocaleDateString()}</td>
              <td>{challenge.type}</td>
              <td>{challenge.achievers}</td>
              <td>{challenge.participants}</td>
              <td>
                {challenge.photo ? (
                  <img src={challenge.photo} alt={`Photo de ${challenge.name}`} width="50" height="50" />
                ) : (
                  'Pas de photo'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>

  );
};

export default ChallengesPage;
