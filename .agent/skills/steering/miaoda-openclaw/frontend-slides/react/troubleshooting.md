# Troubleshooting

Common issues and fixes for web slide presentations.

---

## Framer Motion not working

- Check that `whileInView` viewport settings are correct
- Verify `motion` components are imported from `framer-motion`

## Styles not applying

- Verify `data-ppt-theme` attribute is set on the root container
- Check that `theme.css` is imported in the presentation component

## Scroll snap not working

- Ensure container has `snap-y snap-mandatory`
- Each slide needs `snap-start`
- Check that the container has `overflow-y-auto` (not `overflow-hidden`)

## Mobile issues

- Test with DevTools device mode
- Use `h-dvh` instead of `h-screen` (handles mobile browser chrome)
- Verify clamp() typography scales correctly on small screens
