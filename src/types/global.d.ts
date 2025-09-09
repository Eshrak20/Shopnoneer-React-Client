declare global {
  interface Window {
    initMap: () => void;
    google: typeof google;
  }
}

// ✅ Import the Maps types
export {};
