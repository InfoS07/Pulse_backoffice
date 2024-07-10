import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/UsersPage.module.css';

interface Report {
  id: number;
  comment_id: string;
  created_at: string;
  user_id: string;
  reason: string;
}

interface ApiResponse {
  reports: Report[];
}

interface ReportsPageProps {
  onEdit: (commentId: string) => void; // Modifiez cette ligne
}

const ReportsPage: React.FC<ReportsPageProps> = ({ onEdit }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('/api/reports');
        console.log('API Response:', response.data);

        if (response.data && Array.isArray(response.data.reports)) {
          setReports(response.data.reports);
        } else {
          setError('Format de réponse invalide');
          console.error('Invalid response format:', response.data);
        }
      } catch (error) {
        setError('Échec de la récupération des utilisateurs');
        console.error('Failed to fetch reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <div className={styles.centered}>Chargement...</div>;
  }

  if (error) {
    return <div className={styles.centered}>Erreur : {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Modération</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Commentaire</th>
            <th>Date de Création</th>
            <th>Utilisateur</th>
            <th>Raison</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id} className={styles.row}>
              <td>{report.id}</td>
              <td>{report.comment_id}</td>
              <td>{new Date(report.created_at).toLocaleDateString()}</td>
              <td>{report.user_id}</td>
              <td>{report.reason}</td>
              <td>
                <button className={styles.editButton} onClick={() => onEdit(report.comment_id)}> 
                  <img src="https://cdn.icon-icons.com/icons2/685/PNG/512/edit_icon-icons.com_61193.png" alt="Edit" className={styles.editIcon} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsPage;
