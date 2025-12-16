import { create } from "zustand";

type NavigationSection = "home" | "about" | "projects" | "contact";

interface NavigationState {
  currentSection: NavigationSection;
  setCurrentSection: (section: NavigationSection) => void;
  isTransitioning: boolean;
  setIsTransitioning: (transitioning: boolean) => void;
}

export const useNavigation = create<NavigationState>((set) => ({
  currentSection: "home",
  isTransitioning: false,
  
  setCurrentSection: (section) => {
    set({ isTransitioning: true });
    
    // Simulate transition delay
    setTimeout(() => {
      set({ currentSection: section, isTransitioning: false });
    }, 300);
  },
  
  setIsTransitioning: (transitioning) => set({ isTransitioning: transitioning }),
}));
