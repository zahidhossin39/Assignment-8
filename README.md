# Curator Library

[curator-library](https://curator-library-by-zaid.netlify.app)

## Purpose
Curator Library is a professional-grade library management application designed to bridge the gap between physical collections and digital accessibility. The primary objective of the platform is to provide users with a secure, seamless interface to discover literature, track book availability in real-time, and manage personal profiles. By implementing modern web standards and responsive design, the platform ensures that library members can interact with the collection efficiently across any device.

## Key Features
* **Secure Multi-Method Authentication:** Fully integrated login and registration system supporting both standard Email/Password credentials and Google Social Login via BetterAuth.
* **Dynamic Inventory Tracking:** Real-time display of book quantities (e.g., "5 copies left") with logic to prevent borrowing when stock is depleted.
* **Advanced Filtering & Search:** * **Sidebar Categorization:** Dedicated filtering for 'Story', 'Tech', and 'Science' categories.
    * **Title Search:** A high-performance search bar for instant book location by title.
* **Protected Route Architecture:** Secure implementation where Book Details and User Profile pages are restricted to authenticated users only.
* **State-Driven Navbar:** A dynamic navigation system that conditionally renders "Login," "My Profile," and "Logout" options based on the user's authentication state.
* **Automated User Feedback:** Integration of toast notifications to provide immediate status updates for authentication events, successful borrowing, and profile modifications.
* **Profile Customization:** A private dashboard allowing users to view account details and update their display name and profile image URL.
* **Responsive UI/UX:** A mobile-first design approach ensuring full functionality on smartphone, tablet, and desktop viewports.

## Technologies & Dependencies
The project utilizes the following industry-standard npm packages:

* **next**: React framework for production-grade server-side rendering and routing.
* **tailwindcss**: Utility-first CSS framework for rapid and consistent UI development.
* **daisyui**: Highly customizable component library for Tailwind CSS.
* **better-auth**: Comprehensive authentication framework for secure session management.
* **react-toastify**: Library for implementing non-intrusive, status-based user notifications.
* **lucide-react**: Clean and consistent icon library for professional interface elements.

## Local Development
1. Clone the repository.
2. Install dependencies: `npm install`
3. Configure environment variables in a `.env` file (BetterAuth and Google Cloud credentials).
4. Start the development server: `npm run dev`
