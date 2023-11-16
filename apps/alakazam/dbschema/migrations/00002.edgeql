CREATE MIGRATION m1t4s2ey54eij2tqiule2cgysjta4qdtok6mv2g6lfjqhutubdls6q
    ONTO m1xrvw7ei4qeqrwdbvtsdab4b7mb7xadnreyfj4b25wngj5zze5ewa
{
  CREATE TYPE default::Organization {
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE default::OrganizationMember {
      CREATE REQUIRED SINGLE LINK organization: default::Organization;
      CREATE REQUIRED SINGLE LINK user: default::User;
      CREATE CONSTRAINT std::exclusive ON ((.organization, .user));
      CREATE REQUIRED PROPERTY isAdministrator: std::bool {
          SET default := false;
      };
  };
  ALTER TYPE default::Organization {
      CREATE MULTI LINK members := (.<organization[IS default::OrganizationMember]);
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK organizations := (.<user[IS default::OrganizationMember]);
  };
};
