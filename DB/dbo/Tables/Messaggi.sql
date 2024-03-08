CREATE TABLE Messaggi (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Testo VARCHAR(255),
    IdMittente VARCHAR(3),
    IdDestinatario VARCHAR(3),
    Orario VARCHAR(8),
    Data VARCHAR(10),
    IdMessaggioRisposta INT,
    FOREIGN KEY (IdMittente) REFERENCES Utenti(Id),
    FOREIGN KEY (IdDestinatario) REFERENCES Utenti(Id),
);