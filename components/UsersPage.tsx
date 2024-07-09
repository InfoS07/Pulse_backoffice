import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/UsersPage.module.css';

interface User {
  id: number;
  last_name: string;
  first_name: string;
  profile_photo: string | null;
  created_at: string;
  username: string;
  email: string;
  birth_date: string;
  uid: string;
  coins: number;
}

interface ApiResponse {
  users: User[];
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        console.log('API Response:', response.data); // Vérifiez la réponse de l'API

        // Supposons que la réponse est de la forme { users: [...] }
        if (response.data && Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          setError('Format de réponse invalide');
          console.error('Invalid response format:', response.data);
        }
      } catch (error) {
        setError('Échec de la récupération des utilisateurs');
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className={styles.centered}>Chargement...</div>;
  }

  if (error) {
    return <div className={styles.centered}>Erreur : {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Utilisateurs</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Photo de Profil</th>
            <th>Date de Création</th>
            <th>Nom d'utilisateur</th>
            <th>Email</th>
            <th>Date de Naissance</th>
            <th>UID</th>
            <th>Pièces</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={styles.row}>
              <td>{user.id}</td>
              <td>{user.last_name}</td>
              <td>{user.first_name}</td>
              <td>
                {user.profile_photo ? (
                  <img src={user.profile_photo} alt={`${user.first_name} ${user.last_name}`} width="50" height="50" />
                ) : (
                  'Pas de photo'
                )}
              </td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{new Date(user.birth_date).toLocaleDateString()}</td>
              <td>{user.uid}</td>
              <td>{user.coins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
