// Same rule the site applies on mount (localStorage 'pxl-theme', default dark), run before first paint.
// Loaded as a blocking same-origin script (not inline) so the CSP can keep script-src 'self'.
try { document.documentElement.setAttribute('data-theme', localStorage.getItem('pxl-theme') || 'dark') } catch (e) { document.documentElement.setAttribute('data-theme', 'dark') }
