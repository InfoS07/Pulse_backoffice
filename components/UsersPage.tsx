import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/DarkTheme.module.css'; // Assurez-vous d'avoir le bon chemin vers vos styles

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
interface UsersPageProps {
  onEdit: (userId: string) => void;
}

const UsersPage: React.FC<UsersPageProps> = ({ onEdit }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        console.log('API Response:', response.data);

        if (response.data && Array.isArray(response.data.users)) {
          setUsers(response.data.users);
          setFilteredUsers(response.data.users);
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

  useEffect(() => {
    const results = users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return <div className={styles.centered}>Chargement...</div>;
  }

  if (error) {
    return <div className={styles.centered}>Erreur : {error}</div>;
  }

  return (
    <div>
      <h1 className={styles.mainTitle}>Les Pulseurs</h1>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Utilisateurs</h2>
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchBar}
          />
        </div>
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
              <th>Détail</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
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
                <td>
                <button className={styles.button} onClick={() => onEdit(user.id.toString())}>
                  <img src="https://cdn3.iconfinder.com/data/icons/information-notification-black/3/17-512.png" alt="Détail" style={{ width: '20px', height: '20px' }} />
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
