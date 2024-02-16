CREATE TABLE [dbo].[Studenti]
(
  [Id] INT NOT NULL PRIMARY KEY IDENTITY,
  [Nominativo] VARCHAR(50) NOT NULL,
  [ScuolaProvenienza] VARCHAR(60) NOT NULL,
  [isPresente] BIT NOT NULL,
  [SlotITI] VARCHAR(2) NULL,
  [SlotLICEO] VARCHAR(2) NULL,
  [SlotAFM] VARCHAR(2) NULL
);

GO
