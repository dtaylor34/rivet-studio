import React from 'react';

// Lightweight client-side access gate.
// Wrap any content with <PasswordGate password={...} storageKey="...">...</PasswordGate>.
// Until the visitor enters a name + the correct password, a full-screen blank
// page is shown covering the rest of the site. Once unlocked, the session is
// remembered via sessionStorage so navigating away and back within the same
// browser session won't re-prompt.
const PasswordGate = ({ username, password, storageKey = 'gate-unlocked', title = 'Protected Section', children }) => {
  const [unlocked, setUnlocked] = React.useState(() => {
    try {
      return sessionStorage.getItem(storageKey) === 'true';
    } catch {
      return false;
    }
  });
  const [name, setName] = React.useState('');
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your username.');
      return;
    }
    if (username && name.trim().toLowerCase() !== username.toLowerCase()) {
      setError('Incorrect username or password. Please try again.');
      return;
    }
    if (value !== password) {
      setError('Incorrect username or password. Please try again.');
      return;
    }
    setUnlocked(true);
    setError('');
    try {
      sessionStorage.setItem(storageKey, 'true');
      sessionStorage.setItem(`${storageKey}-name`, name.trim());
    } catch { /* ignore */ }
  };

  if (unlocked) return children;

  return (
    <div className="fixed inset-0 z-[100] bg-base flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-light text-heading mb-2">{title}</h1>
        <p className="text-muted mb-6">This section is private. Please enter your username and password to continue.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(''); }}
            placeholder="Username"
            autoFocus
            autoComplete="username"
            aria-label="Username"
            className="w-full px-4 py-3 bg-surface border border-main rounded-lg text-body placeholder:text-faint focus:outline-none focus:border-heading transition-colors"
          />
          <input
            type="password"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(''); }}
            placeholder="Password"
            aria-label="Password"
            className="w-full px-4 py-3 bg-surface border border-main rounded-lg text-body placeholder:text-faint focus:outline-none focus:border-heading transition-colors"
          />
          {error && (
            <p className="text-sm text-red-500" role="alert">{error}</p>
          )}
          <button
            type="submit"
            className="w-full px-6 py-3 border border-heading text-heading rounded-full font-light tracking-wide hover:bg-heading hover:text-base transition-colors duration-300"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordGate;
