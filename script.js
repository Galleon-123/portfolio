const profileUrl = "https://api.github.com/users/Galleon-123";
const reposUrl = "https://api.github.com/users/Galleon-123/repos?per_page=100&sort=updated";

const numberFormatter = new Intl.NumberFormat("en");
const tabSwitch = document.querySelector(".tab-switch");
const tabLinks = Array.from(document.querySelectorAll(".tab-link"));
const tabSections = tabLinks
  .map((link) => document.getElementById(link.dataset.tab))
  .filter(Boolean);
const themeToggle = document.querySelector(".theme-toggle");
const themeToast = document.querySelector(".theme-toast");
let themeToastTimer;

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "unknown";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(dateValue));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderRepositories(repositories) {
  const repoList = document.getElementById("repoList");
  if (!repoList) {
    return;
  }

  if (!repositories.length) {
    repoList.innerHTML = '<p class="muted">No public repositories were returned by GitHub.</p>';
    return;
  }

  repoList.innerHTML = repositories.map((repo) => {
    const description = escapeHtml(repo.description || "No public description");
    const language = escapeHtml(repo.language || "No primary language");
    const archiveLabel = repo.archived ? "Archived" : "Active";
    const repoName = escapeHtml(repo.name);
    const repoUrl = escapeHtml(repo.html_url);

    return `
      <article class="repo-item">
        <a href="${repoUrl}" target="_blank" rel="noreferrer">${repoName}</a>
        <p>${description}</p>
        <span>${archiveLabel} public repository - ${language} - ${numberFormatter.format(repo.stargazers_count)} stars - updated ${formatDate(repo.updated_at)}</span>
      </article>
    `;
  }).join("");
}

function updateTabIndicator(activeLink) {
  if (!tabSwitch || !activeLink) {
    return;
  }

  const switchRect = tabSwitch.getBoundingClientRect();
  const linkRect = activeLink.getBoundingClientRect();
  const tabPad = parseFloat(getComputedStyle(tabSwitch).getPropertyValue("--tab-pad")) || 7;
  const indicatorWidth = Math.max(linkRect.width + 22, 84);
  const x = linkRect.left - switchRect.left + tabSwitch.scrollLeft + (linkRect.width / 2) - (indicatorWidth / 2);

  tabSwitch.style.setProperty("--indicator-width", `${indicatorWidth}px`);
  tabSwitch.style.setProperty("--indicator-x", `${x - tabPad}px`);
}

function setActiveTab(nextLink) {
  if (!nextLink) {
    return;
  }

  tabLinks.forEach((link) => {
    const active = link === nextLink;
    link.classList.toggle("is-active", active);

    if (active) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  updateTabIndicator(nextLink);
}

function syncActiveTabWithScroll() {
  if (!tabSections.length) {
    setActiveTab(tabLinks[0]);
    return;
  }

  const activeSection = [...tabSections].reverse().find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= 170;
  });
  const targetId = activeSection ? activeSection.id : "top";
  const nextLink = tabLinks.find((link) => link.dataset.tab === targetId);

  setActiveTab(nextLink || tabLinks[0]);
}

function initTabSwitch() {
  if (!tabSwitch || !tabLinks.length) {
    return;
  }

  tabLinks.forEach((link) => {
    link.addEventListener("click", () => setActiveTab(link));
  });

  syncActiveTabWithScroll();
  window.addEventListener("resize", syncActiveTabWithScroll);
  window.addEventListener("scroll", syncActiveTabWithScroll, { passive: true });
}

function showThemeToast(theme) {
  if (!themeToast) {
    return;
  }

  window.clearTimeout(themeToastTimer);
  themeToast.textContent = theme === "dark" ? "Dark mode active" : "Light mode active";
  themeToast.classList.remove("is-visible");
  void themeToast.offsetWidth;
  themeToast.classList.add("is-visible");
  themeToastTimer = window.setTimeout(() => {
    themeToast.classList.remove("is-visible");
  }, 1700);
}

function setTheme(theme, announce = false) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("portfolioTheme", nextTheme);

  if (!themeToggle) {
    return;
  }

  const darkActive = nextTheme === "dark";
  themeToggle.setAttribute("aria-pressed", String(darkActive));
  themeToggle.setAttribute("aria-label", `Switch to ${darkActive ? "light" : "dark"} theme`);
  const label = themeToggle.querySelector(".theme-toggle-label");

  if (label) {
    label.textContent = darkActive ? "Light mode" : "Dark mode";
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }

  if (announce) {
    showThemeToast(nextTheme);
  }
}

function initThemeToggle() {
  const savedTheme = localStorage.getItem("portfolioTheme");
  setTheme(savedTheme || "light");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const activeTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      setTheme(activeTheme, true);
    });
  }
}

async function loadGithubReport() {
  try {
    const [profileResponse, reposResponse] = await Promise.all([
      fetch(profileUrl),
      fetch(reposUrl)
    ]);

    if (!profileResponse.ok || !reposResponse.ok) {
      throw new Error("GitHub request failed");
    }

    const profile = await profileResponse.json();
    const repositories = await reposResponse.json();
    const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);

    setText("repoCount", numberFormatter.format(profile.public_repos));
    setText("heroRepoCount", `${numberFormatter.format(profile.public_repos)} repo`);
    setText("followerCount", numberFormatter.format(profile.followers));
    setText("followingCount", numberFormatter.format(profile.following));
    setText("starCount", numberFormatter.format(totalStars));
    setText("githubUpdated", `GitHub refreshed ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`);

    const avatar = document.getElementById("profileAvatar");
    if (avatar && profile.avatar_url) {
      avatar.src = profile.avatar_url;
    }

    renderRepositories(repositories);
  } catch (error) {
    setText("githubUpdated", "GitHub data is using fallback values");
  }
}

if (window.lucide) {
  window.lucide.createIcons();
}

initThemeToggle();
initTabSwitch();
loadGithubReport();
setInterval(loadGithubReport, 300000);
