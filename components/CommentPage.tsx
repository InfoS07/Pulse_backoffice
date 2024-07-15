import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/DarkTheme.module.css';

interface CommentPageProps {
  commentId: string | null;
}

interface Comment {
  comment: any;
  id: number;
  content: string;
  created_at: string;
  user_id: string;
}

const CommentPage: React.FC<CommentPageProps> = ({ commentId }) => {
  const [comment, setComment] = useState<Comment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await axios.get(`/api/comment/${commentId}`);
        console.log('API Response:', response.data);

        if (response.data) {
          setComment(response.data);
        } else {
          setError('Commentaire non trouvé');
        }
      } catch (error) {
        setError('Échec de la récupération du commentaire');
        console.error('Failed to fetch comment:', error);
      } finally {
        setLoading(false);
      }
    };

    if (commentId) {
      fetchComment();
    }
  }, [commentId]);

  const handleDeleteComment = async () => {
    if (comment) {
      try {
        const response = await axios.delete(`/api/comment/${comment.id}`);
        console.log('Suppression réussie:', response.data);
        // Réinitialiser l'état du commentaire après la suppression
        setComment(null);
      } catch (error) {
        console.error('Échec de la suppression du commentaire:', error);
        setError('Échec de la suppression du commentaire');
      }
    }
  };

  const handleDeleteReport = async () => {
    if (comment) {
      try {
        const response = await axios.delete(`/api/report/${comment.id}`);
        console.log('Suppression réussie:', response.data);
        // Réinitialiser l'état du commentaire après la suppression
        setComment(null);
      } catch (error) {
        console.error('Échec de la suppression du report:', error);
        setError('Échec de la suppression du report');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Détails du Commentaire {comment?.id}</h1>
      {loading && <p className={styles.centered}>Chargement en cours...</p>}
      {error && <p className={styles.centered}>Erreur: {error}</p>}
      {comment && (
        <div className={styles.commentDetails}>
          <table className={styles.commentTable}>
            <tbody>
              <tr>
                <td><strong>ID:</strong></td>
                <td>{comment.comment.id}</td>
              </tr>
              <tr>
                <td><strong>Contenu:</strong></td>
                <td>{comment.comment.content}</td>
              </tr>
              <tr>
                <td><strong>Créé le:</strong></td>
                <td>{new Date(comment.comment.created_at).toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>Utilisateur ID:</strong></td>
                <td>{comment.comment.user_id}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {!loading && !comment && <p className={styles.centered}>Aucun commentaire à afficher pour l'ID sélectionné.</p>}

      <div className={styles.buttonContainer}>
        <button className={`${styles.button} ${styles.green}`} onClick={handleDeleteReport}>Laisser</button>
        <button className={`${styles.button} ${styles.red}`} onClick={handleDeleteComment}>Supprimer</button>
      </div>
    </div>
  );
};

export default CommentPage;
