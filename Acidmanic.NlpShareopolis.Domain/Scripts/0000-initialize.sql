

-- {{Crud Acidmanic.NlpShareopolis.Domain.Entities.SentenceData}}

-- {{ Crud Acidmanic.NlpShareopolis.Domain.Entities.UserActivity}}

-- ---------------------------------------------------------------------------------------------------------------------
create function fnIsPristine(Id binary(16), UserEmail nvarchar(256)) returns bit DETERMINISTIC

    return not exists(select count(*) from UserActivities 
                                      where 
                                        UserActivities.ContributionId = Id
                                        AND UserActivities.UserEmail = UserEmail
                                        AND UserActivities.Status !=0 );
-- ---------------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE spReadFirstUnSeenSentence(IN UserEmail nvarchar(256),IN LanguageShortName nvarchar(4))
BEGIN
    
    select * from SentenceDatas where fnIsPristine(SentenceDatas.Id,UserEmail)
                                and SentenceDatas.LanguageShortName = LanguageShortName
                                limit 1; 
END;
-- ---------------------------------------------------------------------------------------------------------------------