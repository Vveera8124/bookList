import { gunzipSync } from "fflate";
self.onmessage = (e) => {
  try {
    const compressed = new Uint8Array(e.data);
    const decompressed = gunzipSync(compressed);
    const blob = new Blob([decompressed], { type: "text/csv" });
    self.postMessage(blob);
  } catch (err) {
    self.postMessage({ error: err.message });
  }
};
