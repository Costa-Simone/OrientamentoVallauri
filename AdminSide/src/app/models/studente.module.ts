export class Studente {
    public Id: number
    public Nominativo:string
    public ScuolaProvenienza:string
    public isPresente:number
    public SlotITI:string
    public SlotLICEO:string
    public SlotAFM:string

    constructor(id:number, nominativo:string, scuolaProvenienza:string, isPresente:number, slotITI:string, slotLICEO:string, slotAFM:string) {
        this.Id = id
        this.Nominativo = nominativo
        this.ScuolaProvenienza = scuolaProvenienza
        this.isPresente = isPresente
        this.SlotITI = slotITI
        this.SlotLICEO = slotLICEO
        this.SlotAFM = slotAFM
    }
}
