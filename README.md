# Address Book

A simple in-memory Address Book built with **only JavaScript**. No frameworks, no backend, no database. This was built for a Web Developer Intern assessment.

## Features

- **Add Contact** — form on the left to add a contact with name, phone, email, address (street, state, postcode), and a description.
- **View Contacts** — all contacts render as cards on the right, newest additions included.
- **Search Contact** — type into the search box to filter contacts by name (case-insensitive, partial match) as you type.
- **Delete Contact** — each contact card has a "Delete" button that removes it by its `id`.

All data lives in a single in-memory array (`contacts`) inside `address_book.js`. Refreshing the page resets the data since there is no backend or storage involved.

## Project structure

```
address-book/
├── index.html   # Page structure and styling
├── address_book.js       # All application logic (data + DOM rendering)
└── README.md
```

## Data structure

Each contact is stored as an object shaped like this:

```js
{
  id: 1,
  name: "Hani Irwan",
  phone: "011-5990 7379",
  email: "imnnhani@gmail.com",
  address: {
    street: "10 Jalan BRP2/3",
    state: "Selangor",
    postcode: "47301"
  },
  description: "Interested in Web Development Intern at Datum."
}
```

## How to run

No build step or dependencies needed.

1. Clone this repository.
2. Open `index.html` directly in a browser (double-click it, or use an extension like VS Code's "Live Server").

## Implementation notes

- `addContact()` assigns each new contact an auto-incrementing `id` and pushes it into the `contacts` array.
- `deleteContact(id)` removes a contact by filtering the array for everything except the matching `id`.
- `searchContacts(query)` does a case-insensitive `includes()` match against each contact's name; an empty query returns the full list.
- `renderContacts(list)` is the single rendering function used by both "view all" and "search results" — it keeps the UI in sync with whatever subset of `contacts` is currently relevant.
- User-entered text is passed through a small `escapeHtml()` helper before being inserted into the page, to avoid unintentionally rendering HTML typed into a form field.
- Two sample contacts are seeded on load so the list isn't empty on first run — feel free to delete them.

## Screenshot / Demo
<img width="3837" height="2030" alt="image" src="https://github.com/user-attachments/assets/b1c52ace-397b-4cb7-971d-4eae76884c81" />
