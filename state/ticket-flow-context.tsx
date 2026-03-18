import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

type TicketStatus = "idle" | "in_use";
type TicketCity = "altro" | "firenze";

type TicketFlowInternalState = {
  status: TicketStatus;
  activationSheetOpen: boolean;
  selectedCity: TicketCity;
  remainingSeconds: number;
};

export interface TicketFlowState {
  status: TicketStatus;
  activationSheetOpen: boolean;
  selectedCity: TicketCity;
  remainingSeconds: number;
  hasHomeDot: boolean;
}

export interface TicketFlowActions {
  openActivationSheet: () => void;
  closeActivationSheet: () => void;
  setCity: (city: TicketCity) => void;
  activateTicket: () => void;
  tickCountdown: () => void;
  resetTimerOnAppLaunchIfInUse: () => void;
}

export const MIN_REMAINING_SECONDS = 600;
export const MAX_REMAINING_SECONDS = 5400;
export const INITIAL_REMAINING_SECONDS = 5396;
export const LAST_UPDATE_LABEL = "14:20";
export const ACTIVATION_DATE_LABEL = "24/02/2026 alle 02:20";
export const EXPIRY_DATE_LABEL = "24/02/2026 alle 03:50";
export const HISTORY_DAY_LABEL = "Oggi - Martedì 24 febbraio";
export const HISTORY_TIME_LABEL = "14:20";

const STATUS_STORAGE_KEY = "ticket_flow_status";
const CITY_STORAGE_KEY = "ticket_flow_city";

function getScriptedRemainingSeconds() {
  const span = MAX_REMAINING_SECONDS - MIN_REMAINING_SECONDS;
  return MIN_REMAINING_SECONDS + Math.floor(Math.random() * (span + 1));
}

type TicketFlowAction =
  | { type: "HYDRATE"; status: TicketStatus; selectedCity: TicketCity }
  | { type: "OPEN_SHEET" }
  | { type: "CLOSE_SHEET" }
  | { type: "SET_CITY"; city: TicketCity }
  | { type: "ACTIVATE_TICKET" }
  | { type: "TICK_COUNTDOWN" }
  | { type: "RESET_TIMER_IF_IN_USE" };

const initialState: TicketFlowInternalState = {
  status: "idle",
  activationSheetOpen: false,
  selectedCity: "firenze",
  remainingSeconds: INITIAL_REMAINING_SECONDS,
};

function reducer(
  state: TicketFlowInternalState,
  action: TicketFlowAction
): TicketFlowInternalState {
  switch (action.type) {
    case "HYDRATE":
      return {
        ...state,
        status: action.status,
        selectedCity: action.selectedCity,
        activationSheetOpen: false,
        remainingSeconds:
          action.status === "in_use" ? INITIAL_REMAINING_SECONDS : state.remainingSeconds,
      };
    case "OPEN_SHEET":
      return { ...state, activationSheetOpen: true };
    case "CLOSE_SHEET":
      return { ...state, activationSheetOpen: false };
    case "SET_CITY":
      return { ...state, selectedCity: action.city };
    case "ACTIVATE_TICKET":
      return {
        ...state,
        status: "in_use",
        activationSheetOpen: false,
        remainingSeconds: INITIAL_REMAINING_SECONDS,
      };
    case "TICK_COUNTDOWN":
      return {
        ...state,
        remainingSeconds: Math.max(0, state.remainingSeconds - 1),
      };
    case "RESET_TIMER_IF_IN_USE":
      if (state.status !== "in_use") {
        return state;
      }
      return { ...state, remainingSeconds: getScriptedRemainingSeconds() };
    default:
      return state;
  }
}

type TicketFlowContextValue = {
  state: TicketFlowState;
  actions: TicketFlowActions;
};

const TicketFlowContext = createContext<TicketFlowContextValue | null>(null);

function parseStoredStatus(value: string | null): TicketStatus {
  return value === "in_use" ? "in_use" : "idle";
}

function parseStoredCity(value: string | null): TicketCity {
  return value === "altro" ? "altro" : "firenze";
}

export function TicketFlowProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hydrated, setHydrated] = useReducer(() => true, false);

  useEffect(() => {
    let mounted = true;

    async function hydrateState() {
      try {
        const entries = await AsyncStorage.multiGet([
          STATUS_STORAGE_KEY,
          CITY_STORAGE_KEY,
        ]);
        const status = parseStoredStatus(entries[0]?.[1] ?? null);
        const selectedCity = parseStoredCity(entries[1]?.[1] ?? null);

        if (!mounted) return;
        dispatch({ type: "HYDRATE", status, selectedCity });
      } finally {
        if (mounted) setHydrated();
      }
    }

    void hydrateState();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (state.status !== "in_use") return;
    const id = setInterval(() => {
      dispatch({ type: "TICK_COUNTDOWN" });
    }, 1000);
    return () => clearInterval(id);
  }, [state.status]);

  useEffect(() => {
    if (!hydrated) return;
    void AsyncStorage.multiSet([
      [STATUS_STORAGE_KEY, state.status],
      [CITY_STORAGE_KEY, state.selectedCity],
    ]);
  }, [hydrated, state.status, state.selectedCity]);

  const openActivationSheet = useCallback(() => {
    dispatch({ type: "OPEN_SHEET" });
  }, []);

  const closeActivationSheet = useCallback(() => {
    dispatch({ type: "CLOSE_SHEET" });
  }, []);

  const setCity = useCallback((city: TicketCity) => {
    dispatch({ type: "SET_CITY", city });
  }, []);

  const activateTicket = useCallback(() => {
    dispatch({ type: "ACTIVATE_TICKET" });
  }, []);

  const tickCountdown = useCallback(() => {
    dispatch({ type: "TICK_COUNTDOWN" });
  }, []);

  const resetTimerOnAppLaunchIfInUse = useCallback(() => {
    dispatch({ type: "RESET_TIMER_IF_IN_USE" });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    resetTimerOnAppLaunchIfInUse();
  }, [hydrated, resetTimerOnAppLaunchIfInUse]);

  const value = useMemo<TicketFlowContextValue>(
    () => ({
      state: {
        ...state,
        hasHomeDot: state.status === "in_use",
      },
      actions: {
        openActivationSheet,
        closeActivationSheet,
        setCity,
        activateTicket,
        tickCountdown,
        resetTimerOnAppLaunchIfInUse,
      },
    }),
    [
      activateTicket,
      closeActivationSheet,
      openActivationSheet,
      resetTimerOnAppLaunchIfInUse,
      setCity,
      state,
      tickCountdown,
    ]
  );

  return (
    <TicketFlowContext.Provider value={value}>{children}</TicketFlowContext.Provider>
  );
}

export function useTicketFlow() {
  const context = useContext(TicketFlowContext);
  if (!context) {
    throw new Error("useTicketFlow must be used inside TicketFlowProvider");
  }
  return context;
}
