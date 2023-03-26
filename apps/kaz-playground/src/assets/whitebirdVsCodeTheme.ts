export default {
  // extends from Acrylic Dark Theme (https://marketplace.visualstudio.com/items?itemName=Acrylic.acrylic-dark-theme)
  name: 'Whitebird',
  colors: {
    'activityBar.activeBackground': '#131516',
    'activityBar.background': '#131516',
    'activityBarBadge.background': '#21303a',
    'activityBarBadge.foreground': '#CBD1DA',
    // "activityBar.activeBorder": "#CBD1DA",
    'activityBar.border': '#171a1c',

    'sideBar.background': '#131516',
    'sideBarSectionHeader.background': '#131516',
    'sideBarTitle.foreground': '#707a8f',
    'sideBar.border': '#131516',

    'list.inactiveSelectionBackground': '#23282b',
    'list.hoverBackground': '#23282b',
    'list.errorForeground': '#E15362',
    'list.warningForeground': '#e69e4c',
    'list.activeSelectionBackground': '#21303a',

    'input.background': '#212628',

    'tab.inactiveBackground': '#131516',
    'tab.activeBackground': '#1a1e20',
    'tab.activeBorder': '#51596b',

    'titleBar.activeBackground': '#131516',
    'titleBar.inactiveBackground': '#131516',

    'statusBar.background': '#131516',
    'statusBar.foreground': '#CBD1DA',
    'statusBar.noFolderBackground': '#131516',
    'statusBar.debuggingBackground': '#131516',

    'editor.foreground': '#FFFFFF',
    'editor.background': '#000000',
    'editor.lineHighlightBackground': '#333333',
    'editor.findMatchHighlightBackground': '#273c49',
    'editor.findMatchBackground': '#2d6970',
    'editor.wordHighlightBackground': '#273c49',
    'editor.selectionBackground': '#21303a',
    'editorWidget.background': '#171a1c',
    'editorWidget.border': '#171a1c',

    'peekView.border': '#171a1c',
    'peekViewTitle.background': '#21303a',
    'peekViewEditor.background': '#18242c',
    'peekViewResult.background': '#18242c',
    'peekViewEditor.matchHighlightBackground': '#273c49',
    'peekViewResult.matchHighlightBackground': '#2d6970',

    'debugExceptionWidget.background': '#21303a',
    'debugExceptionWidget.border': '#21303a',

    'editorMarkerNavigation.background': '#18242c',
    'editorMarkerNavigationError.headerBackground': '#21303a',
    'editorMarkerNavigationError.background': '#21303a',
    'editorMarkerNavigationInfo.headerBackground': '#21303a',
    'editorMarkerNavigationInfo.background': '#21303a',
    'editorMarkerNavigationWarning.headerBackground': '#21303a',
    'editorMarkerNavigationWarning.background': '#21303a',

    'debugToolBar.background': '#171a1c',
    'debugToolBar.border': '#171a1c',

    'panel.background': '#131516',
    'panel.border': '#131516',

    'dropdown.background': '#1a1e20',

    'scrollbarSlider.activeBackground': '#4d4d4d',
    'scrollbarSlider.background': '#4d4d4d',

    'editorGroupHeader.tabsBackground': '#131516',
    'editorGroupHeader.noTabsBackground': '#131516',

    // "editorHoverWidget.border": "#2a3238",
    'editorHoverWidget.background': '#24292d',

    // "editorBracketMatch.background": "#ff0000"
    'editorBracketMatch.border': '#566077',

    'focusBorder': '#21303a',
  },
  tokenColors: [
    {
      name: 'Comment',
      scope: [
        'comment',
        'punctuation.definition.comment',
      ],
      settings: {
        foreground: '#707a8f',
      },
    },
    {
      name: 'Variables',
      scope: [
        'variable',
        'string constant.other.placeholder',
      ],
      settings: {
        foreground: '#CBD1DA',
      },
    },
    {
      name: 'Colors',
      scope: [
        'constant.other.color',
      ],
      settings: {
        foreground: '#CBD1DA',
      },
    },
    {
      name: 'Invalid',
      scope: [
        'invalid',
        'invalid.illegal',
      ],
      settings: {
        foreground: '#E15362',
      },
    },
    {
      name: 'Keyword, Storage',
      scope: [
        'keyword',
        'storage.type',
        'storage.modifier',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'Operator, Misc',
      scope: [
        'keyword.control',
        'constant.other.color',
        'punctuation',
        'meta.tag',
        'punctuation.definition.tag',
        'punctuation.separator.inheritance.php',
        'punctuation.definition.tag.html',
        'punctuation.definition.tag.begin.html',
        'punctuation.definition.tag.end.html',
        'punctuation.section.embedded',
        'keyword.other.template',
        'keyword.other.substitution',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'Tag',
      scope: [
        'entity.name.tag',
        'meta.tag.sgml',
        'markup.deleted.git_gutter',
      ],
      settings: {
        foreground: '#E15362',
      },
    },
    {
      name: 'Function, Special Method',
      scope: [
        'entity.name.function',
        'meta.function-call',
        'variable.function',
        'support.function',
        'keyword.other.special-method',
      ],
      settings: {
        foreground: '#CBD1DA',
      },
    },
    {
      name: 'Block Level Variables',
      scope: [
        'meta.block variable.other',
      ],
      settings: {
        foreground: '#CBD1DA',
      },
    },
    {
      name: 'Other Variable, String Link',
      scope: [
        'support.other.variable',
        'string.other.link',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'Number, Constant, Function Argument, Tag Attribute, Embedded',
      scope: [
        'constant.numeric',
        'constant.language',
        'support.constant',
        'constant.character',
        'constant.escape',
        'variable.parameter',
        'keyword.other.unit',
        'keyword.other',
      ],
      settings: {
        foreground: '#e69e4c',
      },
    },
    {
      name: 'String, Symbols, Inherited Class, Markup Heading',
      scope: [
        'string',
        'constant.other.symbol',
        'constant.other.key',
        'entity.other.inherited-class',
        'markup.heading',
        'markup.inserted.git_gutter',
        'meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js',
      ],
      settings: {
        foreground: '#5AAFAD',
      },
    },
    {
      name: 'Class, Support',
      scope: [
        'entity.name',
        'support.type',
        'support.class',
        'support.other.namespace.use.php',
        'meta.use.php',
        'support.other.namespace.php',
        'markup.changed.git_gutter',
        'support.type.sys-types',
      ],
      settings: {
        foreground: '#E15362',
      },
    },
    {
      name: 'Entity Types',
      scope: [
        'support.type',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'CSS Class and Support',
      scope: [
        'source.css support.type.property-name',
        'source.sass support.type.property-name',
        'source.scss support.type.property-name',
        'source.less support.type.property-name',
        'source.stylus support.type.property-name',
        'source.postcss support.type.property-name',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'Sub-methods',
      scope: [
        'entity.name.module.js',
        'variable.import.parameter.js',
        'variable.other.class.js',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'Language methods',
      scope: [
        'variable.language',
      ],
      settings: {
        fontStyle: 'italic',
        foreground: '#6699cc',
      },
    },
    {
      name: 'entity.name.method.js',
      scope: [
        'entity.name.method.js',
      ],
      settings: {
        fontStyle: 'italic',
        foreground: '#6699cc',
      },
    },
    {
      name: 'meta.method.js',
      scope: [
        'meta.class-method.js entity.name.function.js',
        'variable.function.constructor',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'Attributes',
      scope: [
        'entity.other.attribute-name',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'HTML Attributes',
      scope: [
        'text.html.basic entity.other.attribute-name.html',
        'text.html.basic entity.other.attribute-name',
      ],
      settings: {
        fontStyle: 'italic',
        foreground: '#6699cc',
      },
    },
    {
      name: 'CSS Classes',
      scope: [
        'entity.other.attribute-name.class',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'CSS ID\'s',
      scope: [
        'source.sass keyword.control',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'Inserted',
      scope: [
        'markup.inserted',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'Deleted',
      scope: [
        'markup.deleted',
      ],
      settings: {
        foreground: '#E15362',
      },
    },
    {
      name: 'Changed',
      scope: [
        'markup.changed',
      ],
      settings: {
        foreground: '#5AAFAD',
      },
    },
    {
      name: 'Regular Expressions',
      scope: [
        'string.regexp',
      ],
      settings: {
        foreground: '#5AAFAD',
      },
    },
    {
      name: 'Escape Characters',
      scope: [
        'constant.character.escape',
      ],
      settings: {
        foreground: '#5AAFAD',
      },
    },
    {
      name: 'URL',
      scope: [
        '*url*',
        '*link*',
        '*uri*',
      ],
      settings: {
        fontStyle: 'underline',
      },
    },
    {
      name: 'Decorators',
      scope: [
        'tag.decorator.js entity.name.tag.js',
        'tag.decorator.js punctuation.definition.tag.js',
      ],
      settings: {
        fontStyle: 'italic',
        foreground: '#E15362',
      },
    },
    {
      name: 'ES7 Bind Operator',
      scope: [
        'source.js constant.other.object.key.js string.unquoted.label.js',
      ],
      settings: {
        fontStyle: 'italic',
        foreground: '#6699cc',
      },
    },
    {
      name: 'JSON Key - Level 0',
      scope: [
        'source.json meta.structure.dictionary.json support.type.property-name.json',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'JSON Key - Level 1',
      scope: [
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'JSON Key - Level 2',
      scope: [
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'JSON Key - Level 3',
      scope: [
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'JSON Key - Level 4',
      scope: [
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'JSON Key - Level 5',
      scope: [
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'JSON Key - Level 6',
      scope: [
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'JSON Key - Level 7',
      scope: [
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'JSON Key - Level 8',
      scope: [
        'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'Markdown - Plain',
      scope: [
        'text.html.markdown',
        'punctuation.definition.list_item.markdown',
      ],
      settings: {
        foreground: '#CBD1DA',
      },
    },
    {
      name: 'Markdown - Markup Raw Inline',
      scope: [
        'text.html.markdown markup.inline.raw.markdown',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'Markdown - Markup Raw Inline Punctuation',
      scope: [
        'text.html.markdown markup.inline.raw.markdown punctuation.definition.raw.markdown',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'Markdown - Heading',
      scope: [
        'markdown.heading',
        'markup.heading | markup.heading entity.name',
        'markup.heading.markdown punctuation.definition.heading.markdown',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'Markup - Italic',
      scope: [
        'markup.italic',
      ],
      settings: {
        fontStyle: 'italic',
        foreground: '#6699cc',
      },
    },
    {
      name: 'Markup - Bold',
      scope: [
        'markup.bold',
        'markup.bold string',
      ],
      settings: {
        fontStyle: 'bold',
        foreground: '#6699cc',
      },
    },
    {
      name: 'Markup - Bold-Italic',
      scope: [
        'markup.bold markup.italic',
        'markup.italic markup.bold',
        'markup.quote markup.bold',
        'markup.bold markup.italic string',
        'markup.italic markup.bold string',
        'markup.quote markup.bold string',
      ],
      settings: {
        fontStyle: 'bold',
        foreground: '#6699cc',
      },
    },
    {
      name: 'Markup - Underline',
      scope: [
        'markup.underline',
      ],
      settings: {
        fontStyle: 'underline',
        foreground: '#6699cc',
      },
    },
    {
      name: 'Markdown - Blockquote',
      scope: [
        'markup.quote punctuation.definition.blockquote.markdown',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'Markup - Quote',
      scope: [
        'markup.quote',
      ],
      settings: {
        fontStyle: 'italic',
      },
    },
    {
      name: 'Markdown - Link',
      scope: [
        'string.other.link.title.markdown',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'Markdown - Link Description',
      scope: [
        'string.other.link.description.title.markdown',
      ],
      settings: {
        foreground: '#C792EA',
      },
    },
    {
      name: 'Markdown - Link Anchor',
      scope: [
        'constant.other.reference.link.markdown',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'Markup - Raw Block',
      scope: [
        'markup.raw.block',
      ],
      settings: {
        foreground: '#6699cc',
      },
    },
    {
      name: 'Markdown - Raw Block Fenced',
      scope: [
        'markup.raw.block.fenced.markdown',
      ],
      settings: {
        foreground: '#00000050',
      },
    },
    {
      name: 'Markdown - Fenced Bode Block',
      scope: [
        'punctuation.definition.fenced.markdown',
      ],
      settings: {
        foreground: '#00000050',
      },
    },
    {
      name: 'Markdown - Fenced Bode Block Variable',
      scope: [
        'markup.raw.block.fenced.markdown',
        'variable.language.fenced.markdown',
        'punctuation.section.class.end',
      ],
      settings: {
        foreground: '#707a8f',
      },
    },
    {
      name: 'Markdown - Fenced Language',
      scope: [
        'variable.language.fenced.markdown',
      ],
      settings: {
        foreground: '#707a8f',
      },
    },
    {
      name: 'Markdown - Separator',
      scope: [
        'meta.separator',
      ],
      settings: {
        fontStyle: 'bold',
        foreground: '#707a8f',
      },
    },
    {
      name: 'Markup - Table',
      scope: [
        'markup.table',
      ],
      settings: {
        foreground: '#CBD1DA',
      },
    },
  ],
}
