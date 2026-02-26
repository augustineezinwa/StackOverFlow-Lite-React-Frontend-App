/**
 * Returns the current logged-in user from localStorage (set on login/signup).
 * Handles both { user: { id, fullName, email } } and flat { id, fullName, email }.
 */
function getCurrentUser() {
  try {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    const data = JSON.parse(raw);
    const user = data.user || data;
    const id = user.id != null ? user.id : data.id;
    const fullName = user.fullName || data.fullName || (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}`.trim() : '') || '';
    const email = user.email || data.email || '';
    if (id == null && !fullName && !email) return null;
    return { id, fullName, email, ...user };
  } catch (e) {
    return null;
  }
}

export default getCurrentUser;
