import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconSearch,
  IconDatabase,
  IconHeartRateMonitor,
  IconAnalyze,
  IconLockOpen,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Info",
  },

  {
    id: uniqueId(),
    title: "Home",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Database",
  },
  {
    id: uniqueId(),
    title: "Health",
    icon: IconHeartRateMonitor,
    href: "/health",
  },
  {
    id: uniqueId(),
    title: "Science",
    icon: IconDatabase,
    href: "/science",
  },
  {
    navlabel: true,
    subheader: "Tools",
  },
  {
    id: uniqueId(),
    title: "Simulate",
    icon: IconAnalyze,
    href: "/simulate",
  },
  {
    id: uniqueId(),
    title: "Decoder",
    icon: IconLockOpen,
    href: "/decoder",
  },
];

export default Menuitems;
