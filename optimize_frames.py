import os
from PIL import Image

def optimize_frames(directory):
    files = [f for f in os.listdir(directory) if f.endswith('.jpg')]
    print(f"Found {len(files)} images to optimize...")
    
    for filename in files:
        filepath = os.path.join(directory, filename)
        with Image.open(filepath) as img:
            # Resize to 50% (960x540) for background usage
            new_size = (960, 540)
            img = img.resize(new_size, Image.Resampling.LANCZOS)
            
            # Save with compression
            img.save(filepath, "JPEG", quality=60, optimize=True)
            print(f"Optimized: {filename}")

if __name__ == "__main__":
    optimize_frames("c:/AI-tools/antigravity/suryaportfolio/public/framevid")
