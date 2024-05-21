CREATE TRIGGER [InserimentoStudenti]
ON [dbo].[Studenti]
AFTER INSERT
AS
BEGIN
    INSERT INTO Partecipanti(
        IdGruppo, IdStudente
    ) SELECT i.SlotITI, i.Id
    FROM inserted i

    INSERT INTO Partecipanti (
        IdGruppo, IdStudente
    ) SELECT i.SlotLICEO, i.Id
    from inserted i
    where i.SlotLICEO <> '-'

    INSERT INTO Partecipanti (
        IdGruppo, IdStudente
    ) SELECT i.SlotAFM, i.Id
    from inserted i
    where i.SlotAFM <> '-'
END
