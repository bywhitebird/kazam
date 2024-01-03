module projects {
  type Project {
    # Properties
    required name: str;
    
    # Relations
    multi parsers: transformations::Parser;
    multi transformers: transformations::Transformer;
    multi sources: ProjectSource { constraint exclusive; }
    
    # Backlinks
    required single link organization := assert_exists(.<projects[is organizations::Organization]);
    multi link transformationFolder := .<project[is transformations::TransformationFolder];
  }

  abstract type ProjectSource {
    # Backlinks
    required single link project := assert_exists(assert_single(.<sources[is Project]));
  }

  type GitHubRepository extending ProjectSource {
    required _type: str {
      default := 'GitHubRepository';
      constraint regexp(r'^GitHubRepository$');
    }

    # Properties
    required url: str;
    required rootDir: str { default := '/'; };

    # Constraints
    constraint regexp(r'^https:\/\/github\.com.*$') on (.url);
  }
}