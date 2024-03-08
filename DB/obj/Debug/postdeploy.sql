﻿-- --Inserting sample data into the Laboratori table
-- INSERT INTO [dbo].[Laboratori]
--     ([Nome])
-- VALUES
--     ('CHIMICA'),
--     ('FISICA'),
--     ('TDP'),
--     ('ELETTRO'),
--     ('PLC'),
--     ('EULERO'),
--     ('PASCAL'),
--     ('ENERGIA'),
--     ('PROTO'),
--     ('ROBOTICA');

-- --Inserting sample data into the Gruppi table
-- INSERT INTO [dbo].[Gruppi]
--     ([Id], [Orario], [OrarioFine])
-- VALUES
--     ('C01', '14:00', '15:50'),
--     ('C02', '14:15', '16:05'),
--     ('C03', '14:30', '16:20'),
--     ('C04', '14:45', '16:35'),
--     ('C05', '15:00', '16:50'),
--     ('C06', '15:15', '17:05'),
--     ('C07', '15:30', '17:20'),
--     ('C08', '15:45', '17:35'),
--     ('C09', '16:00', '17:50'),
--     ('C10', '16:15', '18:05'),
--     ('C11', '16:30', '18:20')

-- --Inserting sample data into Admin table
-- INSERT INTO [dbo].[Admin]
--     ([Id], [Password])
-- VALUES
--     ('abbate', 'password')

-- --Inserting sample data into Studenti table
-- INSERT INTO [dbo].[Studenti]
--     ([Nominativo], [ScuolaProvenienza], [isPresente], [SlotITI])
-- VALUES
--     ('TIZIO80', 'IC FOSSANO A - PAGLIERI', 0, 'C08'),
--     ('TIZIO81', 'IC FOSSANO B - SACCO BOETTO', 0, 'C08'),
--     ('TIZIO82', 'ALTRO', 0, 'C08'),
--     ('TIZIO83', 'IC ALBA - QUARTIERE MORETTA', 0, 'C08'),
--     ('TIZIO84', 'IC LA MORRA', 0, 'C08'),
--     ('TIZIO85', 'IC BRA 1 - PIUMATI CRAVERI', 0, 'C08'),
--     ('TIZIO86', 'IC ALBA - QUARTIERE MORETTA', 0, 'C08'),
--     ('TIZIO87', 'IC SALUZZO', 0, 'C08'),
--     ('TIZIO88', 'IC SOMMARIVA PERNO', 0, 'C08'),
--     ('TIZIO89', 'IC BENEVAGENNA', 0, 'C08')

--Inserting sample data into the Orari table with OrarioEffettivoIngresso as NULL
-- INSERT INTO [dbo].[Orari]
--     ([IdGruppo], [IdLaboratorio], [OrarioPrevistoIngresso])
-- VALUES
--     ('C01', 1, '14:00'),
--     ('C02', 2, '14:15'),
--     ('C03', 3, '14:30'),
--     ('C04', 4, '14:45'),
--     ('C05', 5, '15:00'),
--     ('C06', 6, '15:15'),
--     ('C07', 7, '15:30'),
--     ('C08', 8, '15:45'),
--     ('C09', 9, '16:00'),
--     ('C10', 10, '16:15')

-- INSERT INTO [dbo].[Partecipanti]
--     ([IdGruppo], [IdStudente])
-- VALUES
--     ('C01', 1),
--     ('C01', 2),
--     ('C01', 3),
--     ('C02', 4),
--     ('C02', 5),
--     ('C03', 6),
--     ('C03', 7),
--     ('C03', 8),
--     ('C04', 9),
--     ('C04', 10)

INSERT INTO Utenti (Id)
VALUES ('000')

INSERT INTO Utenti (Id)
VALUES ('C01')

INSERT INTO Utenti (Id)
VALUES ('C02')

INSERT INTO Messaggi
    (Testo, IdMittente, IdDestinatario, Orario, Data)
VALUES
    ('Ciao, come stai? ADMIN-C01', '000', 'C01', '09:30:02', '2024-03-08');

INSERT INTO Messaggi
    (Testo, IdMittente, IdDestinatario, Orario, Data)
VALUES
    ('Sto bene, grazie! C01-ADMIN', 'C01', '000', '09:35:07', '2024-03-08');

INSERT INTO Messaggi
    (Testo, IdMittente, IdDestinatario, Orario, Data, IdMessaggioRisposta)
VALUES
    ('Menomale! ADMIN-C01', '000', 'C01', '09:55:09', '2024-03-08', 1);

--DROP ALL TABLES
-- DROP TABLE [dbo].[Messaggi]
-- DROP TABLE [dbo].[Admin]
-- DROP TABLE [dbo].[Partecipanti]
-- DROP TABLE [dbo].[Orari]
-- DROP TABLE [dbo].[Studenti]
-- DROP TABLE [dbo].[Gruppi]
-- DROP TABLE [dbo].[Laboratori]
-- DROP TABLE [dbo].[Utenti]
GO
