CREATE MIGRATION m1vtia3ndouaa5lznte3irn4gztu34wxl2ceqqmyie4wksjsfvgk3a
    ONTO m13upjhjcylvj2xg6tkbukfqbqzmwst2awsnnbreevejh5wkzhv3ja
{
  ALTER TYPE default::GitHubRepository {
      CREATE REQUIRED PROPERTY rootDir: std::str {
          SET default := '/';
      };
  };
};
