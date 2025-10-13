import { create } from 'zustand';

interface InteractiveModeState {
  isInteractiveMode: boolean;
  isRocketLaunched: boolean;
  toggleInteractiveMode: () => void;
  setRocketLaunched: (launched: boolean) => void;
  resetInteractiveMode: () => void;
}

export const useInteractiveModeStore = create<InteractiveModeState>((set, get) => ({
  isInteractiveMode: false,
  isRocketLaunched: false,
  
  toggleInteractiveMode: () => {
    const { isInteractiveMode } = get();
    set({ 
      isInteractiveMode: !isInteractiveMode,
      isRocketLaunched: !isInteractiveMode ? false : get().isRocketLaunched
    });
    
    if (!isInteractiveMode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  },
  
  setRocketLaunched: (launched: boolean) => {
    set({ isRocketLaunched: launched });
  },
  
  resetInteractiveMode: () => {
    set({ 
      isInteractiveMode: false, 
      isRocketLaunched: false 
    });
    document.body.style.overflow = "auto";
  }
}));
