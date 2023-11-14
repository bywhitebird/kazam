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
    
    single link organization := .<projects[is Organization];
  }
}
