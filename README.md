# OrientamentoVallauri

### https://lucid.app/lucidchart/e29314de-cd6c-4a81-b370-0854985c093f/edit?viewport_loc=-1799%2C-533%2C1907%2C923%2C0_0&invitationId=inv_a1526e7e-1183-497b-b0bd-67ac0737dbbd

## Backend Environment

To set up backend environment variables, create a file named `.env` within the "backend" directory:

```plaintext
PORT = ****
DB_USER = ****
DB_PWD = ****
DB_NAME = ****
TOKEN_DURATION = ****
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

- Costa: `Applicazione web (admin)`
- Pizzorno: `Backend`
- Cairo: `Sviluppo delle chat`
- Migori: `Applicazione mobile`

# Specifiche del Progetto

### Funzionalità di Login

Il login viene effettuato lato admin tramite un codice di lunghezza variabile (4-24 caratteri) cryptato e salvato nel database.
Per l'app mobile lato utente, il login avviene con un codice a 12 caratteri, generato casualmente dall'amministratore tramite l'applicazione web.

## Applicazione web (lato Admin)

Dopo aver effettuato il login, il server provvederà a fornite un token JWT per garantire l'accesso automatico per la durata di 24h.
L'utente verrà reindirizzato a una pagina che consente la visualizzazione dei gruppi dell'indirizzo selezionato.

### Pagina Home

Con la barra di navigazione sarà possibile navigare tra i diversi tab del sito:

- Home: pagina per la visualizzazione dei gruppi e i loro dettagli
- Studenti: pagina per l'aggiunta di nuovi studenti
- Gruppi: pagina per l'aggiunta di nuovi gruppi
- Percorso: pagina per la visualizzazione del percorso dei gruppi nei vari laboratori
- Chat: pagina per la comunicazione tra l'Admin e gli accompagnatori

L'indirizzo da visualizzare è selezionabile attraverso una dropdown list (contenente gli indirizzi del Vallauri, Liceo, Tesauro e del gruppo Fantasma) che aggiornerà automaticamente i gruppi visualizzati.

I gruppi vengono visualizzati mediante delle card con i seguenti attributi visualizzati:

- Codice del gruppo
- Orario di ingresso
- Orario di uscita
  Al click su ogni gruppo si verrà reindirizzati alla pagina della visualizzazione del gruppo.

![Alt text](https://github.com/Costa-Simone/OrientamentoVallauri/blob/main/Images/Home.png)

### Pagina dei dettagli del gruppo

La pagina dei dettagli permette la visualizzazione dei dettagli del gruppo selezionato.
In alto a sinistra presenta l'identificativo del gruppo selezionato.
Nella parte in alto a destra presenta un bottone per la generazione del PIN del gruppo, che verrà visualizzato con una finestra modale e che servirà per l'acceso dall'app mobile.

E' poi presente una tabella per la gestione degli studenti appartenenti al gruppo, con i seguenti campi:

- Nominativo: nome e cognome dello studente
- Scuola di provenienza: indica da che scuola media proviene lo studente
- SlotITI: indica a che gruppo del Vallauri appartiene
- SlotLICEO: indica a che gruppo del Liceo appartiene
- SlotAFM: indica a che gruppo del Tesauro appaertiene
- Presenza: presenta un toggle switch per indicare la presenza dello studente
- Azioni studente: presenta un bottone per la modifica del gruppo di appartenenza relativo all'attuale indirizzo selezionato e un bottone per l'eliminazione dello studente dalla lista (verrà spostato nel gruppo Fantasma, nel caso in cui si presentasse all'ultimo e lo si vuole aggiungere in un altro gruppo)

![Alt text](https://github.com/Costa-Simone/OrientamentoVallauri/blob/main/Images/DettaglioGruppo.png)
![Alt text](https://github.com/Costa-Simone/OrientamentoVallauri/blob/main/Images/PINGruppo.png)

### Pagina dei gruppi

La pagina dei gruppi permette l'inserimento di nuovi gruppi.
In alto a sinistra è possibile visualizzare un input type file (per l'aggiunta di molteplici gruppi grazie all'importazione di un file Excel) e un bottone (per l'aggiunta di un singolo gruppo grazie a una finestra modale in cui sarà possibile specificare l'indirizzo a cui appartiene il nuovo gruppo e in che orario inizierà il suo giro).

Se si inserisce un file nell'appositivo tag di input, i dati inseriti verranno visualizzati in delle tabelle suddivise per indirizzo, con la visualizzazione di tutti gli orari di ingresso nei vari laboratori, l'orario di ingresso e l'orario di uscita.

![Alt text](https://github.com/Costa-Simone/OrientamentoVallauri/blob/main/Images/Gruppi.png)

### Pagina degli studenti

La pagina degli studenti permette l'inserimento di nuovi studenti.
In alto a sinistra è possibile visualizzare un input type file (per l'aggiunta di molteplici studenti grazie all'importazione di un file Excel) e un bottone (per l'aggiunta di un singolo studente grazie a una finestra modale in cui sarà possibile specificare il nominativo, la scuola di provenienza e i gruppi a cui appartiene).

Se si inserisce un file nell'appositivo tag di input, i dati inseriti verranno visualizzati in delle tabelle suddivise per gruppo, con la visualizzazione di tutti i campi degli studenti.

![Alt text](https://github.com/Costa-Simone/OrientamentoVallauri/blob/main/Images/Studenti.png)

### Pagine del percorso

La pagina del percorso permette la visualizzazione in tempo reale dell'attuale posizione di tutti i gruppi nei vari laboratori.
Vengono visualizzati i diversi laboratori con l'utilizzo delle card, che avranno:

- Nome laboratorio: che indica di che laboratorio si tratta
- Gruppo: specifica il gruppo che è all'interno del laboratorio
- Timer: permette di visualizzare da quanto tempo il gruppo è dentro al laboratorio. Se sfora il suo tempo l'utente verrà notificato del ritardo

![Alt text](https://github.com/Costa-Simone/OrientamentoVallauri/blob/main/Images/Percorso.png)

## Applicazione mobile (per gli alunni)

Gli alunni possono effettuare il login nell'applicazione mobile utilizzando un codice di 12 caratteri. Ogni alunno è associato a un gruppo, identificato da un codice di 3 caratteri (ad esempio, T01 o T12).

Una volta effettuato l'accesso, gli alunni devono indicare il loro arrivo nei vari laboratori. Questo può essere fatto in due modi: tramite un clic manuale su una voce specifica nell'app o tramite la lettura del QR Code del laboratorio. Nel caso della lettura del QR Code, non è necessaria la doppia conferma, rendendo il processo più rapido ed efficiente.

L'elenco dei laboratori disponibili viene salvato nel database, in quanto può variare di anno in anno. Ogni volta che un alunno segnala il proprio arrivo in un laboratorio, deve essere registrato l'"arrivo previsto", l'"arrivo effettivo" e il "tempo di permanenza". Questi dati aiutano a monitorare in modo accurato la presenza e la partecipazione degli alunni nei diversi laboratori.

Per garantire che gli alunni confermino il loro arrivo in modo accurato, l'app richiede una doppia conferma quando l'arrivo viene indicato manualmente. Questo doppio passaggio è stato implementato per evitare errori e garantire che ogni arrivo sia registrato correttamente.

In sintesi, l'applicazione mobile offre un sistema intuitivo e affidabile per la gestione degli arrivi nei laboratori, semplificando il processo sia per gli alunni che per gli organizzatori.

## Sviluppo chat

Per lo sviluppo della chat, ho utilizzato due componenti distinti: chat-list e chat-component. La componente chat-list recupera dal server i gruppi disponibili e genera un elenco delle chat. Ogni voce dell'elenco mostra una vista generale della chat, incluso l'ultimo messaggio inviato o ricevuto e l'orario di esso.

![image](https://github.com/Costa-Simone/OrientamentoVallauri/assets/92369419/66b38112-d042-4ed7-8a7d-496376fe32fb)

Quando si seleziona una chat dall'elenco, si apre la chat-component, che mostra la vista dettagliata della conversazione. I messaggi inviati dall'utente sono allineati a destra, mentre quelli ricevuti sono allineati a sinistra. Cliccando su un messaggio, si apre un menù a tendina minimale con le opzioni per rispondere al messaggio o eliminarlo (solo lato ADMIN).

![image](https://github.com/Costa-Simone/OrientamentoVallauri/assets/92369419/03a31dcb-d878-4512-81ed-cc81413cef7c)

Se si sceglie l'opzione "Rispondi", il messaggio selezionato viene ancorato in fondo alla chat come riferimento per la risposta. È possibile annullare la risposta premendo una 'X' sul lato destro del messaggio di risposta. Una volta inviata la risposta, il nuovo messaggio mostra il testo inserito con sopra il messaggio a cui si è risposto.

Se si seleziona "Elimina", dopo la conferma tramite una Sweet Alert, il messaggio viene rimosso dal database e dalla chat.

# Problematiche Riscontrate

Siccome il progetto è stato realizzato da 4 persone, una difficoltà è stata la realizzazione del progetto tramite Github ed i branch.
Un'altra difficoltà è stata l'interfacciamento con il database e le varie modifiche che sono state apportate durante il suo sviluppo.

# Futuri Sviluppi

# Conclusione

Questo progetto mira a facilitare la gestione dei turni e degli arrivi delle persone in diverse aule e laboratori, migliorando e l'organizzazione.
