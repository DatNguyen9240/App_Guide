import zipfile
import os
import xml.etree.ElementTree as ET

docx_path = r"d:\App_Guide\工业平板扫码报工操作流程SOP-20260421.docx"

with zipfile.ZipFile(docx_path, 'r') as z:
    doc_xml = z.read("word/document.xml")
    rels_xml = z.read("word/_rels/document.xml.rels")

rels_root = ET.fromstring(rels_xml)
rel_map = {}
for child in rels_root:
    rId = child.attrib.get('Id')
    target = child.attrib.get('Target')
    if target and 'media/' in target:
        rel_map[rId] = os.path.basename(target)

doc_root = ET.fromstring(doc_xml)

# Look at tables in the document
tables = doc_root.findall('.//{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tbl')

output_lines = []
output_lines.append(f"Found {len(tables)} tables in docx")

for t_idx, tbl in enumerate(tables):
    output_lines.append(f"\n=== TABLE {t_idx + 1} ===")
    rows = tbl.findall('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tr')
    for r_idx, tr in enumerate(rows):
        cells = tr.findall('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tc')
        cell_data = []
        for c_idx, tc in enumerate(cells):
            texts = [t.text for t in tc.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if t.text]
            cell_text = " ".join("".join(texts).split())
            
            # Find images in this cell
            cell_images = []
            for blip in tc.iter('{http://schemas.openxmlformats.org/drawingml/2006/main}blip'):
                embed_id = blip.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
                if embed_id in rel_map:
                    cell_images.append(rel_map[embed_id])
            for imagedata in tc.iter('{urn:schemas-microsoft-com:vml}imagedata'):
                rel_id = imagedata.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')
                if rel_id in rel_map:
                    cell_images.append(rel_map[rel_id])
                    
            cell_data.append(f"[C{c_idx+1}]: {cell_text} {('(Img: ' + ', '.join(cell_images) + ')') if cell_images else ''}")
        output_lines.append(f"Row {r_idx+1}: " + " | ".join(cell_data))

with open(r"d:\App_Guide\scripts\docx_structure.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(output_lines))

print("Wrote structure to docx_structure.txt successfully!")
