// for now this worker logic is commented used inbuilt native module

import { gzip } from "fflate";
self.onmessage = (e) => {
  if (e.data.command === "compress") {
    const { chunk, done } = e.data;

    if (done) {
      self.postMessage({ done });
      return;
    }
    const rawChunk = new Uint8Array(chunk);
    gzip(rawChunk, (err, gzippedChunk) => {
      if (err) {
        console.error("compression worker error:", err);
        return;
      }

      postMessage({ chunk: gzippedChunk });
    });
  }

  // try {
  //   const arrayBuffer = new Uint8Array(e.data);
  //   const compressed = gzipSync(arrayBuffer);
  //   self.postMessage(compressed);
  // } catch (err) {
  //   self.postMessage({ error: err.message });
  // }
};
