// Icons live in public/admin-icons/*.svg (exported from Figma, see scripts/download-admin-icons.ps1).
// They are used as a CSS mask, so the icon takes the colour of the surrounding text.
export default function Icon({ name, size = 17 }) {
  return (
    <span
      className="adm-icon"
      aria-hidden="true"
      style={{ '--icon-url': `url(/admin-icons/${name}.svg)`, width: size, height: size }}
    />
  )
}
