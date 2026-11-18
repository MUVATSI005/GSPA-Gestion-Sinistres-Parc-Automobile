/* ============================================
   Gestion des Sinistres - Parc Automobile
   Application principale (localStorage)
   ============================================ */

const STORAGE_KEYS = {
  users: 'gspa_users',
  vehicles: 'gspa_vehicles',
  claims: 'gspa_claims',
  session: 'gspa_session'
};

const DEFAULT_USERS = [
  {
    id: 'u1',
    nom: 'Admin',
    prenom: 'Système',
    email: 'admin@parc.local',
    password: 'admin123',
    privilege: 'admin',
    numPermis: '',
    telephone: '0600000001',
    dateCreation: '2024-01-01'
  },
  {
    id: 'u2',
    nom: 'Dupont',
    prenom: 'Marie',
    email: 'marie.dupont@parc.local',
    password: 'gest123',
    privilege: 'gestionnaire',
    numPermis: '',
    telephone: '0600000002',
    dateCreation: '2024-02-15'
  },
  {
    id: 'u3',
    nom: 'Martin',
    prenom: 'Jean',
    email: 'jean.martin@parc.local',
    password: 'cond123',
    privilege: 'conducteur',
    numPermis: '12AB34567',
    telephone: '0600000003',
    dateCreation: '2024-03-10'
  },
  {
    id: 'u4',
    nom: 'Bernard',
    prenom: 'Sophie',
    email: 'sophie.bernard@parc.local',
    password: 'cond123',
    privilege: 'conducteur',
    numPermis: '98CD76543',
    telephone: '0600000004',
    dateCreation: '2024-04-05'
  }
];

const DEFAULT_VEHICLES = [
  {
    id: 'v1',
    immatriculation: 'AB-123-CD',
    marque: 'Renault',
    modele: 'Clio V',
    annee: 2022,
    type: 'Berline',
    couleur: 'Blanc',
    kilometrage: 45000,
    statut: 'disponible',
    conducteurId: 'u3',
    dateAjout: '2024-01-20'
  },
  {
    id: 'v2',
    immatriculation: 'EF-456-GH',
    marque: 'Peugeot',
    modele: '308',
    annee: 2021,
    type: 'Berline',
    couleur: 'Gris',
    kilometrage: 62000,
    statut: 'en_service',
    conducteurId: 'u4',
    dateAjout: '2024-02-10'
  },
  {
    id: 'v3',
    immatriculation: 'IJ-789-KL',
    marque: 'Citroën',
    modele: 'Berlingo',
    annee: 2023,
    type: 'Utilitaire',
    couleur: 'Bleu',
    kilometrage: 28000,
    statut: 'disponible',
    conducteurId: null,
    dateAjout: '2024-03-01'
  },
  {
    id: 'v4',
    immatriculation: 'MN-012-OP',
    marque: 'Toyota',
    modele: 'Yaris',
    annee: 2020,
    type: 'Citadine',
    couleur: 'Rouge',
    kilometrage: 78000,
    statut: 'en_reparation',
    conducteurId: null,
    dateAjout: '2024-01-05'
  }
];

const DEFAULT_CLAIMS = [
  {
    id: 's1',
    numero: 'SIN-2024-001',
    vehiculeId: 'v1',
    conducteurId: 'u3',
    dateSinistre: '2024-09-12',
    type: 'Collision',
    description: 'Accrochage léger sur parking. Pare-chocs avant endommagé.',
    lieu: 'Parking centre commercial, Lyon',
    gravite: 'légère',
    statut: 'cloture',
    coutEstime: 850,
    dateDeclaration: '2024-09-12',
    observations: 'Réparé le 25/09/2024'
  },
  {
    id: 's2',
    numero: 'SIN-2024-002',
    vehiculeId: 'v2',
    conducteurId: 'u4',
    dateSinistre: '2024-10-28',
    type: 'Bris de glace',
    description: 'Impact de gravier sur le pare-brise. Fissure progressive.',
    lieu: 'Autoroute A6, sortie Villefranche',
    gravite: 'moyenne',
    statut: 'en_cours',
    coutEstime: 320,
    dateDeclaration: '2024-10-28',
    observations: ''
  },
  {
    id: 's3',
    numero: 'SIN-2024-003',
    vehiculeId: 'v4',
    conducteurId: 'u3',
    dateSinistre: '2024-11-05',
    type: 'Stationnement',
    description: 'Véhicule heurté en stationnement. Portière conducteur enfoncée.',
    lieu: 'Rue de la République, Lyon',
    gravite: 'moyenne',
    statut: 'declare',
    coutEstime: 1200,
    dateDeclaration: '2024-11-05',
    observations: 'Attente devis carrosserie'
  }
];

function getData(key) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

function setData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function initStorage() {
  if (!getData(STORAGE_KEYS.users)) setData(STORAGE_KEYS.users, DEFAULT_USERS);
  if (!getData(STORAGE_KEYS.vehicles)) setData(STORAGE_KEYS.vehicles, DEFAULT_VEHICLES);
  if (!getData(STORAGE_KEYS.claims)) setData(STORAGE_KEYS.claims, DEFAULT_CLAIMS);
}

function generateId(prefix) {
  return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function getSession() {
  return getData(STORAGE_KEYS.session);
}

function setSession(user) {
  const session = {
    id: user.id,
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    privilege: user.privilege
  };
  setData(STORAGE_KEYS.session, session);
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.session);
}

function requireAuth(allowedRoles = null) {
  const session = getSession();
  if (!session) {
    window.location.href = 'index.html';
    return null;
  }
  if (allowedRoles && !allowedRoles.includes(session.privilege)) {
    showToast('Accès non autorisé pour votre rôle.', 'error');
    window.location.href = 'dashboard.html';
    return null;
  }
  return session;
}

function logout() {
  clearSession();
  window.location.href = 'index.html';
}

function getUsers() {
  return getData(STORAGE_KEYS.users) || [];
}

function saveUsers(users) {
  setData(STORAGE_KEYS.users, users);
}

function getUserById(id) {
  return getUsers().find(u => u.id === id);
}

function addUser(userData) {
  const users = getUsers();
  if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
    throw new Error('Cet email est déjà utilisé.');
  }
  const user = {
    id: generateId('u'),
    ...userData,
    dateCreation: new Date().toISOString().slice(0, 10)
  };
  users.push(user);
  saveUsers(users);
  return user;
}

function updateUser(id, data) {
  const users = getUsers();
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) throw new Error('Utilisateur introuvable.');
  if (data.email && users.some(u => u.id !== id && u.email.toLowerCase() === data.email.toLowerCase())) {
    throw new Error('Cet email est déjà utilisé.');
  }
  users[idx] = { ...users[idx], ...data };
  saveUsers(users);
  return users[idx];
}

function deleteUser(id) {
  const session = getSession();
  if (session && session.id === id) throw new Error('Vous ne pouvez pas supprimer votre propre compte.');
  let users = getUsers();
  users = users.filter(u => u.id !== id);
  saveUsers(users);
  const vehicles = getVehicles().map(v => {
    if (v.conducteurId === id) return { ...v, conducteurId: null };
    return v;
  });
  saveVehicles(vehicles);
}

function getVehicles() {
  return getData(STORAGE_KEYS.vehicles) || [];
}

function saveVehicles(vehicles) {
  setData(STORAGE_KEYS.vehicles, vehicles);
}

function getVehicleById(id) {
  return getVehicles().find(v => v.id === id);
}

function addVehicle(data) {
  const vehicles = getVehicles();
  if (vehicles.some(v => v.immatriculation.toUpperCase() === data.immatriculation.toUpperCase())) {
    throw new Error('Cette immatriculation existe déjà.');
  }
  const vehicle = {
    id: generateId('v'),
    ...data,
    dateAjout: new Date().toISOString().slice(0, 10)
  };
  vehicles.push(vehicle);
  saveVehicles(vehicles);
  return vehicle;
}

function updateVehicle(id, data) {
  const vehicles = getVehicles();
  const idx = vehicles.findIndex(v => v.id === id);
  if (idx === -1) throw new Error('Véhicule introuvable.');
  if (data.immatriculation && vehicles.some(v => v.id !== id && v.immatriculation.toUpperCase() === data.immatriculation.toUpperCase())) {
    throw new Error('Cette immatriculation existe déjà.');
  }
  vehicles[idx] = { ...vehicles[idx], ...data };
  saveVehicles(vehicles);
  return vehicles[idx];
}

function deleteVehicle(id) {
  const claims = getClaims();
  if (claims.some(c => c.vehiculeId === id && c.statut !== 'cloture')) {
    throw new Error('Impossible de supprimer : des sinistres non clôturés sont liés à ce véhicule.');
  }
  let vehicles = getVehicles().filter(v => v.id !== id);
  saveVehicles(vehicles);
}

function getClaims() {
  return getData(STORAGE_KEYS.claims) || [];
}

function saveClaims(claims) {
  setData(STORAGE_KEYS.claims, claims);
}

function getClaimById(id) {
  return getClaims().find(c => c.id === id);
}

function nextClaimNumber() {
  const claims = getClaims();
  const year = new Date().getFullYear();
  const nums = claims
    .map(c => c.numero)
    .filter(n => n && n.startsWith(`SIN-${year}-`))
    .map(n => parseInt(n.split('-')[2], 10))
    .filter(n => !isNaN(n));
  const next = nums.length ? Math.max(...nums) + 1 : 1;
  return `SIN-${year}-${String(next).padStart(3, '0')}`;
}

function addClaim(data) {
  const claim = {
    id: generateId('s'),
    numero: nextClaimNumber(),
    dateDeclaration: new Date().toISOString().slice(0, 10),
    statut: 'declare',
    ...data
  };
  const claims = getClaims();
  claims.push(claim);
  saveClaims(claims);
  return claim;
}

function updateClaim(id, data) {
  const claims = getClaims();
  const idx = claims.findIndex(c => c.id === id);
  if (idx === -1) throw new Error('Sinistre introuvable.');
  claims[idx] = { ...claims[idx], ...data };
  saveClaims(claims);
  return claims[idx];
}

function deleteClaim(id) {
  let claims = getClaims().filter(c => c.id !== id);
  saveClaims(claims);
}

function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'error' : type === 'warning' ? 'warning' : ''}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('show');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('show');
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR');
}

function privilegeBadge(priv) {
  const labels = { admin: 'Admin', gestionnaire: 'Gestionnaire', conducteur: 'Conducteur' };
  return `<span class="badge badge-${priv}">${labels[priv] || priv}</span>`;
}

function statutBadge(statut) {
  const labels = {
    declare: 'Déclaré',
    en_cours: 'En cours',
    cloture: 'Clôturé',
    refuse: 'Refusé',
    disponible: 'Disponible',
    en_service: 'En service',
    en_reparation: 'En réparation',
    hors_service: 'Hors service'
  };
  const cls = {
    declare: 'declare',
    en_cours: 'en-cours',
    cloture: 'cloture',
    refuse: 'refuse',
    disponible: 'cloture',
    en_service: 'en-cours',
    en_reparation: 'declare',
    hors_service: 'refuse'
  };
  return `<span class="badge badge-${cls[statut] || 'declare'}">${labels[statut] || statut}</span>`;
}

function getConducteurName(id) {
  if (!id) return '—';
  const u = getUserById(id);
  return u ? `${u.prenom} ${u.nom}` : '—';
}

function getVehicleLabel(id) {
  if (!id) return '—';
  const v = getVehicleById(id);
  return v ? `${v.immatriculation} (${v.marque} ${v.modele})` : '—';
}

function renderSidebar(activePage) {
  const session = getSession();
  if (!session) return;

  const navItems = [
    { href: 'dashboard.html', icon: '📊', label: 'Tableau de bord', roles: ['admin', 'gestionnaire', 'conducteur'] },
    { href: 'user.html', icon: '👥', label: 'Utilisateurs', roles: ['admin'] },
    { href: 'auto.html', icon: '🚗', label: 'Parc automobile', roles: ['admin', 'gestionnaire'] },
    { href: 'sinistre.html', icon: '📋', label: 'Sinistres', roles: ['admin', 'gestionnaire', 'conducteur'] }
  ];

  const navHtml = navItems
    .filter(item => item.roles.includes(session.privilege))
    .map(item => `
      <a href="${item.href}" class="nav-item ${activePage === item.href ? 'active' : ''}">
        <span class="icon">${item.icon}</span>
        ${item.label}
      </a>
    `).join('');

  const initials = (session.prenom[0] + session.nom[0]).toUpperCase();

  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <div class="brand">
          <div class="brand-icon">🚗</div>
          <div>
            <h2>GSPA</h2>
            <span>Gestion Sinistres</span>
          </div>
        </div>
      </div>
      <nav class="sidebar-nav">
        ${navHtml}
      </nav>
      <div class="sidebar-footer">
        <div class="user-info">
          <div class="user-avatar">${initials}</div>
          <div>
            <div class="name">${session.prenom} ${session.nom}</div>
            <div class="role">${session.privilege}</div>
          </div>
        </div>
        <button class="btn-logout" onclick="logout()">Déconnexion</button>
      </div>
    </aside>
  `;
}

function setupLayout(activePage, pageTitle) {
  initStorage();
  const session = requireAuth();
  if (!session) return null;

  document.body.innerHTML = `
    <div class="app-layout">
      ${renderSidebar(activePage)}
      <div class="main-content">
        <header class="topbar">
          <div style="display:flex;align-items:center;gap:12px">
            <button class="menu-toggle" onclick="document.getElementById('sidebar').classList.toggle('open')">☰</button>
            <h1>${pageTitle}</h1>
          </div>
          <div class="actions" id="topbar-actions"></div>
        </header>
        <div class="content" id="page-content"></div>
      </div>
    </div>
    <div class="toast-container"></div>
  `;

  document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.querySelector('.menu-toggle');
    if (sidebar && sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== toggle) {
      sidebar.classList.remove('open');
    }
  });

  return session;
}

initStorage();
