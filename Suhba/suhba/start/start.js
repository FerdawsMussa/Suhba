document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput3');
  const cards = document.querySelectorAll('.card3');
  const resultCount = document.querySelector('.result-count');
  const searchIcon = document.querySelector('.search-icon3');

  // Store original content for highlighting
  const originalContent = Array.from(cards, card => card.innerHTML);

  function resetCards() {
    cards.forEach((card, idx) => {
      card.innerHTML = originalContent[idx];
      card.classList.remove('hidden');
    });
    resultCount.style.display = 'none';
  }

  function highlightText(card, term, idx) {
    card.innerHTML = originalContent[idx];
    const regex = new RegExp(`(${term})`, 'gi');
    const walker = document.createTreeWalker(card, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walker.nextNode()) {
      if (regex.test(node.nodeValue)) {
        const span = document.createElement('span');
        span.innerHTML = node.nodeValue.replace(regex, '<mark>$1</mark>');
        node.parentNode.replaceChild(span, node);
      }
    }
  }

  function doSearch() {
    const term = searchInput.value.toLowerCase().trim();
    if (!term) return resetCards();

    let count = 0;
    cards.forEach((card, idx) => {
      const text = card.textContent.toLowerCase();
      if (text.includes(term)) {
        card.classList.remove('hidden');
        highlightText(card, term, idx);
        count++;
      } else {
        card.classList.add('hidden');
      }
    });

    resultCount.textContent = count ? `${count} result${count > 1 ? 's' : ''} found` : `No results found for "${term}"`;
    resultCount.style.color = count ? 'var(--text-gray)' : '#ff6b6b';
    resultCount.style.display = 'block';
  }

  searchInput.addEventListener('input', doSearch);
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      resetCards();
      searchInput.focus();
    }
  });

  if (searchIcon) {
    searchIcon.addEventListener('click', () => {
      if (searchInput.value) {
        searchInput.value = '';
        resetCards();
      }
      searchInput.focus();
    });
  }

  resetCards(); // Initialize
});


// Dropdown toggle
const userPill = document.getElementById('userPill');
const userDropdown = document.getElementById('userDropdown');
const profileBtn = document.getElementById('profileBtn');
const settingsBtn = document.getElementById('settingsBtn');
const profileInfo = document.getElementById('profileInfo');

userPill.addEventListener('click', () => {
  userDropdown.classList.toggle('hidden');
});

// Show profile info
profileBtn.addEventListener('click', () => {
  profileInfo.classList.toggle('hidden');
});

// Open edit modal
const editModal = document.getElementById('editModal');
settingsBtn.addEventListener('click', () => {
  editModal.classList.remove('hidden');
  userDropdown.classList.add('hidden');
});

// Close modal
document.getElementById('closeModalBtn').addEventListener('click', () => {
  editModal.classList.add('hidden');
});

// Save profile changes
document.getElementById('saveProfileBtn').addEventListener('click', () => {
  const newName = document.getElementById('editName').value;
  const newEmail = document.getElementById('editEmail').value;

  document.getElementById('profileName').textContent = newName;
  document.getElementById('profileEmail').textContent = newEmail;

  editModal.classList.add('hidden');
});
