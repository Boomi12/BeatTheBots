from fpdf import FPDF
import re

def generate_pdf():
    # Explicitly set unit and format
    pdf = FPDF(unit='mm', format='A4')
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("helvetica", size=10)
    
    try:
        with open('PROJECT_DOCUMENTATION.md', 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except FileNotFoundError:
        print("Error: PROJECT_DOCUMENTATION.md not found.")
        return

    for line in lines:
        try:
            line = line.strip()
            line = "".join(filter(lambda x: x.isprintable(), line))
            line = re.sub(r'[^\x00-\x7F]+', '', line) # ASCII only
            
            if not line:
                pdf.ln(4)
                continue
            
            if line.startswith('# '):
                pdf.set_font('helvetica', 'B', 14)
                pdf.multi_cell(180, 10, line[2:].upper())
                pdf.ln(2)
            elif line.startswith('## '):
                pdf.set_font('helvetica', 'B', 12)
                pdf.multi_cell(180, 8, line[3:])
                pdf.ln(1)
            elif line.startswith('### '):
                pdf.set_font('helvetica', 'B', 11)
                pdf.multi_cell(180, 7, line[4:])
            elif line.startswith('|'):
                if 'Purpose' in line or '---' in line: continue
                cells = [c.strip().replace('**', '') for c in line.split('|') if c.strip()]
                if len(cells) >= 2:
                    pdf.set_font('helvetica', 'B', 10)
                    pdf.write(5, f"- {cells[0]}: ")
                    pdf.set_font('helvetica', '', 10)
                    pdf.write(5, f"{cells[1]}\n")
            elif line.startswith('* ') or line.startswith('- '):
                pdf.set_font('helvetica', '', 10)
                clean_text = re.sub(r'\*\*|\*', '', line[2:])
                pdf.multi_cell(180, 6, f"- {clean_text}")
            elif line.startswith('---'):
                pdf.ln(2)
                pdf.line(10, pdf.get_y(), 190, pdf.get_y())
                pdf.ln(2)
            else:
                pdf.set_font('helvetica', '', 10)
                pdf.multi_cell(180, 6, re.sub(r'\*\*|\*', '', line))
        except Exception as e:
            print(f"Skipping line due to error: {e}")

    pdf.output("ATS_Resume_Analyzer_Docs.pdf")
    print("PDF generated successfully!")

if __name__ == "__main__":
    generate_pdf()
