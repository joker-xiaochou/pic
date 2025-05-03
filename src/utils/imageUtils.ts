export const generateGrid = async (imageUrl: string): Promise<string[]> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imageUrl;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const size = Math.min(img.width, img.height);
      const cellSize = size / 3;
      
      const gridImages: string[] = [];
      
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          canvas.width = cellSize;
          canvas.height = cellSize;
          
          ctx.drawImage(
            img,
            col * cellSize,
            row * cellSize,
            cellSize,
            cellSize,
            0,
            0,
            cellSize,
            cellSize
          );
          
          gridImages.push(canvas.toDataURL('image/jpeg'));
        }
      }
      
      resolve(gridImages);
    };
  });
}; 