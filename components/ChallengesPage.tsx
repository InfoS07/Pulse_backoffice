import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/ChallengesPage.module.css';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
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
        console.log('API Response:', response.data);

        if (response.data && Array.isArray(response.data.challenges)) {
          setChallenges(response.data.challenges);
        } else {
          setError('Format de réponse invalide');
          console.error('Invalid response format:', response.data);
        }
      } catch (error) {
        setError('Échec de la récupération des challenges');
        console.error('Failed to fetch challenges:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/challenges', newChallenge);
      console.log('New challenge added:', response.data);

      // Actualiser la liste des challenges après l'ajout
      const updatedChallenges = [...challenges, response.data];
      setChallenges(updatedChallenges);
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
    <div className={styles.container}>
      <h1 className={styles.title}>Challenges</h1>
      <button className={styles.addButton} onClick={() => setShowForm(true)}>Ajouter</button>

      {showForm && (
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <label>
            Nom:
            <input
              type="text"
              value={newChallenge.name}
              onChange={(e) => setNewChallenge({ ...newChallenge, name: e.target.value })}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              value={newChallenge.description}
              onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
              required
            />
          </label>
          <label>
            Photo (URL):
            <input
              type="text"
              value={newChallenge.photo}
              onChange={(e) => setNewChallenge({ ...newChallenge, photo: e.target.value })}
            />
          </label>
          <label>
            Points:
            <input
              type="text"
              value={newChallenge.points}
              onChange={(e) => setNewChallenge({ ...newChallenge, points: e.target.value })}
              required
            />
          </label>
          <label>
            Exercice ID:
            <input
              type="number"
              value={newChallenge.exercice_id}
              onChange={(e) => setNewChallenge({ ...newChallenge, exercice_id: parseInt(e.target.value) })}
              required
            />
          </label>
          <label>
            Date de début:
            <input
              type="date"
              value={newChallenge.start_at}
              onChange={(e) => setNewChallenge({ ...newChallenge, start_at: e.target.value })}
              required
            />
          </label>
          <label>
            Date de fin:
            <input
              type="date"
              value={newChallenge.end_at}
              onChange={(e) => setNewChallenge({ ...newChallenge, end_at: e.target.value })}
              required
            />
          </label>
          <label>
            Type:
            <input
              type="text"
              value={newChallenge.type}
              onChange={(e) => setNewChallenge({ ...newChallenge, type: e.target.value })}
              required
            />
          </label>
          <label>
            Gagnants:
            <input
              type="text"
              value={newChallenge.achievers}
              onChange={(e) => setNewChallenge({ ...newChallenge, achievers: e.target.value })}
            />
          </label>
          <label>
            Participants:
            <input
              type="text"
              value={newChallenge.participants}
              onChange={(e) => setNewChallenge({ ...newChallenge, participants: e.target.value })}
            />
          </label>

          <button type="submit">Ajouter</button>
          <button type="button" onClick={() => setShowForm(false)}>Annuler</button>
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
          {challenges.map((challenge) => (
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
  );
};

export default ChallengesPage;
