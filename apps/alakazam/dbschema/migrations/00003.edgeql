CREATE MIGRATION m16cwt2x3aeyjwnuxkxduf6vi6jluxhtqn3zsopdjz3dlzymblnxxa
    ONTO m1phwgee7mrqcajsra7xi3qcw63w2lndfnh6vo77xzwofdtig52nma
{
  CREATE GLOBAL users::currentUser -> std::uuid;
  ALTER TYPE projects::GitHubRepository {
      CREATE ANNOTATION std::title := 'GitHub';
  };
};
