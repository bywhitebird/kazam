module users {
  global currentUser: uuid;

  type User {
    # Properties
    required name: str;
    
    # Relations
    multi identities: Identity;

    # Backlinks
    multi link organizations := .<users[is organizations::Organization];

    # Computeds
    multi projects := .organizations.projects;
  }

  abstract type Identity {
    # Backlinks
    required single link user := assert_single(assert_exists(.<identities[is users::User]));
  }

  type GitHubIdentity extending Identity {
    # Properties
    required githubId: int32 { constraint exclusive; }
    required githubUsername: str { constraint exclusive; }
  }
}