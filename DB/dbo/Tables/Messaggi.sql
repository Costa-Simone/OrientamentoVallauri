CREATE TABLE Messaggi (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Testo VARCHAR(255),
    IdMittente VARCHAR(3),
    IdDestinatario VARCHAR(3),
    Orario VARCHAR(8),
    Data VARCHAR(10),
    IdMessaggioRisposta INT,
    FOREIGN KEY (IdMittente) REFERENCES Gruppi(Id),
    FOREIGN KEY (IdDestinatario) REFERENCES Gruppi(Id),
);