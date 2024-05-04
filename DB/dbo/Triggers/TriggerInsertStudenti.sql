CREATE TRIGGER [InserimentoStudenti]
ON [dbo].[Studenti]
AFTER INSERT
AS
BEGIN
    INSERT INTO Partecipanti(
        IdGruppo, IdStudente
    ) SELECT i.SlotITI, i.Id
    FROM inserted i
END
