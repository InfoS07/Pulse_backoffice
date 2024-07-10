import { NextApiRequest, NextApiResponse } from 'next';
import { getCommentById, deleteCommentById } from '@/utils/supabase/comments'; // Assurez-vous du bon chemin

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Handling API request:', req.method, req.url);

  if (req.method === 'GET') {
    // Endpoint pour récupérer un commentaire par ID
    console.log('req.query.id', req.query.id);

    try {
      const comment = await getCommentById(req.query.id as string);
      if (comment) {
        console.log('Comment trouvé:', comment);
        res.status(200).json({ comment });
      } else {
        res.status(404).json({ error: 'Commentaire non trouvé' });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du commentaire:', error);
      res.status(500).json({ error: 'Échec de la récupération du commentaire' });
    }

  } else if (req.method === 'DELETE') {
    // Endpoint pour supprimer un commentaire par ID
    try {
      const success = await deleteCommentById(req.query.id as string);
      if (success) {
        console.log('Commentaire supprimé avec succès.');
        res.status(200).json({ message: 'Commentaire supprimé avec succès' });
      } else {
        res.status(404).json({ error: 'Commentaire non trouvé' });
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire:', error);
      res.status(500).json({ error: 'Échec de la suppression du commentaire' });
    }

  } else {
    // Méthode non autorisée pour cet endpoint
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
