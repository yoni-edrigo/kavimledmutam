const injectedFonts = new Set<string>();

export function getFontFamily(fontUrl: string): string {
  const filename = fontUrl.split('/').pop() ?? '';
  return filename.replace(/\.[^.]+$/, '');
}

function localFontUrl(fontUrl: string): string {
  const filename = fontUrl.split('/').pop() ?? '';
  return `/fonts/${filename}`;
}

export function injectFont(fontUrl: string): void {
  if (injectedFonts.has(fontUrl)) return;
  const fontFamily = getFontFamily(fontUrl);
  const src = localFontUrl(fontUrl);
  const style = document.createElement('style');
  style.textContent = `@font-face { font-family: '${fontFamily}'; src: url('${src}'); font-display: swap; }`;
  document.head.appendChild(style);
  injectedFonts.add(fontUrl);
}
