import cssColors from 'css-color-names';

export function getHexFromName(name: string) {
  return cssColors[name.toLowerCase()] || null;
}
