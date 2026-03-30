import { Stack } from "expo-router";
import { TicketFlowProvider } from "@/state/ticket-flow-context";

export default function RootLayout() {
  return (
    <TicketFlowProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="viaggio" options={{ headerShown: false }} />
        <Stack.Screen
          name="viaggio-dettaglio"
          options={{ headerShown: false, presentation: "modal", animation: "slide_from_bottom" }}
        />
      </Stack>
    </TicketFlowProvider>
  );
}
