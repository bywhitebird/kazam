module transformations {
  scalar type ParserName extending enum<kaz>;
  type Parser {
    # Properties
    required parserName: ParserName;
    optional parserParameters: json;
  }

  scalar type TransformerName extending enum<react, vue, alakazam>;
  type Transformer {
    # Properties
    required transformerName: TransformerName;
    optional transformerParameters: json;
  }

  type Transformation {
    # Properties
    required path: str;
    required content: str;

    # Relations
    required single folder: TransformationFolder;

    # Constraints
    constraint exclusive on ((.folder, .path));
  }

  type TransformationFolder {
    # Properties
    required date: datetime;

    # Relations
    required single transformer: Transformer;
    required single project: projects::Project;
    
    # Backlinks
    multi link transformations := .<folder[is Transformation];

    # Constraints
    constraint exclusive on ((.project, .transformer)); # Keep one folder per project/transformer
  }
}
