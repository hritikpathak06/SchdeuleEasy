import { BellIcon, CalendarIcon, GridIcon, Link2Icon, TableIcon } from "@radix-ui/react-icons";
import { SelectIcon, SelectItemIndicator } from "@radix-ui/react-select";


export const keyFeatures = [
  {
    icon: CalendarIcon,
    title: "Manage Availability",
    description:
      "Easily set your availability to ensure that meetings are scheduled only when you’re free. Sync with your calendar to prevent double bookings and take control of your time.",
  },
  {
    icon: Link2Icon,
    title: "Custom Links",
    description:
      "Create personalized scheduling links that reflect your brand. Share these links with clients and colleagues to simplify the booking process, making it easy for them to find a suitable time for meetings.",
  },
  {
    icon: SelectIcon,
    title: "Easy Setup",
    description:
      "Get started quickly with a user-friendly interface that requires no technical skills. Set up your profile, define your preferences, and start scheduling meetings in minutes.",
  },
  {
    icon: BellIcon,
    title: "Automated Reminders",
    description:
      "Reduce no-shows with automated email and SMS reminders. Keep your participants informed and ensure that everyone is prepared for the meeting.",
  },
  {
    icon: TableIcon,
    title: "Integrations",
    description:
      "Seamlessly integrate with popular calendar apps and tools like Google Calendar, Zoom, and Microsoft Teams to enhance your scheduling experience and keep everything in sync.",
  },
  {
    icon: GridIcon,
    title: "Customizable Meeting Types",
    description:
      "Offer various meeting types (e.g., one-on-one, group meetings, consultations) to cater to different needs. Tailor the duration and settings for each meeting type to ensure flexibility.",
  },
];




export const timeSlots = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

export const defaultAvailability = {
  monday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
  tuesday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
  wednesday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
  thursday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
  friday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
  saturday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
  sunday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
  timeGap: 0,
};