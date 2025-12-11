import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  // 1. Se não estiver logado, manda para o login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // 2. Se a rota exigir permissões específicas e o usuário não tiver o perfil correto
  if (allowedRoles && !allowedRoles.includes(user.perfil)) {
    // Redireciona para o Dashboard ou uma página de "Acesso Negado"
    alert("Acesso negado: Você não tem permissão para acessar esta página.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;