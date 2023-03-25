import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const transformVsCodeThemeToMonacoTheme = (vscodeTheme: typeof import('../../assets/whitebird-vscode-theme').default) => {
    return {
      base: 'vs-dark',
      inherit: false,
      rules: vscodeTheme.tokenColors.flatMap((tokenColor: any) => {
        const { scope, settings } = tokenColor

        return scope.map((token: string) => ({ token, ...settings }))
      }),
      colors: vscodeTheme.colors
    } as const
}
