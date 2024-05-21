# OrientamentoVallauri
### https://lucid.app/lucidchart/e29314de-cd6c-4a81-b370-0854985c093f/edit?viewport_loc=-1799%2C-533%2C1907%2C923%2C0_0&invitationId=inv_a1526e7e-1183-497b-b0bd-67ac0737dbbd

## Backend Environment

To set up backend environment variables, create a file named `.env` within the "backend" directory:

```plaintext
PORT = ****
DB_USER = ****
DB_PWD = ****
DB_NAME = ****
```

## ChatSide Environment

To set up backend environment variables, create a file named `env.ts` within the "ChatSide" directory:

```plaintext
export const ADMIN_ID = "000";
export const BROADCAST_ID = "999";
```

# INTRODUZIONE
Questo progetto ha previsto lo sviluppo di un software da eseguire su PC con monitor touchscreen, che dovrà essere utilizzato in diverse aule e laboratori, come Marconi, Laplace, Multicad e Cadcam durante i giorni di orientamento scolastico; un'applicazione web per l'amministratore che consente la gestione dei turni e degli studenti; un'applicazione mobile installata sui dispositivi degli alunni (già frequentanti il Vallauri) che portano a visitare i futuri studenti dell'istituto.
E' stato realizzato da [Costa Simone ](https://github.com/Costa-Simone), [Pizzorno Edoardo](https://github.com/EdoardoPizzorno), [Cairo Pietro](https://github.com/pieCairo) e [Migori Andrea](https://github.com/migoriA).
Ognuno si è occupato di un compito specifico: 
- Costa: ```Applicazione web (admin)```
- Pizzorno: ```Backend```
- Cairo: ```Sviluppo delle chat```
- Migori: ```Applicazione mobile```

# Specifiche del Progetto
### Funzionalità di Login
Il login viene effettuato tramite un codice di lunghezza variabile (4-24 caratteri) impostato nel database.
Per l'app lato utente, il login avviene con un codice a 12 caratteri. Il codice viene generato in maniera casuale dall'amministratore tramite l'applicazione web.
## Applicazione web (per l'ADMIN)
Dopo aver effettuato il login, gli alunni accedono a una pagina che consente di visualizzare tutti i gruppi tramite delle comode card. Cliccando su una di queste card, viene mostrata una schermata con l'elenco degli studenti registrati all'orientamento scolastico. Da questa pagina, gli utenti possono registrare l'arrivo delle persone, modificare al volo il turno assegnato e segnare chi non verrà.

### Funzionalità di Registrazione e Gestione dei Turni
Per semplificare la gestione, è stata implementata una schermata che permette di caricare i partecipanti e i turni direttamente da un file Excel nel database, utilizzando una libreria apposita. Questo rende l'aggiornamento dei dati rapido e senza errori.

### Gestione degli Arrivi e dei Turni
Gli arrivi dei partecipanti saranno scaglionati di 15 minuti, mentre l'accesso ai laboratori successivi sarà di 10 minuti. Ogni turno è associato a un codice di 12 caratteri che serve per sbloccare l'app mobile. Questo codice assicura che solo gli utenti autorizzati possano accedere alle funzioni dell'app.

### Flessibilità nella Gestione dei Turni
Il sistema è progettato per essere flessibile e permettere la reimpostazione dei turni ogni giorno, poiché il numero di turni può variare. Questo è particolarmente utile per gestire cambiamenti dell'ultimo minuto, come l'eliminazione di un gruppo che non partirà.

### Pagina Riepilogativa
È stata inoltre realizzata una pagina riepilogativa che mostra il "numero di famiglie attese" e il "numero di famiglie arrivate". Questa funzione offre una visione d'insieme e aiuta a monitorare l'affluenza in tempo reale.

### Funzionalità di Conferma degli Arrivi
Gli alunni possono indicare il loro arrivo in un laboratorio sia tramite un clic manuale su una voce specifica nell'app sia tramite la lettura del QR Code del laboratorio. Nel caso della lettura del QR Code, non è necessaria la doppia conferma, rendendo il processo più veloce. La schermata di arrivo permette di registrare l'"arrivo previsto", l'"arrivo effettivo" e il "tempo di permanenza" in ogni laboratorio, fornendo dati precisi per il monitoraggio.

## Applicazione mobile (per gli alunni)
Gli alunni possono effettuare il login nell'applicazione mobile utilizzando un codice di 12 caratteri. Ogni alunno è associato a un gruppo, identificato da un codice di 3 caratteri (ad esempio, T01 o T12).

Una volta effettuato l'accesso, gli alunni devono indicare il loro arrivo nei vari laboratori. Questo può essere fatto in due modi: tramite un clic manuale su una voce specifica nell'app o tramite la lettura del QR Code del laboratorio. Nel caso della lettura del QR Code, non è necessaria la doppia conferma, rendendo il processo più rapido ed efficiente.

L'elenco dei laboratori disponibili viene salvato nel database, in quanto può variare di anno in anno. Ogni volta che un alunno segnala il proprio arrivo in un laboratorio, deve essere registrato l'"arrivo previsto", l'"arrivo effettivo" e il "tempo di permanenza". Questi dati aiutano a monitorare in modo accurato la presenza e la partecipazione degli alunni nei diversi laboratori.

Per garantire che gli alunni confermino il loro arrivo in modo accurato, l'app richiede una doppia conferma quando l'arrivo viene indicato manualmente. Questo doppio passaggio è stato implementato per evitare errori e garantire che ogni arrivo sia registrato correttamente.

In sintesi, l'applicazione mobile offre un sistema intuitivo e affidabile per la gestione degli arrivi nei laboratori, semplificando il processo sia per gli alunni che per gli organizzatori.

# Problematiche Riscontrate
Siccome il progetto è stato realizzato da 4 persone, una difficoltà è stata la realizzazione del progetto tramite Github ed i branch.
Un'altra difficoltà è stata l'interfacciamento con il database e le varie modifiche che sono state apportate durante il suo sviluppo.

# Futuri Sviluppi

# Conclusione
Questo progetto mira a facilitare la gestione dei turni e degli arrivi delle persone in diverse aule e laboratori, migliorando e l'organizzazione.
