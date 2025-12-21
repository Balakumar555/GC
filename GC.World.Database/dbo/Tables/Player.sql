CREATE TABLE [dbo].[Player] (
    [Id]        INT           IDENTITY (1, 1) NOT NULL,
    [Name]      VARCHAR (100) NULL,
    [JsyNumber] INT           NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

