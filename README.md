# Zorvyn

Zorvyn is a React-based personal finance dashboard for viewing balances, tracking transactions, and exploring monthly insights.

## Features

- Dashboard with balance, income, and expense summary cards
- Transactions page with search, filters, sorting, CSV export, and add/edit/delete support
- Insights page with category and monthly comparison analytics
- Light/dark theme toggle
- Role switcher for `admin` and `viewer`
- Local storage persistence for transactions, theme, and role

## Tech Stack

- React
- Vite
- Framer Motion
- Recharts
- Lucide React
- Custom CSS
- Tailwind CDN included in `index.html`

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
src/
  components/
    dashboard/
    insights/
    layout/
    transactions/
  context/
    AppContext.jsx
  data/
    categories.js
    transactions.js
  pages/
    Dashboard.jsx
    Insights.jsx
    Transactions.jsx
  utils/
    helpers.js
  App.jsx
  index.css
  main.jsx
index.html
vite.config.js
```

## App Flow

1. `src/main.jsx` loads the app and imports global styles.
2. `src/App.jsx` wraps everything with `AppProvider` and `Layout`.
3. `src/context/AppContext.jsx` manages shared state:
   - transactions
   - filters
   - role
   - theme
   - active page
4. `Layout` renders the sidebar, topbar, and current page content.
5. `App.jsx` switches between:
   - `Dashboard`
   - `Transactions`
   - `Insights`
6. `src/utils/helpers.js` computes totals, monthly chart data, category data, insights, CSV export, and formatting.

## State Management

The app uses React Context instead of Redux or another state library.

Main shared values:

- `transactions`
- `filteredTransactions`
- `totals`
- `role`
- `theme`
- `activePage`
- filter controls

Data is persisted using `localStorage`.

## Pages

### Dashboard

- Shows summary cards
- Shows balance trend chart
- Shows spending category chart

### Transactions

- Displays all filtered transactions
- Supports search, filter, and sort
- Allows CSV export
- Allows add/edit/delete for admin role

### Insights

- Generates financial insight cards
- Displays monthly income vs expense chart

## Data Files

- `src/data/transactions.js`: seed transaction data
- `src/data/categories.js`: category labels and colors

## Notes

- Theme is applied by toggling the `dark` class on the root document element.
- Tailwind is loaded from CDN in `index.html`, but the app styling is primarily handled through `src/index.css`.
- Transactions are stored in browser local storage, so data remains after refresh.

## License

This project is for learning and local development use.
