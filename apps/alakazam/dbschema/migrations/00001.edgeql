CREATE MIGRATION m1xrvw7ei4qeqrwdbvtsdab4b7mb7xadnreyfj4b25wngj5zze5ewa
    ONTO initial
{
  CREATE TYPE default::User {
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE default::UserGitHubConnection {
      CREATE REQUIRED PROPERTY githubId: std::int32 {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY githubUsername: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::User {
      CREATE SINGLE LINK githubConnection: default::UserGitHubConnection {
          SET readonly := true;
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::UserGitHubConnection {
      CREATE SINGLE LINK user := (.<githubConnection[IS default::User]);
  };
};
