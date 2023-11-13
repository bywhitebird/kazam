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
  }
}
