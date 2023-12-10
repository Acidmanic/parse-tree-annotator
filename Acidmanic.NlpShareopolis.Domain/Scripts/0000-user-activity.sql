
-- {{ Crud Acidmanic.NlpShareopolis.Domain.Entities.UserActivity}}

-- ---------------------------------------------------------------------------------------------------------------------
create function fnIsPristine(Id varchar(48), UserEmail nvarchar(256)) returns bit DETERMINISTIC

    return (select count(*) from UserActivities
        where
        UserActivities.ContributionId = Id
        AND UserActivities.UserEmail = UserEmail
        AND (UserActivities.Status = 200 OR UserActivities.Status = 300) ) <= 0;
-- ---------------------------------------------------------------------------------------------------------------------
DROP PROCEDURE spSaveUserActivity; 
CREATE PROCEDURE spSaveUserActivity(IN Id varchar(48),IN UserEmail varchar(256),IN ContributionId varchar(48),IN Status INT(10))
BEGIN
    IF EXISTS(SELECT 1 FROM UserActivities WHERE UserActivities.UserEmail = UserEmail AND  UserActivities.ContributionId = ContributionId) then

        UPDATE UserActivities SET Status=Status
            WHERE UserActivities.UserEmail = UserEmail AND  UserActivities.ContributionId = ContributionId;

        SELECT * FROM UserActivities 
                 WHERE UserActivities.UserEmail = UserEmail AND  UserActivities.ContributionId = ContributionId 
                 ORDER BY Id ASC LIMIT 1;

    ELSE
        INSERT INTO UserActivities (Id,UserEmail,ContributionId,Status) VALUES (Id,UserEmail,ContributionId,Status);
        SELECT * FROM UserActivities
        WHERE UserActivities.UserEmail = UserEmail AND  UserActivities.ContributionId = ContributionId
        ORDER BY Id ASC LIMIT 1;
    END IF;
END;
-- ---------------------------------------------------------------------------------------------------------------------