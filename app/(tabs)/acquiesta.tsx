import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useTicketFlow } from "@/state/ticket-flow-context";
import { PALETTE } from "@/ui/tokens";

const TICKET_DESCRIPTION =
  "Non cedibile. Obbligo di convalidare all’inizio del viaggio ed esibire a richiesta / Non-transferable. To be validated at the beginning of the trip and shown on request. Vale 70' dalla convalida (90' a Firenze) per i servizi urbani d...";

export default function AcquiestaScreen() {
  const router = useRouter();
  const { state, actions } = useTicketFlow();

  const isInUse = state.status === "in_use";

  function onTicketCardPress() {
    if (isInUse) {
      router.push("/viaggio");
      return;
    }
    actions.openActivationSheet();
  }

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topCard}>
            <Text style={styles.topTitle}>My at - biglietti</Text>
            <Pressable style={styles.swapButton}>
              <Ionicons
                name="swap-horizontal-outline"
                size={22}
                color={PALETTE.BLU_PRINCIPALE}
              />
            </Pressable>
          </View>

          <Text style={styles.sectionLabel}>SUL MIO TELEFONO</Text>

          <Pressable style={styles.ticketCard} onPress={onTicketCardPress}>
            <LinearGradient style={styles.ticketGradient}
              // Inverti l'ordine dei colori o usa start/end per il "to left"
              colors={['#79c3b6', '#489784']}
              start={{ x: 1, y: 0.5 }} // Parte da destra
              end={{ x: 0, y: 0.5 }}   // Arriva a sinistra
            >
              <View style={styles.brandRow}>
                <Image source={require("../../ui/logo-at-white.png")} style={styles.brandIcon} />
                <Text style={styles.brand}>at-bus.it</Text>
              </View>
              <View style={styles.ticketTitleRow}>
                <Text style={styles.ticketTitle}>Biglietto</Text>
                <Text style={styles.ticketTitleEn}>Ticket</Text>
              </View>
              <Text style={styles.ticketSub}>Urbano capoluogo</Text>
              <View style={styles.activateBadge}>
                <Text style={styles.activateText}>Clicca per attivare / Tap to activate</Text>
              </View>

              {isInUse ? (
                <View style={styles.ticketOverlay}>
                  <View style={styles.lockCircle}>
                    <Ionicons name="lock-closed" size={22} color="#0f141a" />
                  </View>
                  <Text style={styles.ticketOverlayText}>Titoli in uso</Text>
                </View>
              ) : null}
            </LinearGradient>
          </Pressable>

          <Text style={styles.available}>URBANO CAPOLUOGO A TEMPO</Text>
          {!isInUse ? <Text style={styles.availableSub}>1 titolo disponibile</Text> : null}
        </ScrollView>

        <View style={styles.buyButtonWrap}>
          <Pressable style={styles.buyButton}>
            <Ionicons name="cart-outline" size={28} color={PALETTE.BIANCO} />
            <Text style={styles.buyText}>Acquista</Text>
          </Pressable>
        </View>
      </View>

      <Modal
        visible={state.activationSheetOpen}
        transparent
        animationType="fade"
        presentationStyle="overFullScreen"
        onRequestClose={actions.closeActivationSheet}
      >
        <View style={styles.modalRoot}>
          <Pressable style={styles.backdrop} onPress={actions.closeActivationSheet} />

          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>URBANO CAPOLUOGO{"\n"}A TEMPO</Text>
            <Text style={styles.sheetCount}>1 titolo disponibile</Text>
            <Text style={styles.sheetDescription}>{TICKET_DESCRIPTION}</Text>

            <Text style={styles.sheetSectionTitle}>Tu stai usando</Text>

            <Pressable
              style={styles.cityRow}
              onPress={() => actions.setCity("altro")}
            >
              <Text style={styles.cityLabel}>Altra città</Text>
              <View style={styles.radioOuter}>
                {state.selectedCity === "altro" ? (
                  <View style={styles.radioSelected}>
                    <Ionicons name="checkmark" size={15} color="#fff" />
                  </View>
                ) : null}
              </View>
            </Pressable>

            <Pressable
              style={styles.cityRow}
              onPress={() => actions.setCity("firenze")}
            >
              <Text style={styles.cityLabel}>Firenze</Text>
              <View style={styles.radioOuter}>
                {state.selectedCity === "firenze" ? (
                  <View style={styles.radioSelected}>
                    <Ionicons name="checkmark" size={15} color="#fff" />
                  </View>
                ) : null}
              </View>
            </Pressable>

            <Pressable style={styles.activateButton} onPress={actions.activateTicket}>
              <Text style={styles.activateButtonText}>Attiva</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e8eb",
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 20,
  },
  topCard: {
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingVertical: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#d7dbe1",
  },
  topTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111111",
  },
  swapButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: PALETTE.BLU_PRINCIPALE,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fb",
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111",
    marginTop: 45,
    marginLeft: 18,
  },
  ticketCard: {
    marginTop: 45,
    alignSelf: "center",
    height: 180,
    width: 300,
    borderRadius: 16,
    borderWidth: 4,
    borderColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.20,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 5,
  },
  ticketGradient: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 13,
    paddingTop: 8,
    paddingBottom: 12,
    overflow: "hidden",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 1,
  },
  brandIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  brand: {
    fontSize: 10,
    color: "#e9fffb",
    fontWeight: "700",
  },
  ticketTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  ticketTitle: {
    fontSize: 27.5,
    color: "#f5fffe",
    fontWeight: "700",
  },
  ticketTitleEn: {
    marginTop: 5,
    fontSize: 20,
    color: "#f5fffe",
    fontStyle: "italic",
  },
  ticketSub: {
    marginTop: 2,
    fontSize: 12,
    color: "#e6fffb",
    marginBottom: 14,
  },
  activateBadge: {
    borderWidth: 1,
    borderColor: "#dcfffb",
    borderRadius: 8,
    alignSelf: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "rgba(30,158,146,0.5)",
  },
  activateText: {
    color: "#e8fffc",
    fontSize: 10,
    fontWeight: "600",
  },
  ticketOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(8, 20, 19, 0.89)",
    alignItems: "center",
    justifyContent: "center",
  },
  lockCircle: {
    width: 35,
    height: 35,
    borderRadius: 999,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  ticketOverlayText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "300",
  },
  available: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 13,
    letterSpacing: 0.4,
    fontWeight: "700",
    color: "#2a2c31",
  },
  availableSub: {
    textAlign: "center",
    marginTop: 4,
    fontSize: 12,
    fontWeight: "700",
    color: "#2a2c31",
  },
  buyButtonWrap: {
    paddingHorizontal: 18,
    paddingBottom: 35,
    paddingTop: 4,
  },
  buyButton: {
    borderRadius: 7,
    height: 60,
    backgroundColor: PALETTE.BLU_PRINCIPALE,
    paddingVertical: 13,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  buyText: {
    color: PALETTE.BIANCO,
    fontSize: 16,
    fontWeight: "700",
  },
  modalRoot: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.34)",
  },
  sheet: {
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: "#f4f4f6",
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 20,
  },
  sheetTitle: {
    fontSize: 35,
    lineHeight: 41,
    fontWeight: "700",
    color: "#05070b",
    letterSpacing: 0.6,
  },
  sheetCount: {
    marginTop: 14,
    fontSize: 22,
    color: "#111",
    fontWeight: "400",
  },
  sheetDescription: {
    marginTop: 14,
    fontSize: 15,
    lineHeight: 21,
    color: "#0f1115",
  },
  sheetSectionTitle: {
    marginTop: 24,
    fontSize: 22,
    fontWeight: "700",
    color: "#0c0d11",
  },
  cityRow: {
    marginTop: 12,
    borderRadius: 14,
    backgroundColor: "#e8e8eb",
    paddingHorizontal: 16,
    height: 68,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cityLabel: {
    fontSize: 17,
    color: "#111",
  },
  radioOuter: {
    width: 30,
    height: 30,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#131619",
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    width: 24,
    height: 24,
    borderRadius: 999,
    backgroundColor: PALETTE.BLU_PRINCIPALE,
    alignItems: "center",
    justifyContent: "center",
  },
  activateButton: {
    marginTop: 20,
    borderRadius: 12,
    backgroundColor: PALETTE.BLU_PRINCIPALE,
    height: 62,
    alignItems: "center",
    justifyContent: "center",
  },
  activateButtonText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
});
