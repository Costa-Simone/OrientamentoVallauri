export class Gruppo {
    public Id:string
    public Orario:string
    public OrarioFine:string
    public PIN:string

    constructor(id:string, orario:string, orarioFine:string, pin:string) {
        this.Id = id
        this.Orario = orario
        this.OrarioFine = orarioFine
        this.PIN = pin
    }
}
