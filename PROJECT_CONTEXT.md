# PROJECT CONTEXT — Portable Golf Simulator Website

## Client Overview
A premium portable mobile golf simulator company that brings a professional golf simulator experience directly to events of all kinds — corporate gatherings, private parties, weddings, birthday celebrations, charity tournaments, sporting events, and more. The simulator is fully self-contained and can be set up at virtually any venue.

## Brand Identity
- **Tone**: Luxurious, professional, aspirational — yet approachable and exciting
- **Feel**: Think private members' club meets modern event entertainment
- **Keywords**: Premium, immersive, exclusive, fun, unforgettable, professional
- **Target Audience**: Corporate event planners, private party hosts, venue managers, sports fans, golf enthusiasts, and anyone looking for a unique event experience

## Visual Aesthetic
- **Color Palette**: Deep charcoal/near-black as a base, rich forest green as the primary brand accent, crisp white/champagne for typography and highlights, and subtle gold/amber for luxury touches
- **Typography**: Elegant serif display font for headings (aspirational, prestigious), clean modern sans-serif for body text
- **Design Language**: Dark, cinematic, luxury — similar to high-end hospitality or premium automotive brands
- **Motion**: Fluid scroll-triggered animations, smooth parallax hero sections, subtle hover states, and silky section transitions throughout the page
- **Imagery**: Hero sections should use full-bleed dark overlays on golf/event photography (use high-quality placeholder gradients until real photos are provided)

## Site Architecture (Pages / Sections)
1. **Hero** — Full-screen cinematic opener with headline, subhead, and primary CTA ("Book Your Experience")
2. **About / What We Do** — Short brand story; what makes this service unique and premium
3. **Services / Packages** — The different event types and offerings (Corporate Events, Private Parties, Weddings, Charity & Tournaments, etc.)
4. **How It Works** — Simple 3-step process: Book → We Set Up → You Play
5. **Gallery / Experience** — Visual showcase of the simulator in action at events
6. **Testimonials / Social Proof** — Client quotes and logos if applicable
7. **FAQ** — Common questions about the simulator, setup requirements, pricing
8. **Booking Form (Formspree)** — Embedded booking/inquiry form; fully integrated into the site design
9. **Footer** — Contact info, social links, copyright

## Booking Form — Formspree Integration
- **Formspree endpoint**: To be provided by client (placeholder: `https://formspree.io/f/YOUR_FORM_ID`)
- **Form fields**: Name, Email, Phone, Event Type (dropdown), Event Date, Estimated Guest Count, Event Location/Venue, Additional Notes
- **Design**: The form must blend seamlessly into the dark luxury aesthetic — no white-box generic form look. Use dark input fields, subtle borders, and on-brand button styling
- **CTA Buttons**: Every major section should have a "Book Now" or "Reserve Your Experience" button that smoothly scrolls the user to the booking form section

## Technical Stack
- **Framework**: Plain HTML, CSS, and vanilla JavaScript (no build tools required; deployable as static files)
- **Styling**: Custom CSS with CSS variables for the design system; no Tailwind or Bootstrap
- **Animations**: CSS transitions and keyframe animations; Intersection Observer API for scroll-triggered reveals
- **Form**: Formspree (fetch-based AJAX submission to avoid page reload)
- **Fonts**: Google Fonts (loaded via `<link>` in `<head>`)
- **Icons**: Inline SVG only — no icon library dependencies
- **Images**: CSS gradient placeholders with descriptive comments where real photography will be placed
- **Performance**: Minimal dependencies, fast load, mobile-first responsive design

## Navigation
- **Sticky/fixed header** that becomes solid on scroll (starts transparent over hero, transitions to dark background when user scrolls down)
- Logo on the left, nav links in the center/right, "Book Now" CTA button always visible in the header (accent color, stands out from nav links)
- Smooth scroll behavior for all anchor links
- Mobile: hamburger menu that opens a full-screen overlay nav

## Responsive Design
- Mobile-first approach
- Breakpoints: 480px (mobile), 768px (tablet), 1024px (desktop), 1440px (wide)
- The booking form must be fully usable on mobile

## Repeated CTA Strategy
"Book Now" / "Reserve Your Experience" / "Get a Quote" buttons appear:
1. In the sticky header (always visible)
2. In the hero section (primary hero CTA)
3. After the Services section
4. After the How It Works section
5. In the Testimonials section
6. As a floating button on mobile (fixed bottom bar) — optional

All CTA buttons scroll to `#booking` section.

## File Structure
```
/
├── index.html          (main single-page site)
├── styles/
│   └── main.css        (all styles)
├── scripts/
│   └── main.js         (all JS: nav scroll, animations, form submission)
└── assets/
    └── images/         (real photos go here when provided)
```

## Placeholders / Client To-Do
- [ ] Provide actual business name and logo
- [ ] Provide Formspree form ID
- [ ] Provide real photography / video assets
- [ ] Confirm pricing packages (or keep inquiry-only model)
- [ ] Confirm social media handles
- [ ] Confirm contact email and phone number
- [ ] Confirm service area / geographic coverage

## Reference / Inspiration
- **Primary reference**: https://www.atlantagolfandsocial.com — specifically admire the transparent-to-solid sticky header behavior, the dark luxury aesthetic, and the clean nav with a standout "Book Now" button
- **Overall feel**: Premium hospitality / luxury event brand — think Ritz-Carlton or high-end golf resort, applied to a mobile entertainment service