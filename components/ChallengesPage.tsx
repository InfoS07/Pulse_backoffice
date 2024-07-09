
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/UsersPage.module.css';

interface Challenge {
  id: number;
  name: string;
  description: string;
  photo: string ;
  points: string;
  exercice_id: number;
  created_at: string;
  end_at: string;
  start_at: string;
  type: string;
  achievers: string;
  participants: string;

}

interface ApiResponse {
  challenges: Challenge[];
}

const ChallengesPage: React.FC = () => {
  const [challenges, setTrainings] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await axios.get('/api/challenges');
        console.log('API Response:', response.data);

        if (response.data && Array.isArray(response.data.challenges)) {
          setTrainings(response.data.challenges);
        } else {
          setError('Format de réponse invalide');
          console.error('Invalid response format:', response.data);
        }
      } catch (error) {
        setError('Échec de la récupération des utilisateurs');
        console.error('Failed to fetch challenges:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainings();
  }, []);

  if (loading) {
    return <div className={styles.centered}>Chargement...</div>;
  }

  if (error) {
    return <div className={styles.centered}>Erreur : {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Challenges</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Points</th>
            <th>Ecercice</th>
            <th>Date création</th>
            <th>Date début</th>
            <th>Date fin</th>
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
                  <img src={challenge.photo}  width="50" height="50" />
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
