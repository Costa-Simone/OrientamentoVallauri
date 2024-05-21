CREATE TABLE [dbo].[Orari]
(
  [IdGruppo] VARCHAR(3) NOT NULL,
  [IdLaboratorio] INT NOT NULL,
  [OrarioPrevistoIngresso] VARCHAR(5) NOT NULL,
  [OrarioEffettivoIngresso] VARCHAR(5) NULL,
  PRIMARY KEY (IdGruppo, IdLaboratorio),
  FOREIGN KEY (IdLaboratorio) REFERENCES [dbo].[Laboratori](Id),
  FOREIGN KEY (IdGruppo) REFERENCES [dbo].[Gruppi](Id)
  ON DELETE CASCADE
);

GO
