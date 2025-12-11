// components/Sidebar/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';
import '../../styles/global.css';

const Sidebar = () => {
  const location = useLocation();

  // 1. Pegar dados do usuário logado
  const user = JSON.parse(localStorage.getItem('user'));
  // Se o usuário não existir (ex: erro de login), define null para evitar quebra
  const userProfileId = user ? user.perfil : null;

  // IDs de Perfil (Conforme seu banco SQL: 1 = Admin)
  const ROLE_ADMIN = 1;

  // 2. Função de Logout (Faltava esta parte)
  const handleLogout = () => {
    localStorage.removeItem('user');
  };

  // 3. Definir itens de navegação
  const navItems = [
    { to: '/', icon: 'fa-house', label: 'Ocorrências' },
    { to: '/dashboard', icon: 'fa-chart-line', label: 'Dashboard' },
    { to: '/relatorios', icon: 'fa-file-lines', label: 'Relatórios' },
    
    // Acesso: Apenas ADMIN (ID 1)
    { 
      to: '/usuarios', 
      icon: 'fa-users', 
      label: 'Usuários', 
      restricted: true, 
      allowed: [ROLE_ADMIN] 
    },
    
    { to: '/auditoria', icon: 'fa-magnifying-glass', label: 'Auditoria' },
    { to: '/ajustes', icon: 'fa-gear', label: 'Ajustes' },
  ];

  return (
    <aside className={styles.sidebar}>
      {/* Header com Logo */}
      <div className={styles.sidebarHeader}>
        <img
          src="https://i.postimg.cc/28YgB6z9/Gemini-Generated-Image-tr1uhatr1uhatr1u-8.png"
          alt="Logo"
          className={styles.logo}
        />
      </div>

      <nav className={styles.sidebarNav}>
        <ul>
          {navItems.map((item) => {
            // Lógica de Bloqueio Visual:
            if (item.restricted && !item.allowed.includes(userProfileId)) {
              return null; // Não renderiza o botão se não tiver permissão
            }

            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={location.pathname === item.to ? styles.active : ''}
                >
                  <i className={`fa-solid ${item.icon}`}></i> <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer com Logout Funcional */}
      <div className={styles.sidebarFooter}>
        <Link to="/login" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i> <span>Sair</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;