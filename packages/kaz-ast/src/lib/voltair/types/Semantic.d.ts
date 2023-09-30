export type SemanticTokenType = 'namespace' | 'class' | 'enum' | 'interface' | 'struct' | 'typeParameter' | 'type' | 'parameter' | 'variable' | 'property' | 'enumMember' | 'decorator' | 'event' | 'function' | 'method' | 'macro' | 'label' | 'comment' | 'string' | 'keyword' | 'number' | 'regexp' | 'operator'
export type SemanticTokenModifier = 'declaration' | 'definition' | 'readonly' | 'static' | 'deprecated' | 'abstract' | 'async' | 'modification' | 'documentation' | 'defaultLibrary'
export type Semantic =
  | { type: SemanticTokenType; modifiers?: SemanticTokenModifier[] }
  | { type: string; modifiers?: string[]; textmateScope: string[] }
