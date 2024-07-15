import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/DarkTheme.module.css';

interface Exercise {
  id: number;
  title: string;
  description: string;
  sequence: string;
  repetitions: string;
  pod_count: string;
  player_count: string;
  calories_burned: string;
  points: string;
  difficulty: string;
  categories: string;
  type: string;
  hit_type: string;
}

const ExercisesPage: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('/api/exercises');
        if (response.data && Array.isArray(response.data.exercises)) {
          setExercises(response.data.exercises);
          setFilteredExercises(response.data.exercises);
        } else {
          setError('Format de réponse invalide');
        }
      } catch (error) {
        setError('Échec de la récupération des exercices');
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  useEffect(() => {
    const results = exercises.filter(exercise =>
      exercise.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredExercises(results);
  }, [searchTerm, exercises]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleCancelClick = () => {
    setShowForm(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const newExercise = new FormData();
    newExercise.append('title', (form.elements.namedItem('title') as HTMLInputElement).value);
    newExercise.append('description', (form.elements.namedItem('description') as HTMLTextAreaElement).value);
    newExercise.append('pod_count', (form.elements.namedItem('pod_count') as HTMLInputElement).value);
    newExercise.append('difficulty', (form.elements.namedItem('difficulty') as HTMLInputElement).value);
    newExercise.append('type', (form.elements.namedItem('type') as HTMLInputElement).value);
    newExercise.append('photo', (form.elements.namedItem('photo') as HTMLInputElement).value);
    
    try {
      const response = await axios.post('/api/exercises', newExercise);
      setExercises([...exercises, response.data]);
      setFilteredExercises([...filteredExercises, response.data]);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to add exercise:', error);
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
      <h1 className={styles.mainTitle}>Les Exercices</h1>
      <div className={styles.container}>
        <div className={styles.header}>
          <input
            type="text"
            placeholder="Rechercher par titre"
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchBar}
          />
          <button className={styles.addButton} onClick={handleAddClick}>Ajouter</button>
        </div>
        {showForm && (
          <form className={styles.form} onSubmit={handleFormSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Titre</label>
              <input type="text" id="title" name="title" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" required></textarea>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="pod_count">Nombre de Pods</label>
              <input type="number" id="pod_count" name="pod_count" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="difficulty">Difficulté</label>
              <input type="text" id="difficulty" name="difficulty" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="type">Type</label>
              <input type="text" id="type" name="type" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="photo">Photo</label>
              <input type="text" id="photo" name="photo"/>
            </div>
            <div className={styles.buttonContainer}>
              <button type="button" className={`${styles.button} ${styles.red}`} onClick={handleCancelClick}>
                Annuler
              </button>
              <button type="submit" className={`${styles.button} ${styles.green}`}>
                Enregistrer
              </button>
            </div>
          </form>
        )}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Description</th>
              <th>Répetitions</th>
              <th>Nombre Pod</th>
              <th>Difficulté</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredExercises.map((exercise) => (
              <tr key={exercise.id} className={styles.row}>
                <td>{exercise.title}</td>
                <td>{exercise.description}</td>
                <td>{exercise.repetitions}</td>
                <td>{exercise.pod_count}</td>
                <td>{exercise.difficulty}</td>
                <td>{exercise.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExercisesPage;
