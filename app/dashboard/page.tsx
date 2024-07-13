"use client";

import { useState } from 'react';
import DashboardPage from '../../components/DashboardPage';
import UsersPage from '../../components/UsersPage';
import ExercisesPage from '../../components/ExercisesPage';
import ChallengesPage from '../../components/ChallengesPage';
import ReportsPage from '../../components/ReportPage';
import CommentPage from '../../components/CommentPage';
import UserDetailsPage from '@/components/UserDetail';

type PageName = 'dashboard' | 'users' | 'exercises' | 'challenges' | 'reports' | 'comment' | 'userDetail';

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageName>('dashboard');
  const [commentId, setCommentId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);


  const handlePageChange = (pageName: PageName) => {
    setCurrentPage(pageName);
  };

  const handleEdit = (id: string) => {
    setCommentId(id);
    handlePageChange('comment');
  };

  const handleEditUser = (id: string) => {
    setUserId(id);
    handlePageChange('userDetail');
  };


  let pageContent = null;
  switch (currentPage) {
    case 'dashboard':
      pageContent = <DashboardPage />;
      break;
    case 'users':
      pageContent = <UsersPage onEdit={handleEditUser}  />;
      break;
    case 'exercises':
      pageContent = <ExercisesPage />;
      break;
    case 'challenges':
      pageContent = <ChallengesPage />;
      break;
    case 'reports':
      pageContent = <ReportsPage onEdit={handleEdit} />; // Passez handleEdit ici
      break;
    case 'comment':
      pageContent = <CommentPage commentId={commentId} />; // Passez commentId comme prop
      break;
    case 'userDetail':
      pageContent = <UserDetailsPage userId={userId} />; // Passez commentId comme prop
      break;
    default:
      pageContent = <DashboardPage />;
  }

  return (
    <div className="flex h-screen w-screen bg-black text-white">
      <div className="w-1/6 bg-gray-900 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-4">Ca pulse ici ou quoi</h2>
          <ul className="space-y-2">
            <li>
              <button
                className={`block w-full text-left py-2 px-4 rounded-md bg-gray-800 hover:bg-gray-700 ${currentPage === 'dashboard' ? 'bg-gray-700' : ''}`}
                onClick={() => handlePageChange('dashboard')}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                className={`block w-full text-left py-2 px-4 rounded-md bg-gray-800 hover:bg-gray-700 ${currentPage === 'users' ? 'bg-gray-700' : ''}`}
                onClick={() => handlePageChange('users')}
              >
                Utilisateurs
              </button>
            </li>
            <li>
              <button
                className={`block w-full text-left py-2 px-4 rounded-md bg-gray-800 hover:bg-gray-700 ${currentPage === 'exercises' ? 'bg-gray-700' : ''}`}
                onClick={() => handlePageChange('exercises')}
              >
                Exercices
              </button>
            </li>
            <li>
              <button
                className={`block w-full text-left py-2 px-4 rounded-md bg-gray-800 hover:bg-gray-700 ${currentPage === 'challenges' ? 'bg-gray-700' : ''}`}
                onClick={() => handlePageChange('challenges')}
              >
                Challenges
              </button>
            </li>
            <li>
              <button
                className={`block w-full text-left py-2 px-4 rounded-md bg-gray-800 hover:bg-gray-700 ${currentPage === 'reports' ? 'bg-gray-700' : ''}`}
                onClick={() => handlePageChange('reports')}
              >
                Modération
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1 p-6 bg-gray-800 overflow-y-scroll">
        {pageContent}
      </div>
    </div>
  );
};

export default Dashboard;
