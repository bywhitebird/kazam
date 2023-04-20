export const transformVsCodeThemeToMonacoTheme = (vscodeTheme: typeof import('../assets/whitebirdVsCodeTheme').default) => {
  return {
    base: 'vs-dark',
    inherit: false,
    rules: vscodeTheme.tokenColors.flatMap((tokenColor) => {
      const { scope, settings } = tokenColor

      return scope.map((token: string) => ({ token, ...settings }))
    }),
    colors: vscodeTheme.colors,
  } as const
}
