/**
 * Servicio para detectar y gestionar el tenant (subdominio)
 */

/**
 * Obtiene el subdominio actual
 * @returns {string|null} El subdominio o null si no hay
 */
export function getCurrentSubdomain() {
  const host = window.location.hostname;
  const baseDomain = import.meta.env.VITE_BASE_DOMAIN || 'meet-lines.local';
  
  // Si no termina con el dominio base, no hay subdominio
  if (!host.endsWith(baseDomain) || host === baseDomain) {
    return null;
  }
  
  // Extraer el subdominio
  // host: proyecto1.meet-lines.local
  // baseDomain: meet-lines.local
  const subdomainPart = host.substring(0, host.length - baseDomain.length - 1);
  
  return subdomainPart || null;
}

/**
 * Obtiene la URL base de la API
 * @returns {string} URL base de la API
 */
export function getApiBaseUrl() {
  const protocol = import.meta.env.VITE_API_PROTOCOL || 'http';
  
  // Si hay VITE_API_URL configurado, úsalo directamente
  if (import.meta.env.VITE_API_URL) {
    console.log('📍 getApiBaseUrl: usando VITE_API_URL =', import.meta.env.VITE_API_URL);
    return import.meta.env.VITE_API_URL;
  }

  const hostname = window.location.hostname;
  
  // Si estamos en un subdominio de meet-lines.local, usa localhost con el puerto del backend
  if (hostname.endsWith('.meet-lines.local')) {
    const backendPort = import.meta.env.VITE_BACKEND_PORT || '8080';
    console.log('📍 getApiBaseUrl: subdominio detectado, usando localhost:', `${protocol}://localhost:${backendPort}`);
    return `${protocol}://localhost:${backendPort}`;
  }

  // Backend port where the API is running (set in .env or default to 8080)
  const backendPort = import.meta.env.VITE_BACKEND_PORT || '8080';

  // If backendPort equals current window port, reuse it; otherwise use backendPort
  const currentPort = window.location.port;
  const portToUse = (currentPort && currentPort === backendPort) ? `:${currentPort}` : `:${backendPort}`;

  const url = `${protocol}://${hostname}${portToUse}`;
  console.log('📍 getApiBaseUrl: usando hostname actual:', url);
  return url;
}

/**
 * Verifica si estamos en un subdominio de proyecto
 * @returns {boolean}
 */
export function isInProjectSubdomain() {
  return getCurrentSubdomain() !== null;
}

/**
 * Obtiene el ID del proyecto desde localStorage (guardado tras login)
 * @returns {string|null}
 */
export function getProjectIdFromStorage() {
  return localStorage.getItem('currentProjectId');
}

/**
 * Guarda el ID del proyecto actual
 * @param {string} projectId
 */
export function saveProjectId(projectId) {
  localStorage.setItem('currentProjectId', projectId);
}
