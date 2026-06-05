# Rehacktor - Progetto finale React

Rehacktor e un portale dedicato ai videogiochi realizzato con React, Vite, React Router, Tailwind CSS, daisyUI e Supabase.

Il progetto usa le API di RAWG per mostrare videogiochi, cercarli per nome, filtrarli per genere e visualizzare le pagine di dettaglio. Gli utenti possono registrarsi, effettuare il login, modificare il profilo, caricare un avatar, salvare giochi preferiti e pubblicare recensioni.

## Funzionalita principali

- Homepage con videogiochi dell'anno corrente.
- Card dei videogiochi con immagine, rating, uscita, generi e link al dettaglio.
- Searchbar per cercare videogiochi per nome.
- Sidebar con generi e filtro per genere.
- Pagina dettaglio del singolo videogioco.
- Registrazione e login con Supabase Auth.
- Logout reale con chiusura della sessione Supabase.
- Persistenza della sessione dopo refresh o cambio pagina.
- Rotte protette per profilo e preferiti.
- Profilo utente con dati modificabili.
- Upload avatar con Supabase Storage.
- Preferiti salvati su Supabase, con controllo duplicati.
- Pagina dedicata ai preferiti.
- Preferiti visibili anche nel profilo.
- Recensioni per singolo videogioco.
- Eliminazione delle proprie recensioni.
- Recensioni visibili anche nel profilo.
- Controllo duplicati per evitare piu recensioni dello stesso utente sullo stesso gioco.

## Tecnologie usate

- React
- Vite
- React Router
- React Hook Form
- Tailwind CSS
- daisyUI
- Supabase Auth
- Supabase Database
- Supabase Storage
- RAWG API

## Struttura del progetto

```txt
src
├── components
├── context
├── database
├── layouts
├── router
└── views
```

## Variabili ambiente

Per avviare correttamente il progetto serve un file `.env` nella root.

Esempio:

```env
VITE_RAWG_API_KEY=la_tua_chiave_rawg
VITE_SUPABASE_URL=il_tuo_url_supabase
VITE_SUPABASE_PUBLISHABLE_KEY=la_tua_chiave_supabase
```

Il file `.env` non deve essere caricato su GitHub.

## Tabelle Supabase usate

### profiles

Contiene i dati del profilo utente:

- `id`
- `username`
- `first_name`
- `last_name`
- `avatar_url`
- `updated_at`

### favorites

Contiene i videogiochi preferiti dell'utente:

- `id`
- `user_id`
- `game_id`
- `game_name`
- `game_image`
- `game_rating`
- `game_released`
- `created_at`

### reviews

Contiene le recensioni dei videogiochi:

- `id`
- `user_id`
- `game_id`
- `username`
- `rating`
- `comment`
- `created_at`

## Comandi utili

Installare le dipendenze:

```bash
npm install
```

Avviare il progetto in locale:

```bash
npm run dev
```

Creare la build di produzione:

```bash
npm run build
```

## Stato finale

Il progetto copre le richieste principali della guida finale: portale videogiochi, filtri, ricerca, dettaglio, autenticazione, profilo modificabile, avatar, preferiti e recensioni.

Sono state aggiunte anche alcune migliorie: rotte protette, sessione persistente, controllo duplicati, pagina preferiti dedicata e gestione dei dati personali nel profilo.
