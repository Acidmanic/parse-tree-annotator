

-- {{Crud Acidmanic.NlpShareopolis.Domain.Entities.SentenceData}}

-- {{ Crud Acidmanic.NlpShareopolis.Domain.Entities.UserActivity}}

-- ---------------------------------------------------------------------------------------------------------------------
create function fnIsPristine(Id varchar(48), UserEmail nvarchar(256)) returns bit DETERMINISTIC

    return (select count(*) from UserActivities
        where
        UserActivities.ContributionId = Id
        AND UserActivities.UserEmail = UserEmail
        AND UserActivities.Status !=0 ) <= 0;
-- ---------------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE spReadFirstUnSeenSentence(IN UserEmail nvarchar(256),IN LanguageShortName nvarchar(4))
BEGIN
    
    select * from SentenceDatas where fnIsPristine(SentenceDatas.Id,UserEmail)
                                and SentenceDatas.LanguageShortName = LanguageShortName
                                limit 1; 
END;
-- ---------------------------------------------------------------------------------------------------------------------
DROP PROCEDURE spSaveUserActivity; 
CREATE PROCEDURE spSaveUserActivity(IN Id varchar(48),IN UserEmail varchar(256),IN ContributionId varchar(48),IN Status INT(10))
BEGIN
    IF EXISTS(SELECT 1 FROM UserActivities WHERE UserActivities.UserEmail = UserEmail AND  UserActivities.ContributionId = ContributionId) then

        UPDATE UserActivities SET UserEmail=UserEmail,ContributionId=ContributionId,Status=Status
            WHERE UserActivities.UserEmail = UserEmail AND  UserActivities.ContributionId = ContributionId;

        SELECT * FROM UserActivities 
                 WHERE UserActivities.UserEmail = UserEmail AND  UserActivities.ContributionId = ContributionId 
                 ORDER BY Id ASC LIMIT 1;

    ELSE
        INSERT INTO UserActivities (Id,UserEmail,ContributionId,Status) VALUES (Id,UserEmail,ContributionId,Status);
        SET @nid = Id;
        SELECT * FROM UserActivities WHERE UserActivities.Id = @nid;
    END IF;
END;
-- ---------------------------------------------------------------------------------------------------------------------

# 
# select * from SentenceDatas;
# 
# select * from UserActivities;
# 
# select fnIsPristine('6c8fe5b4-a682-4b73-94e3-b3089f12b9d2','anonemouse@nlpsharopolis.com');
# select fnIsPristine('f9e22172-9f29-4be2-9953-5bff1534ec71','anonemouse@nlpsharopolis.com');
# 
# 
# call spReadFirstUnSeenSentence('anonemouse@nlpsharopolis.com','en');

