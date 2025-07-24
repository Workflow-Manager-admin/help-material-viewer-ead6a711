# KAVIA.AI Website - Key Design Themes

## 1. Color Palette
- **Primary:** #1976d2 (Strong, saturated blue for headers, buttons, and active elements)
- **Accent:** #ffca28 (Warm golden yellow used for highlights, logo dot, calls to action)
- **Dark/Secondary:** #424242 and #1A1A1A (Used for dark backgrounds, mode toggle, contrast)
- **Surface/Gray:** #eceff1, #e9ecef, #ececec, #f6f7f9 (Light neutrals for backgrounds and cards)
- **Text:** #222 (Primary text), #fff (On dark backgrounds), secondary text colors leverage opacity or accent shades.

## 2. Layout & Structure
- **Header:** Fixed-height, horizontal bar with logo left, navigation center, theme switcher right.
- **Sidebar:** Vertical navigation/sidebar (when applicable), with topics or sections; collapses/adjusts on mobile.
- **Main Content:** Central display area with primary help/article content, padded and carded for focus.
- **Footer:** Simple, unobtrusive footer with light background, copyright.
- **Responsiveness:** Adapts to mobile with stacked header, reduced padding, collapsible sidebar.

## 3. Typography
- **Font Family:** 'Inter', system-ui, Arial, sans-serif (modern, geometric, readable)
- **Hierarchy:**
  - Bold, large font for logo and section headers.
  - Medium weight for navigation/sidebars.
  - Base body text is clean, medium-to-large (1.13rem+ on desktop).
- **Letter Spacing:** Subtle positive spacing for brand recognition.
- **Contrast:** High-contrast foreground/background for accessibility in light and dark themes.

## 4. Imagery & Illustrations
- **Logo:** Combination of strong brand text and a golden accent dot.
- **Help Sections:** Use of illustration placeholders and dummy images, meant for contextual/supporting visuals.
- **Minimal Stock Images:** Visual focus is on clarity and usefulness, with minimal decorative imagery.

## 5. UI/UX Motifs
- **Modern Minimalism:** Few borders, lots of white/neutral space, gentle shadows and rounded corners.
- **Interactive Elements:** Subtle hover and active states (color transitions, slight background/foreground change).
- **Theme Toggle:** Prominent, easily accessible toggle (light/dark switch), consistent color changes.
- **Navigation:** Left or top navigation with clear active states.
- **Accessibility:** Large clickable areas, focus state styles, readable contrast for both themes.
- **Carded Content:** Articles/help boxes appear on "surface" backgrounds with light box-shadow.

## 6. Overall UX Patterns
- **Simplicity and Clarity:** Focus on immediate access to core content—help, docs, navigation.
- **Discoverability:** Persistent search for topics, sidebar with obvious categories.
- **Consistency:** Brand colors and layout maintained across pages/screens.
- **Fast Feedback:** Animations are subtle but immediate on input/theme change.
- **No Heavy UI Framework:** Pure CSS and React, with hand-rolled components for speed and adjustability.

---

**Use this summary to guide UI implementation, ensure color/typography alignment, and maintain KAVIA brand consistency. For further detail, check `App.css` for color variables and spacing, or reference deployed site style for real-world combination.**
