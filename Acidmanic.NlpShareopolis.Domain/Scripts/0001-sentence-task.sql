

-- {{Crud Acidmanic.NlpShareopolis.Domain.Entities.SentenceTask}}

-- ---------------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE spReadFirstUnSeenSentence(IN UserEmail nvarchar(256),IN Language nvarchar(4))
BEGIN
    
    select * from SentenceTasks where fnIsPristine(SentenceTasks.Id,UserEmail)
                                and SentenceTasks.Language = Language
                                limit 1; 
END;
-- ---------------------------------------------------------------------------------------------------------------------