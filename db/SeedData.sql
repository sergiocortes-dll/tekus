USE TekusDB;
GO

DELETE FROM ServiceCountry;
DELETE FROM Service;
DELETE FROM Country;
DELETE FROM Provider;
GO

DBCC CHECKIDENT ('Service', RESEED, 0);
DBCC CHECKIDENT ('Country', RESEED, 0);
DBCC CHECKIDENT ('Provider', RESEED, 0);
GO

INSERT INTO Provider (NIT, Name, Email, CustomFields) VALUES
('123456789', 'Importaciones Tekus S.A.', 'info@tekus.co', '{"ContactoMarte": "123-456", "MascotasNomina": 5}'),
('987654321', 'Proveedor B', 'contacto@providerb.com', '{"CampoExtra": "Valor1"}'),
('111222333', 'Proveedor C', 'email@providerc.com', NULL),
('444555666', 'Proveedor D', 'd@ejemplo.com', '{"Otro": "Dato"}'),
('777888999', 'Proveedor E', 'e@tekus.co', '{"MarteNum": "789"}'),
('000111222', 'Proveedor F', 'f@email.com', NULL),
('333444555', 'Proveedor G', 'g@proveedor.com', '{"Mascotas": 10}'),
('666777888', 'Proveedor H', 'h@tekus.co', NULL),
('999000111', 'Proveedor I', 'i@email.com', '{"Extra": "Info"}'),
('222333444', 'Proveedor J', 'j@ejemplo.com', NULL);
GO

INSERT INTO Country (Name) VALUES
('Colombia'), ('Perú'), ('México'), ('Argentina'), ('Chile'),
('Brasil'), ('Ecuador'), ('Venezuela'), ('Bolivia'), ('Uruguay');
GO

INSERT INTO Service (Name, HourlyRateUSD, ProviderId) VALUES
('Descarga espacial de contenidos', 50.00, 1),
('Desaparición forzada de bytes', 75.00, 1),
('Servicio C', 100.00, 2),
('Servicio D', 60.00, 3),
('Servicio E', 80.00, 4),
('Servicio F', 90.00, 5),
('Servicio G', 55.00, 6),
('Servicio H', 70.00, 7),
('Servicio I', 85.00, 8),
('Servicio J', 95.00, 9);
GO

INSERT INTO ServiceCountry (ServiceId, CountryId) VALUES
(1, 1), (1, 2), (1, 3),
(2, 1), (2, 4),
(3, 5), (3, 6),
(4, 7), (4, 8),
(5, 9), (5, 10);
GO