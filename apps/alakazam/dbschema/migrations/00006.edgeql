CREATE MIGRATION m1k4tktpmvqymbey3y2ijm44i4s7hzjhkn66vott33qgc4rjcrgs4q
    ONTO m1vtia3ndouaa5lznte3irn4gztu34wxl2ceqqmyie4wksjsfvgk3a
{
  CREATE SCALAR TYPE default::ParserName EXTENDING enum<kaz>;
  CREATE TYPE default::Parser {
      CREATE REQUIRED PROPERTY parserName: default::ParserName;
      CREATE PROPERTY parserParameters: std::json;
  };
  ALTER TYPE default::Project {
      CREATE MULTI LINK parsers: default::Parser;
  };
  CREATE SCALAR TYPE default::TransformerName EXTENDING enum<react, vue>;
  CREATE TYPE default::Transformer {
      CREATE REQUIRED PROPERTY transformerName: default::TransformerName;
      CREATE PROPERTY transformerParameters: std::json;
  };
  ALTER TYPE default::Project {
      CREATE MULTI LINK transformers: default::Transformer;
  };
};
