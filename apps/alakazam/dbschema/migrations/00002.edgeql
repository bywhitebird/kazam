CREATE MIGRATION m1phwgee7mrqcajsra7xi3qcw63w2lndfnh6vo77xzwofdtig52nma
    ONTO m1x4wfcgz4mrazao5yij7mrcug7657vvmvyftg2bisqts2chc7xvlq
{
  ALTER TYPE organizations::Organization {
      ALTER LINK projects {
          RESET OPTIONALITY;
      };
  };
};
