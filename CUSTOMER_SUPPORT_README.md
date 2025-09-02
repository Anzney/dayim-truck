# Customer Support Page

## Overview
A comprehensive customer support page built with Next.js, featuring ticket management, analytics, and a modern UI built with shadcn/ui components.

## Features

### 🎫 Ticket Creation
- **Category Selection**: Bug, Billing, Feature Request, Other
- **Description Field**: Rich textarea for detailed issue description
- **File Attachments**: Optional file upload support
- **Form Validation**: Required field validation using React Hook Form

### 📊 Analytics Dashboard
- **Ticket Status Overview**: Pie chart showing Open, In-Progress, and Closed tickets
- **Category Distribution**: Bar chart displaying ticket counts by category
- **Real-time Data**: Mock data that can be easily replaced with real API calls

### 📋 Ticket History
- **Comprehensive Table**: Shows Ticket ID, Category, Status, Priority, Created Date, and Assigned Team
- **Status Indicators**: Color-coded badges for different ticket statuses
- **Priority Levels**: Visual priority indicators (High, Medium, Low)
- **Expandable Details**: Accordion-style expansion for full ticket descriptions

### 🔔 Notifications
- **Toast Notifications**: Success messages when tickets are created
- **Auto-dismiss**: Notifications automatically disappear after 5 seconds
- **Manual Close**: Users can manually dismiss notifications

## Technical Implementation

### Frontend Framework
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React version with modern hooks

### UI Components
- **shadcn/ui**: Pre-built, accessible components
- **Radix UI**: Headless UI primitives for complex interactions
- **Tailwind CSS**: Utility-first CSS framework

### Charts & Data Visualization
- **Recharts**: React charting library for analytics
- **Responsive Design**: Charts adapt to different screen sizes

### Form Handling
- **React Hook Form**: Efficient form state management
- **Validation**: Built-in form validation with error handling

## File Structure

```
src/
├── app/
│   └── (dashboard)/
│       └── customer-support/
│           └── page.jsx          # Main customer support page
├── components/
│   └── ui/
│       ├── accordion.jsx         # Expandable content component
│       ├── select.jsx            # Dropdown selection component
│       ├── table.jsx             # Data table component
│       ├── textarea.jsx          # Multi-line text input
│       └── toast.jsx             # Notification component
```

## Usage

### Navigation
The customer support page is accessible via the sidebar navigation with a headset icon, located at `/customer-support`.

### Creating Tickets
1. Select a category from the dropdown
2. Enter a detailed description
3. Optionally attach files
4. Click "Submit Ticket" to create the ticket

### Viewing Analytics
- **Status Overview**: View distribution of ticket statuses
- **Category Analysis**: See which types of issues are most common
- **Real-time Updates**: Charts update automatically with new data

### Managing Tickets
- View all tickets in the comprehensive table
- Click "View Details" to expand and see full descriptions
- Track ticket progress through status indicators

## Customization

### Adding New Categories
Modify the `mockTickets` array and category selection options in `page.jsx`.

### Styling Changes
Update Tailwind classes or modify component styles in the respective UI component files.

### Data Integration
Replace mock data with real API calls by updating the data fetching logic in the component.

## Dependencies

### Required Packages
- `@radix-ui/react-accordion`: Accordion functionality
- `@radix-ui/react-select`: Dropdown selection
- `@radix-ui/react-toast`: Toast notifications
- `react-hook-form`: Form management
- `recharts`: Chart components

### UI Framework
- `shadcn/ui`: Component library
- `tailwindcss`: CSS framework
- `lucide-react`: Icon library

## Browser Support
- Modern browsers with ES6+ support
- Responsive design for mobile and desktop
- Accessible UI components following ARIA guidelines

## Future Enhancements
- **Real-time Updates**: WebSocket integration for live ticket updates
- **Advanced Filtering**: Search and filter capabilities for tickets
- **User Authentication**: Role-based access control
- **File Management**: Enhanced file upload and preview
- **Email Integration**: Automated email notifications
- **Reporting**: Advanced analytics and reporting features
