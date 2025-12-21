CREATE TABLE [dbo].[AppUser] (
    [Id]           UNIQUEIDENTIFIER DEFAULT (newid()) NOT NULL,
    [Name]         NVARCHAR (100)   NULL,
    [Email]        NVARCHAR (255)   NULL,
    [Password]     NVARCHAR (255)   NULL,
    [DOB]          DATE             NULL,
    [Gender]       NVARCHAR (10)    NULL,
    [UserName]     NVARCHAR (50)    DEFAULT ('') NULL,
    [Phone]        NVARCHAR (20)    NULL,
    [Address]      NVARCHAR (500)   NULL,
    [CreatedDate]  DATETIME2 (7)    DEFAULT (getdate()) NULL,
    [ModifiedDate] DATETIME2 (7)    DEFAULT (getdate()) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

