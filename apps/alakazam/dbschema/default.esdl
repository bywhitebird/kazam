module default {
  type UserGitHubConnection {
    required githubUsername: str {
      constraint exclusive;
    }
    required githubId: int32 {
      constraint exclusive;
    }
    
    single link user := .<githubConnection[is User];
  }

  type User {
    required name: str;
    
    single githubConnection: UserGitHubConnection {
      readonly := true;
      constraint exclusive;
    }
    
    multi link organizations := .<user[is OrganizationMember];
  }

  type OrganizationMember {
    required isAdministrator: bool {
      default := false;
    }
    
    required single user: User;
    required single organization: Organization;

    constraint exclusive on ((.organization, .user));
  }

  type Organization {
    required name: str;
    
    multi projects: Project {
      constraint exclusive;
    }
    
    multi link members := .<organization[is OrganizationMember];
  }

  type Project {
    required name: str;
    
    # multi parsers: Parser;
    # multi transformers: Transformer;
    multi sources: ProjectSource {
      constraint exclusive;
    };
    
    single link organization := .<projects[is Organization];
  }

  # scalar type ParserName extending enum<kaz>;
  # type Parser {
  #   required parserName: ParserName;
  #   parserParameters: json;
  # }

  # scalar type TransformerName extending enum<react, vue>;
  # type Transformer {
  #   required transformerName: TransformerName;
  #   transformerParameters: json;
  # }

  type ProjectSource {
    single githubRepository: GitHubRepository {
      constraint exclusive;
    }

    single link project := .<sources[is Project];
  }

  type GitHubRepository {
    required url: str {
      constraint regexp(r'^https:\/\/github\.com.*$');
    };
    required rootDir: str {
      default := '/';
    };
    
    single link projectSource := .<githubRepository[is ProjectSource];
  }
}
