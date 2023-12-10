

-- {{Crud Acidmanic.NlpShareopolis.Domain.Entities.SentenceTask}}

-- ---------------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE spReadFirstUnSeenSentence(IN UserEmail nvarchar(256),IN LanguageShortName nvarchar(4))
BEGIN
    
    select * from SentenceTasks where fnIsPristine(SentenceTasks.Id,UserEmail)
                                and SentenceTasks.LanguageShortName = LanguageShortName
                                limit 1; 
END;
-- ---------------------------------------------------------------------------------------------------------------------