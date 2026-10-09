import type { CaseItemProps } from "@/components/caseComponents/CaseItem";
// Bedt AI generere "fake data" slik at det som har blitt gjort kan visualiseres, da vi ikke har noe ekte data enda.
export const caseItems: CaseItemProps[] = [
  {
    id: "1",
    title: "Vannlekkasje på badet",
    description: "Det drypper fra røret under vasken.",
    status: "open",
    category: "water",
    severity: "urgent",
    createdAt: "2026-10-01T08:30:00.000Z",
  },
  {
    id: "2",
    title: "Ovnen varmer ikke",
    description: "Ovnen i stua er kald selv på høyeste innstilling.",
    status: "in progress",
    category: "heating",
    severity: "high",
    createdAt: "2026-10-02T14:15:00.000Z",
  },
  {
    id: "3",
    title: "Sikringen går ofte",
    description: "Sikringen i gangen slår seg av når jeg bruker vaskemaskinen.",
    status: "pending",
    category: "electricity",
    severity: "medium",
    createdAt: "2026-10-03T19:45:00.000Z",
  },
  {
    id: "4",
    title: "Støy fra naboen",
    description: "Høy musikk etter midnatt flere kvelder.",
    status: "closed",
    category: "complaint",
    severity: "low",
    createdAt: "2026-09-28T23:10:00.000Z",
  },
];