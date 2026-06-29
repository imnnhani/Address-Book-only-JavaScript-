/* ===========================================================
   Address Book — Vanilla JavaScript, in-memory data store
   No frameworks, no backend. All data lives in the `contacts`
   array for the lifetime of the page.
   =========================================================== */

// ---- In-memory data store -----------------------------------
let contacts = [];
let nextId = 1;

// ---- DOM references -------------------------------------------
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const streetInput = document.getElementById('street');
const stateInput = document.getElementById('state');
const postcodeInput = document.getElementById('postcode');
const descriptionInput = document.getElementById('description');
const formError = document.getElementById('formError');

const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearch');
const contactList = document.getElementById('contactList');
const tally = document.getElementById('tally');

// ---- Helpers -----------------------------------------------------

/**
 * Builds a single combined address string from its parts.
 */
function formatAddress(street, state, postcode) {
  return [street, state, postcode].filter(Boolean).join(', ');
}

/**
 * Escapes text before inserting into innerHTML, to avoid
 * accidentally rendering HTML typed into a form field.
 */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ---- Core operations -----------------------------------------------

/**
 * Add Contact: validates required fields, creates a contact
 * object, and pushes it into the in-memory array.
 */
function addContact(contact) {
  const newContact = {
    id: nextId++,
    name: contact.name.trim(),
    phone: contact.phone.trim(),
    email: contact.email.trim(),
    address: {
      street: contact.street.trim(),
      state: contact.state.trim(),
      postcode: contact.postcode.trim(),
    },
    description: contact.description.trim(),
  };
  contacts.push(newContact);
  return newContact;
}

/**
 * Delete Contact: removes a contact from the array by its id.
 */
function deleteContact(id) {
  contacts = contacts.filter(c => c.id !== id);
}

/**
 * Search Contact: case-insensitive search by (partial) name.
 * An empty query returns the full list.
 */
function searchContacts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return contacts;
  return contacts.filter(c => c.name.toLowerCase().includes(q));
}

// ---- Rendering -----------------------------------------------------

/**
 * View Contacts: renders whatever list is passed in (full list
 * or filtered search results) into the contact list panel.
 */
function renderContacts(list) {
  contactList.innerHTML = '';

  if (list.length === 0) {
    const message = contacts.length === 0
      ? 'No contacts yet. Add your first one on the left.'
      : 'No contacts match that search.';
    contactList.innerHTML = `<div class="empty-state">${message}</div>`;
  } else {
    list.forEach(contact => {
      const fullAddress = formatAddress(
        contact.address.street,
        contact.address.state,
        contact.address.postcode
      );

      const card = document.createElement('div');
      card.className = 'contact-card';
      card.innerHTML = `
        <div class="contact-info">
          <div class="name">${escapeHtml(contact.name)}</div>
          <div class="meta">${escapeHtml(contact.phone)} &middot; ${escapeHtml(contact.email)}</div>
          ${fullAddress ? `<div class="meta">${escapeHtml(fullAddress)}</div>` : ''}
          ${contact.description ? `<div class="desc">${escapeHtml(contact.description)}</div>` : ''}
          <div class="id-tag">ID: ${contact.id}</div>
        </div>
        <button class="delete-btn" data-id="${contact.id}">Delete</button>
      `;
      contactList.appendChild(card);
    });
  }

  tally.textContent = `${contacts.length} contact${contacts.length === 1 ? '' : 's'}`;
}

/**
 * Re-renders the list respecting whatever is currently typed
 * into the search box, so deletes/adds stay consistent with
 * an active search.
 */
function refresh() {
  renderContacts(searchContacts(searchInput.value));
}

// ---- Event wiring -----------------------------------------------------

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = nameInput.value;
  const phone = phoneInput.value;
  const email = emailInput.value;

  if (!name.trim() || !phone.trim() || !email.trim()) {
    formError.textContent = 'Name, phone, and email are required.';
    formError.style.display = 'block';
    return;
  }

  formError.style.display = 'none';

  addContact({
    name,
    phone,
    email,
    street: streetInput.value,
    state: stateInput.value,
    postcode: postcodeInput.value,
    description: descriptionInput.value,
  });

  form.reset();
  nameInput.focus();
  refresh();
});

contactList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = Number(e.target.getAttribute('data-id'));
    deleteContact(id);
    refresh();
  }
});

searchInput.addEventListener('input', refresh);

clearSearchBtn.addEventListener('click', () => {
  searchInput.value = '';
  refresh();
});

// ---- Seed a couple of sample contacts so the list isn't empty ----------
addContact({
  name: 'Aisha Rahman',
  phone: '012-345 6789',
  email: 'aisha.rahman@example.com',
  street: '12 Jalan Damai',
  state: 'Selangor',
  postcode: '47301',
  description: 'Met at the tech meetup, follow up about the internship referral.',
});
addContact({
  name: 'Daniel Tan',
  phone: '019-876 5432',
  email: 'daniel.tan@example.com',
  street: '88 Lorong Bunga',
  state: 'Penang',
  postcode: '10200',
  description: 'University friend, now working as a backend developer.',
});

// Initial render
refresh();
