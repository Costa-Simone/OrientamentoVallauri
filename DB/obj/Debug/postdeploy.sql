-- Inserting sample data into the Laboratori table
INSERT INTO [dbo].[Laboratori] ([Nome])
VALUES ('CHIMICA'), ('FISICA'), ('TDP'), ('ELETTRO'), ('PLC'), ('EULERO'), ('PASCAL'), ('ENERGIA'), ('PROTO'), ('ROBOTICA');

-- Inserting sample data into the Gruppi table
INSERT INTO [dbo].[Gruppi] ([Id], [Orario], [OrarioFine])
VALUES  ('C1', '14:00', '15:50'),
	('C2', '14:15', '16:05'),
	('C3', '14:30', '16:20'),
	('C4', '14:45', '16:35'),
	('C5', '15:00', '16:50'),
	('C6', '15:15', '17:05'),
	('C7', '15:30', '17:20'),
	('C8', '15:45', '17:35'),
	('C9', '16:00', '17:50'),
	('C10', '16:15', '18:05'),
	('C11', '16:30', '18:20')

-- Insering sample data into Admin table
INSERT INTO [dbo].[Admin] ([Username], [Password])
VALUES ('abbate', 'password')

-- Inserting sample data into Studenti table
INSERT INTO [dbo].[Studenti] ([Nominativo], [ScuolaProvenienza], [isPresente], [SlotITI]) VALUES
('TIZIO80', 'IC FOSSANO A - PAGLIERI', 0, 'C8'),
('TIZIO81', 'IC FOSSANO B - SACCO BOETTO', 0, 'C8'),
('TIZIO82', 'ALTRO', 0, 'C8'),
('TIZIO83', 'IC ALBA - QUARTIERE MORETTA', 0, 'C8'),
('TIZIO84', 'IC LA MORRA', 0, 'C8'),
('TIZIO85', 'IC BRA 1 - PIUMATI CRAVERI', 0, 'C8'),
('TIZIO86', 'IC ALBA - QUARTIERE MORETTA', 0, 'C8'),
('TIZIO87', 'IC SALUZZO', 0, 'C8'),
('TIZIO88', 'IC SOMMARIVA PERNO', 0, 'C8'),
('TIZIO89', 'IC BENEVAGENNA', 0, 'C8')

-- Inserting sample data into the Orari table with OrarioEffettivoIngresso as NULL
INSERT INTO [dbo].[Orari] ([IdGruppo], [IdLaboratorio], [OrarioPrevistoIngresso])
VALUES ('C1', 1, '14:00'),
       ('C2', 2, '14:15'),
       ('C3', 3, '14:30'),
       ('C4', 4, '14:45'),
       ('C5', 5, '15:00'),
       ('C6', 6, '15:15'),
       ('C7', 7, '15:30'),
       ('C8', 8, '15:45'),
       ('C9', 9, '16:00'),
       ('C10', 10, '16:15')

-- INSERT INTO [dbo].[Partecipanti] ([IdGruppo], [IdStudente])
-- VALUES ('C1', 1),
-- 	   ('C1', 2),
-- 	   ('C1', 3),
-- 	   ('C2', 4),
-- 	   ('C2', 5),
-- 	   ('C3', 6),
-- 	   ('C3', 7),
-- 	   ('C3', 8),
-- 	   ('C4', 9),
-- 	   ('C4', 10)
GO
