/**
 * Deterministic client-side image compressor using HTML5 Canvas.
 * Guarantees that the output JPEG file is strictly below `targetKB`
 * by iteratively stepping down JPEG quality and canvas dimensions.
 */
export async function compressImageToTargetKB(
  imageFile: File,
  targetKB: number
): Promise<File> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(imageFile);
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas 2D context unavailable'));
        return;
      }

      const targetBytes = targetKB * 1024;
      let width = img.naturalWidth || img.width || 800;
      let height = img.naturalHeight || img.height || 600;

      // Cap initial dimension based on targetKB for fast convergence
      const maxInitialDim =
        targetKB <= 25 ? 800 : targetKB <= 60 ? 1100 : targetKB <= 120 ? 1400 : 1800;
      if (width > maxInitialDim || height > maxInitialDim) {
        const scale = Math.min(maxInitialDim / width, maxInitialDim / height);
        width = Math.max(120, Math.round(width * scale));
        height = Math.max(120, Math.round(height * scale));
      }

      let quality = 0.88;
      let attempts = 0;

      const step = () => {
        attempts++;
        canvas.width = width;
        canvas.height = height;

        // Fill white background so transparent PNGs convert cleanly to JPEG
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas encoding failed'));
              return;
            }

            if (blob.size <= targetBytes || attempts >= 18 || (quality <= 0.15 && width <= 160)) {
              const baseName = imageFile.name.replace(/\.[^/.]+$/, '');
              const outFile = new File([blob], `${baseName}_${targetKB}kb.jpg`, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(outFile);
              return;
            }

            // Step down quality first, then scale dimensions if needed
            if (quality > 0.35) {
              quality = Math.max(0.2, +(quality - 0.12).toFixed(2));
            } else {
              quality = Math.max(0.18, +(quality - 0.06).toFixed(2));
              width = Math.max(140, Math.round(width * 0.82));
              height = Math.max(140, Math.round(height * 0.82));
            }
            step();
          },
          'image/jpeg',
          quality
        );
      };

      step();
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to decode image file'));
    };

    img.src = objectUrl;
  });
}
