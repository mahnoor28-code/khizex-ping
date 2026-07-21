import type { Contact } from "../types/contact";

export const CONTACTS: Contact[] = [
  { id: "c-amina", name: "Amina", initials: "A", isOnline: true, lastMessagePreview: "Sounds good, see you then!" },
  { id: "c-bilal", name: "Bilal", initials: "B", isOnline: false, lastMessagePreview: "Sent the files ✅" },
  { id: "c-hina", name: "Hina", initials: "H", isOnline: true, lastMessagePreview: "typing…" },
  { id: "c-usman", name: "Usman", initials: "U", isOnline: false, lastMessagePreview: "Let's catch up tomorrow" }
];

export const ACTIVE_CONTACT_ID = "c-amina";
