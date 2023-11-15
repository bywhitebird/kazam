CREATE MIGRATION m13upjhjcylvj2xg6tkbukfqbqzmwst2awsnnbreevejh5wkzhv3ja
    ONTO m16aaj63lzt6n4sfmqerswsti74xr6jftgiimfafmen55o35sn5b4q
{
  CREATE TYPE default::GitHubRepository {
      CREATE REQUIRED PROPERTY url: std::str {
          CREATE CONSTRAINT std::regexp(r'^https:\/\/github\.com.*$');
      };
  };
  CREATE TYPE default::ProjectSource {
      CREATE SINGLE LINK githubRepository: default::GitHubRepository {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::GitHubRepository {
      CREATE SINGLE LINK projectSource := (.<githubRepository[IS default::ProjectSource]);
  };
  ALTER TYPE default::Project {
      CREATE MULTI LINK sources: default::ProjectSource {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::ProjectSource {
      CREATE SINGLE LINK project := (.<sources[IS default::Project]);
  };
};
