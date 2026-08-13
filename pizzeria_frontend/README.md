# Den Glade Skorpe — Code-along (backoffice med modal)

Start-projekt til en code-along, hvor vi bygger **backoffice** sammen.
Tilføj/rediger-formularerne vises i en **modal** (ikke via `<Outlet />`/nestede ruter).
Samme struktur og dependencies som det færdige projekt.

## Kom i gang

```bash
npm install
npm run dev
```

Appen kører på **http://localhost:5173/preview/** (basename `/preview` er sat i
`src/settings.jsx` og `vite.config.js` — som i det færdige projekt).

> Backoffice henter/gemmer data via et API på `http://localhost:3042`
> (se `src/settings.jsx`). Husk at starte backend'en, før I bygger backoffice.

## Hvad er allerede bygget

- Hele det offentlige frontend: forside, retter + detaljer, kurv, kontakt, personale
- Routing (`createBrowserRouter`), `AppLayout`, `Loading`, `ErrorElement`, 404
- Data-hentning via **loaders** (`src/loaders/DataLoaders.jsx`)
- **Login / adgangsstyring**: `src/context/*`, `ProtectedRoute`, login-siden
- **`Modal`-komponent** (`src/components/modal/`) — genbrugelig, lukker på Esc / klik udenfor

## Hvad vi bygger i sessionen (backoffice)

Stubbe med TODO-kommentarer ligger klar — byg i denne rækkefølge:

1. `src/loaders/DataLoaders.jsx` → `backofficeLoader` (+ `requireAuth`).
   Henter også `categories` + `ingredients` til dropdowns.
2. `src/pages/backoffice/Backoffice.jsx` → hent data, tabs, **modal-state** (ingen Outlet).
3. `src/pages/backoffice/components/*` → tabellerne. Knapperne åbner modalen
   via callbacks (`onAdd`, `onEdit(item)`) i stedet for at navigere.
4. `src/hooks/useCrud.jsx` → `create`, `update`, `remove` (+ `placeOrder`) med `revalidator`.
5. `src/pages/backoffice/forms/*` → modal-indhold med react-hook-form + `useCrud`.
   Redigering får det valgte element som **prop** (ingen loader/action) og bruger `update()`.

Aktivér undervejs (ligger udkommenteret med TODO):

- Backoffice-**ruten** i `src/Routes.jsx` (én rute — INGEN nestede ruter mere)
- "Backoffice"-linket i `src/components/navigation/Navigation.jsx`

CSS til backoffice, formularer og modal er allerede med, så det ser rigtigt ud,
så snart komponenterne bygges.

## Modal-mønsteret kort

`Backoffice` holder en lille `modal`-state, fx `{ type: "dish-edit", item }`.
Sektionernes knapper sætter den (`onEdit(dish)` / `onAdd()`), og der renderes én
`<Modal>` med den rigtige formular indeni. Formularen kalder `create`/`update`
fra `useCrud` (som selv kører `revalidate()` + toast) og lukker med `onClose()`.
