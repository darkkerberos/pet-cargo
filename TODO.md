# AdminProfile Enhancement Plan

## Information Gathered
- Current AdminProfile.tsx is a functional form with cards for company info, contact info, and address.
- Uses Tailwind CSS for styling, Radix UI components for form elements.
- Logo is currently handled via URL input.
- Dependencies: FilePond needs to be installed for file upload (react-filepond, filepond).

## Plan
- Install FilePond dependencies (react-filepond, filepond).
- Enhance overall design:
  - Add gradient backgrounds to header and cards.
  - Improve icons with colors and animations.
  - Add hover effects and transitions to cards and buttons.
  - Create a more engaging header with a banner-like section.
  - Improve layout with better spacing, shadows, and responsive design.
- Replace logo URL input with FilePond dropzone:
  - Allow only 1 image file (max 2MB).
  - Handle file selection and convert to base64 for logo_url on save.
  - Add validation for file type and size.

## Dependent Files to be Edited
- src/pages/admin/AdminProfile.tsx: Main file to update with new design and FilePond integration.

## Followup Steps
- Test the new design and FilePond functionality.
- Ensure responsive design on different screen sizes.
- Verify file upload and save works correctly.
