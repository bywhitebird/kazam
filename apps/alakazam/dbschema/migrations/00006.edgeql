CREATE MIGRATION m13sgpaddg6ajliirqdy2lnma5csyktt2d2bgv7ydvmcxu2tlsghwa
    ONTO m1iuvwwqmcni6ghyokeqli7ybesq7aih6j57upscxcqxsbnhkcozzq
{
  ALTER TYPE projects::GitHubRepository {
      CREATE REQUIRED PROPERTY installationId: std::str {
          SET REQUIRED USING (<std::str>'1');
      };
  };
};
