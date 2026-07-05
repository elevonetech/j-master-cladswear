/**
 * Returns a data-URI placeholder SVG for broken product images.
 * Matches the premium dark theme.
 */
const PLACEHOLDER = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <rect width="400" height="400" fill="#161616"/>
    <g transform="translate(200,200) scale(0.6)" fill="none" stroke="#444444" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M-80,60 L-60,-40 L-20,-50 L30,-80 L70,-50 L100,10 L120,60 Z" />
      <path d="M-80,60 Q-100,80 -80,100 Q-40,110 0,100 Q40,110 80,100 Q100,80 120,60" />
      <path d="M-40,100 L-40,130 M40,100 L40,130" stroke-width="4" />
      <path d="M-30,-50 L-30,60 M30,-50 L30,60" stroke-width="2" stroke-dasharray="4,4" opacity="0.4"/>
      <circle cx="-50" cy="100" r="8" fill="#333333" stroke="none"/>
      <circle cx="50" cy="100" r="8" fill="#333333" stroke="none"/>
    </g>
    <text x="200" y="290" text-anchor="middle" fill="#555555" font-family="system-ui,sans-serif" font-size="14" letter-spacing="3">KITHOME</text>
  </svg>`,
)}`;

/**
 * onError handler for product images.
 * Usage: <img src={...} onError={handleImgError} />
 */
export function handleImgError(
  event: React.SyntheticEvent<HTMLImageElement, Event>,
): void {
  const img = event.currentTarget;
  if (img.src !== PLACEHOLDER) {
    img.src = PLACEHOLDER;
  }
}
