import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';
import '../../styles/global.css';

const Sidebar = () => {
  const location = useLocation();
  
  // 1. Pegar dados do usuário logado
  const user = JSON.parse(localStorage.getItem('user'));
  const userProfileId = user ? user.perfil : null;

  // IDs de Perfil
  const ROLE_ADMIN = 1;

  // 2. Definir itens de navegação
  const navItems = [
    { to: '/', icon: 'fa-house', label: 'Ocorrências' }, // Acesso: Todos
    { to: '/dashboard', icon: 'fa-chart-line', label: 'Dashboard' }, // Acesso: Todos
    { to: '/relatorios', icon: 'fa-file-lines', label: 'Relatórios' }, // Acesso: Todos
    
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
      {/* ... Header do Sidebar ... */}
      
      <nav className={styles.sidebarNav}>
        <ul>
          {navItems.map((item) => {
            // Lógica de Bloqueio Visual:
            // Se o item for restrito E o perfil do usuário NÃO estiver na lista de permitidos, não renderiza nada.
            if (item.restricted && !item.allowed.includes(userProfileId)) {
              return null;
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
      {/* ... Footer do Sidebar ... */}
    </aside>
  );
};

export default Sidebar;