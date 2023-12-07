

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
DROP PROCEDURE spSaveUserActivity; 
CREATE PROCEDURE spSaveUserActivity(IN Id BINARY(16),IN UserEmail varchar(256),IN ContributionId BINARY(16),IN Status INT(10))
BEGIN
    IF EXISTS(SELECT 1 FROM UserActivities WHERE UserActivities.UserEmail = UserEmail AND  UserActivities.ContributionId = ContributionId) then

        UPDATE UserActivities SET Id=Id, UserEmail=UserEmail,ContributionId=ContributionId,Status=Status
            WHERE UserActivities.UserEmail = UserEmail AND  UserActivities.ContributionId = ContributionId;

        SELECT * FROM UserActivities WHERE UserActivities.Id = Id ORDER BY Id ASC LIMIT 1;

    ELSE
        INSERT INTO UserActivities (Id,UserEmail,ContributionId,Status) VALUES (Id,UserEmail,ContributionId,Status);
        SET @nid = Id;
        SELECT * FROM UserActivities WHERE UserActivities.Id = @nid;
    END IF;
END;
-- ---------------------------------------------------------------------------------------------------------------------
