module organizations {
  type Organization {
    # Properties
    required name: str;
    
    # Relations
    multi projects: projects::Project { constraint exclusive; }
    required multi users: users::User {
      isOwner: bool { default := false; }
      isAdmin: bool { default := false; }
    }
  }
}