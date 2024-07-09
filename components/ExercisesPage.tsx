
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/UsersPage.module.css';

interface Training {
  id: number;
  title: string;
  description: string;
  start_at: string ;
  end_at: string;
  creation_at: string;
  status: string;
  activities_list: string;
  author_id: string;
  photos: string;
  exercise_id: number;
}

interface ApiResponse {
  trainings: Training[];
}

const ExercisesPage: React.FC = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await axios.get('/api/trainings');
        console.log('API Response:', response.data); // Vérifiez la réponse de l'API

        // Supposons que la réponse est de la forme { trainings: [...] }
        if (response.data && Array.isArray(response.data.trainings)) {
          setTrainings(response.data.trainings);
        } else {
          setError('Format de réponse invalide');
          console.error('Invalid response format:', response.data);
        }
      } catch (error) {
        setError('Échec de la récupération des utilisateurs');
        console.error('Failed to fetch trainings:', error);
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
      <h1 className={styles.title}>Exercices</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Description</th>
            <th>Date début</th>
            <th>Date fin</th>
            <th>Date création</th>
            <th>Status</th>
            <th>Activités</th>
            <th>Auteur</th>
            <th>Photo</th>
            <th>Exercice</th>
          </tr>
        </thead>
        <tbody>
          {trainings.map((training) => (
            <tr key={training.id} className={styles.row}>
              <td>{training.id}</td>
              <td>{training.title}</td>
              <td>{training.description}</td>
              <td>{new Date(training.start_at).toLocaleDateString()}</td>
              <td>{new Date(training.end_at).toLocaleDateString()}</td>
              <td>{new Date(training.creation_at).toLocaleDateString()}</td>
              <td>{training.status}</td>
              <td>{training.activities_list}</td>
              <td>{training.author_id}</td>
              <td>
                {training.photos ? (
                  <img src={training.photos}  width="50" height="50" />
                ) : (
                  'Pas de photo'
                )}
              </td>
              <td>{training.exercise_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExercisesPage;
