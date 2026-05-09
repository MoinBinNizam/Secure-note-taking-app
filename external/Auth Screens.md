Act as a Senior Frontend Developer. Generate the React components for 'Login.tsx' and 'Signup.tsx' based on a high-fidelity "Secure Vault" design system. 

### Global Design DNA:
- **Aesthetic**: Modern, high-trust, and minimalist. 
- **Palette**: Background is a very light Slate-50 gradient. Primary Indigo-600 (#4338ca) for buttons and icons.
- **Corners**: Use 'rounded-3xl' (24px) for the main white cards. Input fields and buttons use 'rounded-2xl'.
- **Typography**: Clean sans-serif (Inter). Labels in Slate-600, headers in Slate-900.
- **Security Badge**: Include a pill-shaped badge at the bottom: "AES-256 ENCRYPTED" with a green check icon and light emerald background.

### 1. Signup Screen (Signup.tsx):
- **Header**: Large "Create Account" text with a sub-header: "Secure your thoughts with end-to-end encryption." Top icon: A blue shield with a white check.
- **Form Fields**: 
    - Email Address (with envelope icon).
    - Password (with lock icon and 'eye' toggle for visibility).
- **Interests Input (Critical)**: 
    - Implement a tag-cloud input. 
    - Tags should be Indigo-600 pills with a 'white x' to remove. 
    - Users can type in a field labeled "Add more..." to push new strings into the interests array.
- **Agreement**: A checkbox for Terms of Service and Privacy Policy.
- **Social Login**: Rounded-xl buttons for "Google" and "Apple" logos at the bottom.

### 2. Login Screen (Login.tsx):
- **Header**: Large "SecureNotes" text with sub-header: "Access your encrypted workspace."
- **Form Fields**:
    - Email Address and Password with consistent iconography.
    - Add a "Forgot?" link positioned above the password input on the right.
- **Action**: A full-width 'rounded-2xl' button: "Sign In to Vault" with a right-arrow icon.
- **Alternative Auth**: Secondary buttons for "SSO" (key icon) and "Passkey" (fingerprint icon).
- **Footer**: Text "Don't have an account? Create a vault" where the latter is a link.

### Technical Requirements:
- Use Tailwind CSS for all styling.
- Ensure the layout is mobile-first but centered in a 'max-w-md' container on desktop.
- Implement basic state management for the interest tags array in Signup.tsx.
- Use Lucide-React or Heroicons for the shield, lock, and mail icons.