import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    if (comment && comment.comment.id) {
      try {
        const response = await axios.delete(`/api/comment/${comment.comment.id}`);
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
    if (comment && comment.comment.id) {
      try {
        const response = await axios.delete(`/api/report/${comment.comment.id}`);
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
    <div>
      <h1>Détails du Commentaire {comment?.id}</h1>
      {loading && <p>Chargement en cours...</p>}
      {error && <p>Erreur: {error}</p>}
      {comment && (
        <div>
          <p><strong>ID:</strong> {comment.comment.id}</p>
          <p><strong>Contenu:</strong> {comment.comment.content}</p>
          <p><strong>Créé le:</strong> {new Date(comment.comment.created_at).toLocaleString()}</p>
          <p><strong>Utilisateur ID:</strong> {comment.comment.user_id}</p>
        </div>
      )}
      {!loading && !comment && <p>Aucun commentaire à afficher pour l'ID sélectionné.</p>}

      <div style={{ marginTop: '20px' }}>
        <button style={{ backgroundColor: 'blue', color: 'white', marginRight: '10px' }}onClick={handleDeleteReport} >Laisser</button>
        <button style={{ backgroundColor: 'red', color: 'white' }} onClick={handleDeleteComment}>Supprimer</button>
      </div>
    </div>
  );
};

export default CommentPage;
