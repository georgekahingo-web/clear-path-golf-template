Read PROJECT_CONTEXT.md and CURRENT_TASK.md before doing anything.

Update the hero section to use a fullscreen looping background video instead 
of the current CSS gradient background.

Requirements:
- Video file is located at: assets/videos/hero-video.mp4
- The video must autoplay, loop infinitely, be muted (required for autoplay 
  to work in all browsers), and have playsinline attribute for mobile support
- The video should cover the entire hero section (object-fit: cover)
- Overlay a dark semi-transparent layer on top of the video 
  (rgba(0,0,0,0.55)) so the text remains highly readable
- Keep the existing green gradient orbs and grid texture overlay on top of 
  the video for visual consistency with the luxury aesthetic
- All existing hero text, eyebrow, headline, subtext, and CTA buttons remain 
  exactly as they are — only the background changes
- The video element should be positioned absolutely behind all content
- Do not autoplay with sound under any circumstances — muted is mandatory
- Provide a CSS fallback (the existing dark gradient) in case the video fails 
  to load on any device

Do not change anything outside the hero section.