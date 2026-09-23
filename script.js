const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const repoGrid = document.querySelector('#repo-grid');

const savedTheme = localStorage.getItem('theme');
const preferredTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
const initialTheme = savedTheme || preferredTheme;

setTheme(initialTheme);

themeButton.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
  localStorage.setItem('theme', nextTheme);
});

function setTheme(theme) {
  root.dataset.theme = theme;
  const isLight = theme === 'light';
  themeButton.setAttribute('aria-pressed', String(isLight));
  themeButton.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
}

async function loadRepositories() {
  try {
    const response = await fetch('https://api.github.com/users/sajadhatami/repos?sort=updated&per_page=12', {
      headers: { Accept: 'application/vnd.github+json' }
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }

    const repositories = await response.json();
    const selected = repositories
      .filter((repo) => !repo.fork && !repo.archived && repo.name !== 'sajadhatami.github.io')
      .slice(0, 6);

    renderRepositories(selected);
  } catch (error) {
    renderRepositoryFallback();
  } finally {
    repoGrid.setAttribute('aria-busy', 'false');
  }
}

function renderRepositories(repositories) {
  repoGrid.replaceChildren();

  if (repositories.length === 0) {
    const emptyCard = document.createElement('article');
    emptyCard.className = 'repo-card repo-empty';

    const message = document.createElement('p');
    message.textContent = 'Public projects will appear here automatically as I publish them on GitHub.';

    emptyCard.append(message);
    repoGrid.append(emptyCard);
    return;
  }

  repositories.forEach((repo) => {
    const card = document.createElement('article');
    card.className = 'repo-card';

    const number = document.createElement('p');
    number.className = 'card-number';
    number.textContent = 'PUBLIC REPOSITORY';

    const title = document.createElement('h3');
    const link = document.createElement('a');
    link.href = repo.html_url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = repo.name;
    title.append(link);

    const description = document.createElement('p');
    description.textContent = repo.description || 'Project notes and source code on GitHub.';

    const meta = document.createElement('div');
    meta.className = 'repo-meta';

    if (repo.language) {
      const language = document.createElement('span');
      language.className = 'language';
      language.textContent = repo.language;
      meta.append(language);
    }

    const stars = document.createElement('span');
    stars.textContent = `★ ${repo.stargazers_count}`;
    meta.append(stars);

    const updated = document.createElement('span');
    updated.textContent = `updated ${formatMonth(repo.updated_at)}`;
    meta.append(updated);

    card.append(number, title, description, meta);
    repoGrid.append(card);
  });
}

function renderRepositoryFallback() {
  repoGrid.replaceChildren();

  const card = document.createElement('article');
  card.className = 'repo-card repo-empty';

  const message = document.createElement('p');
  const link = document.createElement('a');
  link.href = 'https://github.com/sajadhatami?tab=repositories';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'GitHub';

  message.append('The repository feed is temporarily unavailable. View projects directly on ', link, '.');
  card.append(message);
  repoGrid.append(card);
}

function formatMonth(value) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric'
  }).format(new Date(value));
}

loadRepositories();
