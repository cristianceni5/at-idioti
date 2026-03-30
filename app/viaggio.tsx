import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTicketFlow } from "@/state/ticket-flow-context";
import { getTicketDateLabels } from "@/ui/ticket-date-labels";
import { HEADER_TOKENS, PALETTE, getHeaderHeight } from "@/ui/tokens";

function formatRemaining(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
    secs
  ).padStart(2, "0")}`;
}

function formatValidationTime24(activationStartedAt: number | null) {
  const base = activationStartedAt
    ? new Date(activationStartedAt - 5 * 60 * 1000)
    : new Date(Date.now() - 5 * 60 * 1000);
  const hour = String(base.getHours()).padStart(2, "0");
  const minute = String(base.getMinutes()).padStart(2, "0");
  return `${hour}:${minute}`;
}

export default function ViaggioScreen() {
  const router = useRouter();
  const { state } = useTicketFlow();
  const [fontsLoaded] = useFonts({
    Parisine: require("../ui/Parisine Regular.otf"),
  });
  const insets = useSafeAreaInsets();
  const headerHeight = getHeaderHeight(insets.top);
  const labels = getTicketDateLabels(new Date(), state.activationStartedAt);
  const validationTime24 = formatValidationTime24(state.activationStartedAt);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          {
            height: headerHeight,
            paddingTop: insets.top + HEADER_TOKENS.TOP_OFFSET,
            paddingBottom: HEADER_TOKENS.BOTTOM_PADDING,
            paddingHorizontal: HEADER_TOKENS.HORIZONTAL_PADDING,
          },
        ]}
      >
        <Pressable style={styles.headerBack} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
          <Text style={styles.headerBackText}>Indietro</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Il mio viaggio</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.inUseRow}>
        <Text style={styles.inUseText}>In uso</Text>
        <Ionicons name="hourglass-outline" size={28} color="#7789a8" />
      </View>

      <Pressable style={styles.ticketCard} onPress={() => router.push("/viaggio-dettaglio")}>
        <LinearGradient
          style={styles.ticketTop}
          colors={["#79c3b6", "#489583"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <View style={styles.brandRow}>
            <Image source={require("../ui/logo-at-white.png")} style={styles.brandIcon} />
            <Text style={styles.brand}>at-bus.it</Text>
          </View>
          <View style={styles.ticketTitleRow}>
            <Text style={[styles.ticketTitle, fontsLoaded && styles.ticketTitleParisine]}>
              Biglietto
            </Text>
            <Text style={styles.ticketTitleEn}>Ticket</Text>
          </View>
          <Text style={styles.ticketSub}>Urbano capoluogo</Text>
        </LinearGradient>

        <View style={styles.ticketBottom}>
          <Text style={styles.ticketBottomLabel}>Fine della validità:</Text>
          <Text style={styles.ticketBottomTime}>{formatRemaining(state.remainingSeconds)}</Text>
        </View>
      </Pressable>

      <View style={styles.historyWrap}>
        <View style={styles.historyPointer} />
        <Text style={styles.historyTitle}>Storico biglietti</Text>
        <View style={styles.dayPill}>
          <Text style={styles.dayPillText}>{labels.historyDayLabel}</Text>
        </View>

        <View style={styles.historyRow}>
          <View>
            <Text style={styles.historySmall}>1 convalida</Text>
            <Text style={styles.historyMain}>URBANO CAPOLUOGO A TEMPO</Text>
          </View>
          <Text style={styles.historyTime}>{validationTime24}</Text>
        </View>

        <View style={[styles.qrWrap, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <Pressable style={styles.qrButton} onPress={() => router.push("/viaggio-dettaglio")}>
            <Text style={styles.qrText}>Visualizza il QR code</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e8eb",
  },
  header: {
    backgroundColor: PALETTE.BLU_PRINCIPALE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.28)",
  },
  headerBack: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: HEADER_TOKENS.SIDE_SLOT_WIDTH,
    height: HEADER_TOKENS.CONTENT_HEIGHT,
  },
  headerBackText: {
    color: "#fff",
    fontSize: HEADER_TOKENS.BACK_LABEL_SIZE,
    marginLeft: -2,
    fontWeight: "500",
  },
  headerTitle: {
    color: "#fff",
    fontSize: HEADER_TOKENS.TITLE_SIZE,
    fontWeight: "700",
  },
  headerSpacer: {
    minWidth: HEADER_TOKENS.SIDE_SLOT_WIDTH,
    height: HEADER_TOKENS.CONTENT_HEIGHT,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 16,
  },
  inUseRow: {
    marginTop: 14,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  inUseText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#355280",
  },
  ticketCard: {
    alignSelf: "center",
    width: 280,
    backgroundColor: "#ffffff",
    marginTop: 12,
    marginHorizontal: 18,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 4,
  },
  ticketTop: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 0,
  },
  brandIcon: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },
  brand: {
    fontSize: 10,
    color: "#e8fffb",
    fontWeight: "700",
  },
  ticketTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ticketTitle: {
    fontSize: 20,
    color: "#f4fffe",
    fontWeight: "800",
  },
  ticketTitleParisine: {
    fontFamily: "Parisine",
    fontWeight: "900",
  },
  ticketTitleEn: {
    marginTop: 3,
    fontSize: 16,
    color: "#f4fffe",
    fontStyle: "italic",
  },
  ticketSub: {
    marginTop: 3,
    color: "#eafffc",
    fontSize: 12,
    marginBottom: 6,
  },
  ticketBottom: {
    backgroundColor: "#000",
    paddingVertical: 5,
    alignItems: "center",
  },
  ticketBottomLabel: {
    color: "#8f9196",
    fontSize: 14,
  },
  ticketBottomTime: {
    marginTop: 2,
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  historyWrap: {
    marginTop: 35,
    backgroundColor: "#ffffff",
    paddingTop: 18,
    position: "relative",
    height: '100%',
  },
  historyPointer: {
    position: "absolute",
    top: -10,
    left: "50%",
    marginLeft: -12,
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 12,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#ffffff",
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#3a3d42",
    textAlign: "center",
    marginBottom: 10,
  },
  dayPill: {
    alignSelf: "flex-start",
    marginLeft: 18,
    borderRadius: 4,
    backgroundColor: "#d3d4d8",
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 8,
  },
  dayPillText: {
    color: "#4f535a",
    fontSize: 13,
  },
  historyRow: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#d8dade",
    borderStyle: "dashed",
    paddingHorizontal: 18,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  historySmall: {
    fontSize: 14,
    color: "#33363d",
  },
  historyMain: {
    marginTop: 2,
    fontSize: 17,
    fontWeight: "700",
    color: "#21242a",
  },
  historyTime: {
    fontSize: 17,
    fontWeight: "700",
    color: "#272a2f",
  },
  qrWrap: {
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingTop: 250,
    paddingBottom: 20
  },
  qrButton: {
    height: 45,
    borderRadius: 14,
    backgroundColor: PALETTE.BLU_PRINCIPALE,
    alignItems: "center",
    justifyContent: "center",
  },
  qrText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
