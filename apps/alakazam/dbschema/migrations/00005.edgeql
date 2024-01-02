CREATE MIGRATION m1iuvwwqmcni6ghyokeqli7ybesq7aih6j57upscxcqxsbnhkcozzq
    ONTO m1vvb2mc53ktpxioq6kad57atda5il2yoskyu3jhutvbrqgcohzccq
{
  ALTER TYPE organizations::Organization {
      ALTER LINK users {
          DROP CONSTRAINT std::exclusive;
      };
  };
};
