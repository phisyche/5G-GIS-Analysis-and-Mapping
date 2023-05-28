from pathlib import Path
import json 

src = Path("celltowers.geojson") 
dst = Path("celltowers.js")

geojson_str = json.loads(src.read_text())
dst.write_text(f"var data={geojson_str};")