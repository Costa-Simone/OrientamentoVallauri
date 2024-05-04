CREATE TABLE [dbo].[Partecipanti] (
    [IdGruppo] VARCHAR(3) NOT NULL,
    [IdStudente]  INT NOT NULL,
    PRIMARY KEY CLUSTERED ([IdGruppo] ASC, [IdStudente] ASC),
    FOREIGN KEY ([IdGruppo]) REFERENCES [dbo].[Gruppi] ([Id]),
    FOREIGN KEY ([IdStudente]) REFERENCES [dbo].[Studenti] ([Id])
);

GO
