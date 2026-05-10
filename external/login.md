Based on the image provided, here is a structured design prompt tailored for your workflow using **React.js** and **Tailwind CSS**. This prompt is optimized for use with the **Gemini CLI** in **VS Code**.

---

### **Gemini CLI Implementation Prompt**

**Role:** Expert Frontend Developer
**Task:** Build a responsive Login/Authentication component based on the following technical requirements and design specifications.

**Stack:**

* **Framework:** React.js (Functional Components)
* **Styling:** Tailwind CSS (Utility-first)
* **Icons:** Lucide-react or Heroicons

**Design Specifications:**

1. **Layout & Background:**
* Create a full-height centered layout (`min-h-screen`, `flex`, `items-center`, `justify-center`).
* Use a subtle radial gradient background in light blue/gray tones.


2. **Header Section:**
* **Logo:** A violet rounded-square icon with a white shield symbol.
* **Typography:** Bold "SecureNotes" heading followed by a secondary "Access your encrypted workspace" subtext.


3. **Authentication Card:**
* White background with large border-radius and a soft outer shadow.
* **Inputs:** Create labeled fields for "Email Address" and "Password." Inputs should have light lavender backgrounds, subtle borders, and left-aligned icons (Mail and Lock). The password field must include a right-aligned "eye" icon for visibility toggling.
* **Primary Button:** A full-width violet button (`bg-indigo-700`) with white text "Sign In to Vault" and a right-pointing arrow icon.


4. **Secondary Actions:**
* Include a "Forgot?" link above the password input.
* A divider with "OR CONTINUE WITH" text.
* Two equal-width outlined buttons for "SSO" (key icon) and "Passkey" (fingerprint icon) with sharp/minimalist styling.


5. **Footer Elements:**
* "Don't have an account? Create a vault" text with "Create a vault" in bold indigo.
* A pill-shaped badge at the bottom with a green background, a shield icon, and the text "256-bit End-to-End Encryption."



**Functional Requirements:**

* Implement state management for input fields using `useState`.
* Ensure the card is responsive (full-width on mobile, max-width on desktop).
* **Style Preference:** Use a clean, professional aesthetic with flat design principles. Avoid excessive rounding where professional sharpness is preferred for the UI elements.

---

### **Key Technical Considerations for Your Setup**

* **Tailwind Config:** Ensure your `tailwind.config.js` includes the indigo/violet shades used in the primary button.
* **Accessibility:** Use proper `<label>` tags and `aria-label` attributes for the icon-only buttons (like the password toggle).
* **Responsiveness:** Use Tailwind's `sm:`, `md:`, and `lg:` prefixes to ensure the card container scales gracefully from mobile to widescreen.