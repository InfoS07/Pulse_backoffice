// Import des modules nécessaires
"use client";

import { useState } from 'react';
import DashboardPage from '../../components/DashboardPage';
import UsersPage from '../../components/UsersPage';
import ExercisesPage from '../../components/ExercisesPage';
import ChallengesPage from '../../components/ChallengesPage';


// Définition des types pour les noms de page
type PageName = 'dashboard' | 'users' | 'exercises' | 'challenges';

// Composant Dashboard
const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState<PageName>('dashboard'); // Utilisation du type PageName

  // Fonction pour changer de page
  const handlePageChange = (pageName: PageName) => {
    setCurrentPage(pageName);
  };

  // Contenu dynamique en fonction de la page courante
  let pageContent = null;
  switch (currentPage) {
    case 'dashboard':
      pageContent = <DashboardPage />;
      break;
    case 'users':
      pageContent = <UsersPage />;
      break;
    case 'exercises':
      pageContent = <ExercisesPage />;
      break;
    case 'challenges':
      pageContent = <ChallengesPage />;
      break;
    default:
      pageContent = <DashboardPage />;
  }

  // Retourne l'interface utilisateur
  return (
    <div className="flex h-screen w-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-1/6 bg-gray-900 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-4">Ca pulse ici ou quoi</h2>
          <ul className="space-y-2">
            {/* Boutons de la sidebar */}
            <li>
              <button
                className={`block w-full text-left py-2 px-4 rounded-md bg-gray-800 hover:bg-gray-700 ${
                  currentPage === 'dashboard' ? 'bg-gray-700' : ''
                }`}
                onClick={() => handlePageChange('dashboard')}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                className={`block w-full text-left py-2 px-4 rounded-md bg-gray-800 hover:bg-gray-700 ${
                  currentPage === 'users' ? 'bg-gray-700' : ''
                }`}
                onClick={() => handlePageChange('users')}
              >
                Utilisateurs
              </button>
            </li>
            <li>
              <button
                className={`block w-full text-left py-2 px-4 rounded-md bg-gray-800 hover:bg-gray-700 ${
                  currentPage === 'exercises' ? 'bg-gray-700' : ''
                }`}
                onClick={() => handlePageChange('exercises')}
              >
                Exercices
              </button>
            </li>
            <li>
              <button
                className={`block w-full text-left py-2 px-4 rounded-md bg-gray-800 hover:bg-gray-700 ${
                  currentPage === 'challenges' ? 'bg-gray-700' : ''
                }`}
                onClick={() => handlePageChange('challenges')}
              >
                Challenges
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-800 overflow-y-scroll">
        {/* Contenu de la page principale */}
        {pageContent}
      </div>
    </div>
  );
};

export default Dashboard;
