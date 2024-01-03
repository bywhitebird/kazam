CREATE MIGRATION m1vvb2mc53ktpxioq6kad57atda5il2yoskyu3jhutvbrqgcohzccq
    ONTO m16cwt2x3aeyjwnuxkxduf6vi6jluxhtqn3zsopdjz3dlzymblnxxa
{
  ALTER TYPE projects::GitHubRepository {
      DROP ANNOTATION std::title;
      CREATE REQUIRED PROPERTY _type: std::str {
          SET default := 'GitHubRepository';
          CREATE CONSTRAINT std::regexp('^GitHubRepository$');
      };
  };
};
