import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/DarkTheme.module.css';

interface UserDetailsPageProps {
  userId: string | null;
}

interface User {
  user: any;
  id: number;
  profile_photo: string;
  last_name: string;
  first_name: string;
  username: string;
  email: string;
  birth_date: string;
  uid: string;
}

interface Training {
  id: number;
  title: string;
  description: string;
  created_at: string;
  repetitions: number;
  author_id: number;
}

interface Challenge {
  id: number;
  name: string;
  photo: string | null;
  end_at: string;
  created_at: string;
  training_id: number;
  description: string;
  type: string;
  participants: object;
  author_id: string;
  invites: string[];
}

const UserDetailsPage: React.FC<UserDetailsPageProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [createdChallenges, setCreatedChallenges] = useState<Challenge[]>([]);
  const [joinedChallenges, setJoinedChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/users/${userId}`);
        if (response.data) {
          setUser(response.data);
        } else {
          setError('Utilisateur non trouvé');
        }
      } catch (error) {
        setError('Échec de la récupération de l\'utilisateur');
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  useEffect(() => {
    const fetchUserTrainings = async () => {
      if (user) {
        try {
          const responsetrain = await axios.get(`/api/user_training/${user.user.uid}`);
          if (responsetrain.data && Array.isArray(responsetrain.data.trainings)) {
            setTrainings(responsetrain.data.trainings);
          } else {
            setError('Formations non trouvées');
          }
        } catch (error) {
          setError('Échec de la récupération des formations');
          console.error('Failed to fetch trainings:', error);
        }
      }
    };

    fetchUserTrainings();
  }, [user]);

  useEffect(() => {
    const fetchUserCreatedChallenges = async () => {
      if (user) {
        try {
          const response = await axios.get(`/api/challenges_user/${user.user.uid}`);
          if (response.data && Array.isArray(response.data.challenges)) {
            setCreatedChallenges(response.data.challenges);
          } else {
            setError('Défis non trouvés');
          }
        } catch (error) {
          setError('Échec de la récupération des défis');
          console.error('Failed to fetch challenges:', error);
        }
      }
    };

    fetchUserCreatedChallenges();
  }, [user]);

  useEffect(() => {
    const fetchUserJoinedChallenges = async () => {
      if (user) {
        try {
          const response = await axios.get(`/api/defis/${user.user.uid}`);
          if (response.data && Array.isArray(response.data.challenges)) {
            setJoinedChallenges(response.data.challenges);
          } else {
            setError('Défis non trouvés');
          }
        } catch (error) {
          setError('Échec de la récupération des défis');
          console.error('Failed to fetch challenges:', error);
        }
      }
    };

    fetchUserJoinedChallenges();
  }, [user]);

  const renderTrainingsTable = () => (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Titre</th>
          <th>Description</th>
          <th>Date</th>
          <th>Durée</th>
        </tr>
      </thead>
      <tbody>
        {trainings.map(training => (
          <tr key={training.id}>
            <td>{training.id}</td>
            <td>{training.title}</td>
            <td>{training.description}</td>
            <td>{training.created_at}</td>
            <td>{training.repetitions} minutes</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderChallengesTable = (challenges: Challenge[]) => (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Description</th>
          <th>Date de création</th>
          <th>Date de fin</th>
          <th>Participants</th>
        </tr>
      </thead>
      <tbody>
        {challenges.map(challenge => (
          <tr key={challenge.id}>
            <td>{challenge.id}</td>
            <td>{challenge.name}</td>
            <td>{challenge.description}</td>
            <td>{challenge.created_at}</td>
            <td>{challenge.end_at}</td>
            <td>{Object.keys(challenge.participants).length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <h1 className={styles.mainTitle}>Details de l'utilisateur</h1>
    <div className={styles.container}>
      {loading && <p>Chargement en cours...</p>}
      {error && <p>Erreur: {error}</p>}

      {user && (
        <div className={styles.profileCard}>
          <p><strong>ID:</strong> {user.user.id}</p>
          <p><strong>Photo:</strong> <img src={user.user.profile_photo} width="50" height="50" alt="Profile" /></p>
          <p><strong>Nom:</strong> {user.user.last_name}</p>
          <p><strong>Prénom:</strong> {user.user.first_name}</p>
          <p><strong>Pseudo:</strong> {user.user.username}</p>
          <p><strong>Mail:</strong> {user.user.email}</p>
          <p><strong>UID:</strong> {user.user.uid}</p>
        </div>
      )}
      {!loading && !user && <p>Aucun utilisateur à afficher pour l'ID sélectionné.</p>}

      <div className={styles.tableContainer}>
        <h2>Trainings</h2>
        {trainings.length > 0 ? renderTrainingsTable() : <p>Aucune formation à afficher.</p>}
      </div>

      <div className={styles.tableContainer}>
        <h2>Défis créés</h2>
        {createdChallenges.length > 0 ? renderChallengesTable(createdChallenges) : <p>Aucun défi à afficher.</p>}
      </div>

      <div className={styles.tableContainer}>
        <h2>Défis auxquels il participe</h2>
        {joinedChallenges.length > 0 ? renderChallengesTable(joinedChallenges) : <p>Il ne participe à aucun défi.</p>}
      </div>
    </div>
    </div>

  );
};

export default UserDetailsPage;
