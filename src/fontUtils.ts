const injectedFonts = new Set<string>();

export function getFontFamily(fontUrl: string): string {
  const filename = fontUrl.split('/').pop() ?? '';
  return filename.replace(/\.[^.]+$/, '');
}

export function injectFont(fontUrl: string): void {
  if (injectedFonts.has(fontUrl)) return;
  const fontFamily = getFontFamily(fontUrl);
  const style = document.createElement('style');
  style.textContent = `@font-face { font-family: '${fontFamily}'; src: url('${fontUrl}'); font-display: swap; }`;
  document.head.appendChild(style);
  injectedFonts.add(fontUrl);
}
