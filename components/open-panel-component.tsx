"use client";
import { OpenPanelComponent } from "@openpanel/nextjs";
export default function OpenPanel() {
  return (
    <OpenPanelComponent
      clientId="52844327-3f97-4ea3-ab48-3bb5861b7306"
      trackScreenViews={true}
      trackAttributes={true}
      trackOutgoingLinks={true}
      // If you have a user id, you can pass it here to identify the user
      apiUrl="https://opapi.dev.2rocksstudio.hk"
    />
  );
}
