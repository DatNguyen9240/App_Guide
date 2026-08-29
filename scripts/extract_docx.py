import zipfile
import os
import xml.etree.ElementTree as ET

docx_path = r"d:\App_Guide\工业平板扫码报工操作流程SOP-20260421.docx"
output_dir = r"d:\App_Guide\assets\sop\erp\docx_raw"
os.makedirs(output_dir, exist_ok=True)

with zipfile.ZipFile(docx_path, 'r') as z:
    for f in z.filelist:
        if f.filename.startswith("word/media/"):
            out_file = os.path.join(output_dir, os.path.basename(f.filename))
            with open(out_file, "wb") as out:
                out.write(z.read(f.filename))
            print(f"Extracted: {os.path.basename(f.filename)} ({f.file_size} bytes)")

    # Read document.xml and document.xml.rels to see where each image is placed
    doc_xml = z.read("word/document.xml")
    rels_xml = z.read("word/_rels/document.xml.rels")

# Parse rels to map r:id to target image
rels_root = ET.fromstring(rels_xml)
rel_map = {}
for child in rels_root:
    rId = child.attrib.get('Id')
    target = child.attrib.get('Target')
    if target and 'media/' in target:
        rel_map[rId] = os.path.basename(target)

print("\nRelationship Map (rId -> image):")
for k, v in rel_map.items():
    print(f" {k} -> {v}")

# Parse document.xml to find text paragraphs and their associated blip r:embed
namespaces = {
    'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
    'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
    'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
    'v': 'urn:schemas-microsoft-com:vml'
}

doc_root = ET.fromstring(doc_xml)

print("\n--- Document Content & Image Placement ---")
# Let's iterate over table rows or paragraphs
for p in doc_root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
    texts = [t.text for t in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if t.text]
    full_text = "".join(texts).strip()
    
    # Check for images in this paragraph
    images_in_p = []
    for blip in p.iter('{http://schemas.openxmlformats.org/drawingml/2006/main}blip'):
        embed_id = blip.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
        if embed_id in rel_map:
            images_in_p.append(rel_map[embed_id])
    for imagedata in p.iter('{urn:schemas-microsoft-com:vml}imagedata'):
        rel_id = imagedata.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')
        if rel_id in rel_map:
            images_in_p.append(rel_map[rel_id])
            
    if full_text or images_in_p:
        print(f"P: {full_text} | Images: {images_in_p}")
