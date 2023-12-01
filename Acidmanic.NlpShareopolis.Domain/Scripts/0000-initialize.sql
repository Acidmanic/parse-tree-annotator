

-- {{Crud Acidmanic.NlpShareopolis.Domain.Entities.SentenceData}}

-- {{ Crud Acidmanic.NlpShareopolis.Domain.Entities.UserActivity}}
-- ---------------------------------------------------------------------------------------------------------------------

# CREATE PROCEDURE spReadFirstUnSeenSentence(IN UserEmail nvarchar(256))
# BEGIN
#     
#     select * from SentenceDatas inner join UserActivities 
#         on SentenceDatas.Id = UserActivities.ContributionId
#         where UserActivities.UserEmail = 
#     
# 
#     IF EXISTS(SELECT 1 FROM SentenceDatas WHERE SentenceDatas.Id = Id) then
# 
#         UPDATE SentenceDatas SET Text=Text,LanguageShortName=LanguageShortName WHERE SentenceDatas.Id = Id;
# 
#         SELECT * FROM SentenceDatas WHERE SentenceDatas.Id = Id ORDER BY Id ASC LIMIT 1;
# 
#     ELSE
#         INSERT INTO SentenceDatas (Text,LanguageShortName,Id) VALUES (Text,LanguageShortName,Id);
#         SET @nid = Id;
#         SELECT * FROM SentenceDatas WHERE SentenceDatas.Id = @nid;
#     END IF;
# END;
# -- ---------------------------------------------------------------------------------------------------------------------