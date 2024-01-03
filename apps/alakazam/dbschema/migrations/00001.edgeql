CREATE MIGRATION m1x4wfcgz4mrazao5yij7mrcug7657vvmvyftg2bisqts2chc7xvlq
    ONTO initial
{
  CREATE MODULE organizations IF NOT EXISTS;
  CREATE MODULE projects IF NOT EXISTS;
  CREATE MODULE transformations IF NOT EXISTS;
  CREATE MODULE users IF NOT EXISTS;
  CREATE TYPE organizations::Organization {
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE SCALAR TYPE transformations::ParserName EXTENDING enum<kaz>;
  CREATE TYPE transformations::Parser {
      CREATE REQUIRED PROPERTY parserName: transformations::ParserName;
      CREATE OPTIONAL PROPERTY parserParameters: std::json;
  };
  CREATE SCALAR TYPE transformations::TransformerName EXTENDING enum<react, vue>;
  CREATE TYPE transformations::Transformer {
      CREATE REQUIRED PROPERTY transformerName: transformations::TransformerName;
      CREATE OPTIONAL PROPERTY transformerParameters: std::json;
  };
  CREATE TYPE projects::Project {
      CREATE MULTI LINK parsers: transformations::Parser;
      CREATE MULTI LINK transformers: transformations::Transformer;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  ALTER TYPE organizations::Organization {
      CREATE REQUIRED MULTI LINK projects: projects::Project {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE projects::Project {
      CREATE REQUIRED SINGLE LINK organization := (std::assert_exists(.<projects[IS organizations::Organization]));
  };
  CREATE TYPE users::User {
      CREATE REQUIRED PROPERTY name: std::str;
  };
  ALTER TYPE organizations::Organization {
      CREATE REQUIRED MULTI LINK users: users::User {
          CREATE CONSTRAINT std::exclusive;
          CREATE PROPERTY isAdmin: std::bool {
              SET default := false;
          };
          CREATE PROPERTY isOwner: std::bool {
              SET default := false;
          };
      };
  };
  ALTER TYPE users::User {
      CREATE MULTI LINK organizations := (.<users[IS organizations::Organization]);
      CREATE MULTI LINK projects := (.organizations.projects);
  };
  CREATE ABSTRACT TYPE projects::ProjectSource;
  CREATE TYPE projects::GitHubRepository EXTENDING projects::ProjectSource {
      CREATE REQUIRED PROPERTY url: std::str;
      CREATE CONSTRAINT std::regexp(r'^https:\/\/github\.com.*$') ON (.url);
      CREATE REQUIRED PROPERTY rootDir: std::str {
          SET default := '/';
      };
  };
  ALTER TYPE projects::Project {
      CREATE MULTI LINK sources: projects::ProjectSource {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE projects::ProjectSource {
      CREATE REQUIRED SINGLE LINK project := (std::assert_exists(std::assert_single(.<sources[IS projects::Project])));
  };
  CREATE TYPE transformations::TransformationFolder {
      CREATE REQUIRED SINGLE LINK project: projects::Project;
      CREATE REQUIRED SINGLE LINK transformer: transformations::Transformer;
      CREATE CONSTRAINT std::exclusive ON ((.project, .transformer));
      CREATE REQUIRED PROPERTY date: std::datetime;
  };
  ALTER TYPE projects::Project {
      CREATE MULTI LINK transformationFolder := (.<project[IS transformations::TransformationFolder]);
  };
  CREATE TYPE transformations::Transformation {
      CREATE REQUIRED SINGLE LINK folder: transformations::TransformationFolder;
      CREATE REQUIRED PROPERTY path: std::str;
      CREATE CONSTRAINT std::exclusive ON ((.folder, .path));
      CREATE REQUIRED PROPERTY content: std::str;
  };
  ALTER TYPE transformations::TransformationFolder {
      CREATE MULTI LINK transformations := (.<folder[IS transformations::Transformation]);
  };
  CREATE ABSTRACT TYPE users::Identity;
  CREATE TYPE users::GitHubIdentity EXTENDING users::Identity {
      CREATE REQUIRED PROPERTY githubId: std::int32 {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY githubUsername: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE users::User {
      CREATE MULTI LINK identities: users::Identity;
  };
  ALTER TYPE users::Identity {
      CREATE REQUIRED SINGLE LINK user := (std::assert_single(std::assert_exists(.<identities[IS users::User])));
  };
};
