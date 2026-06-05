import React, { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export default function DashboardTour() {
  useEffect(() => {
    const isCompleted = localStorage.getItem("spendsense_tour_v1_completed");
    if (isCompleted) {
      return;
    }

    const driverObj = driver({
      showProgress: true,
      popoverClass: 'spendsense-tour-theme',
      steps: [
        { 
          element: null as any, 
          popover: { 
            title: 'Welcome to SpendSense AI', 
            description: "Let's take a quick 4-step tour to engineer your wealth.",
            side: "over", 
            align: 'start' 
          } 
        },
        { 
          element: '#tier-1-pulse', 
          popover: { 
            title: 'The Pulse', 
            description: 'Track your real-time net worth and active financial goals at a glance.', 
            side: "bottom", 
            align: 'start' 
          } 
        },
        { 
          element: '#tier-2-actions', 
          popover: { 
            title: 'The Arsenal', 
            description: 'Access your core intelligence, tactical tools, and the Claim Enforcer here.', 
            side: "top", 
            align: 'start' 
          } 
        },
        { 
          element: '#financial-calendar', 
          popover: { 
            title: 'The Omni-Tracker', 
            description: 'Your daily ledger. Log transactions and add memos to track your defensive and offensive capital.', 
            side: "top", 
            align: 'start' 
          } 
        }
      ],
      onDestroyed: () => {
        localStorage.setItem("spendsense_tour_v1_completed", "true");
      },
      onCloseClick: () => {
        localStorage.setItem("spendsense_tour_v1_completed", "true");
        driverObj.destroy();
      }
    });

    driverObj.drive();
  }, []);

  return null;
}
