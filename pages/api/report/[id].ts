import { NextApiRequest, NextApiResponse } from 'next';
import {  deleteReportById } from '@/utils/supabase/reports'; // Assurez-vous du bon chemin

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Handling API request:', req.method, req.url);

   if (req.method === 'DELETE') {
    // Endpoint pour supprimer un reportaire par ID
    try {
      const success = await deleteReportById(req.query.id as string);
      if (success) {
        console.log('Reportaire supprimé avec succès.');
        res.status(200).json({ message: 'Reportaire supprimé avec succès' });
      } else {
        res.status(404).json({ error: 'Reportaire non trouvé' });
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du reportaire:', error);
      res.status(500).json({ error: 'Échec de la suppression du reportaire' });
    }

  } else {
    // Méthode non autorisée pour cet endpoint
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
