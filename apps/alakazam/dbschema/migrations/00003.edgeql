CREATE MIGRATION m16aaj63lzt6n4sfmqerswsti74xr6jftgiimfafmen55o35sn5b4q
    ONTO m1t4s2ey54eij2tqiule2cgysjta4qdtok6mv2g6lfjqhutubdls6q
{
  CREATE TYPE default::Project {
      CREATE REQUIRED PROPERTY name: std::str;
  };
  ALTER TYPE default::Organization {
      CREATE MULTI LINK projects: default::Project {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::Project {
      CREATE SINGLE LINK organization := (.<projects[IS default::Organization]);
  };
};
