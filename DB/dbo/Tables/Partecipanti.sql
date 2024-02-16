CREATE TABLE [dbo].[Partecipanti]
(
  [IdGruppo] VARCHAR(5) NOT NULL PRIMARY KEY,
  [IdStudente] INT NOT NULL,
  FOREIGN KEY (IdGruppo) REFERENCES [dbo].[Gruppi](Id),
  FOREIGN KEY (IdStudente) REFERENCES [dbo].[Studenti](Id)
);

GO
