CREATE MIGRATION m1qszpl7nzfg7jxok5to4rdevznswvq7zyk3cpjw5ayz6ihyoz7bva
    ONTO m1k4tktpmvqymbey3y2ijm44i4s7hzjhkn66vott33qgc4rjcrgs4q
{
  CREATE TYPE default::File {
      CREATE REQUIRED PROPERTY content: std::str;
      CREATE REQUIRED PROPERTY path: std::str;
  };
  ALTER TYPE default::Project {
      CREATE MULTI LINK generatedComponents: default::File {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
