
export type Notifica = {
    titolo: string,
    descrizione?: string,
    tipo: "info" | "warning" | "errore",
    icona?: string,
    terminata?: boolean,
}
