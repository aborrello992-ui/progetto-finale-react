# Progetto Finale React - Rehacktor

Rehacktor e un portale di videogiochi realizzato con React e Vite.

Il progetto usa le API di RAWG per mostrare videogiochi, permettere la ricerca per nome e filtrare i giochi per genere.

## Tecnologie usate

- React
- Vite
- React Router
- Tailwind CSS
- daisyUI
- RAWG API

## Funzionalita realizzate finora

- progetto React creato con Vite;
- configurazione di Tailwind CSS e daisyUI;
- struttura ordinata con cartelle `components`, `layouts`, `router` e `views`;
- router custom con React Router;
- Layout con Navbar, Sidebar, Outlet e Footer;
- Homepage con videogiochi dell'anno corrente;
- chiamate API tramite loader di React Router;
- componente `GameList` per mostrare la lista dei giochi;
- componente `GameCard` per mostrare una singola card;
- searchbar nella Navbar;
- pagina `SearchPage` per mostrare i risultati della ricerca;
- Sidebar con lista dei generi;
- pagina `GenrePage` per mostrare i giochi filtrati per genere.

## Variabili ambiente

Per usare le API di RAWG serve un file `.env` nella radice del progetto.

Esempio:

```env
VITE_RAWG_API_KEY=la_tua_api_key
```

Il file `.env` non deve essere caricato su GitHub.

## Comandi utili

Installare le dipendenze:

```bash
npm install
```

Avviare il progetto:

```bash
npm run dev
```

Verificare la build:

```bash
npm run build
```

## Stato del progetto

Il progetto e attualmente nella fase pubblica iniziale:

- Homepage completata;
- ricerca completata;
- filtro per genere completato.

I prossimi passi saranno:

- pagina di dettaglio del videogioco;
- autenticazione;
- profilo utente;
- preferiti;
- recensioni.
