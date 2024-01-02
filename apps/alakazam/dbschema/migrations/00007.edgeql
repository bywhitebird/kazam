CREATE MIGRATION m13ihmvxx6c3hup65iv5y5q6pli3y6t5gjzm4bgemvgultjexr2tnq
    ONTO m13sgpaddg6ajliirqdy2lnma5csyktt2d2bgv7ydvmcxu2tlsghwa
{
  ALTER TYPE projects::GitHubRepository {
      DROP PROPERTY installationId;
  };
};
