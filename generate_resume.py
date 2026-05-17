from fpdf import FPDF

class ResumePDF(FPDF):
    def header(self):
        # Name
        self.set_font('helvetica', 'B', 20)
        self.cell(0, 10, 'BOOMIKA BHUSHAN N', new_x="LMARGIN", new_y="NEXT", align='C')
        
        # Contact Info
        self.set_font('helvetica', '', 10)
        self.cell(0, 5, '+91-8088535912 | Boomikanb12@gmail.com | linkedin.com/in/Boomika-Bhushan | github.com/Bk9887', new_x="LMARGIN", new_y="NEXT", align='C')
        self.ln(3)

    def section_title(self, title):
        self.set_font('helvetica', 'B', 12)
        self.cell(0, 8, title, new_x="LMARGIN", new_y="NEXT")
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(2)

    def project_item(self, title, tech, description_list):
        self.set_font('helvetica', 'B', 11)
        self.cell(0, 5, title, new_x="LMARGIN", new_y="NEXT")
        self.set_font('helvetica', 'I', 9)
        self.cell(0, 5, f"Tech: {tech}", new_x="LMARGIN", new_y="NEXT")
        self.set_font('helvetica', '', 10)
        for item in description_list:
            clean_item = item.encode('latin-1', 'replace').decode('latin-1')
            self.multi_cell(0, 5, f"- {clean_item}", new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def edu_item(self, school, degree, year_info):
        self.set_font('helvetica', 'B', 11)
        self.cell(0, 5, degree, new_x="LMARGIN", new_y="NEXT")
        self.set_font('helvetica', '', 10)
        self.cell(0, 5, school, new_x="LMARGIN", new_y="NEXT")
        self.cell(0, 5, year_info, new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

pdf = ResumePDF()
pdf.add_page()
pdf.set_auto_page_break(auto=True, margin=15)

# Summary
pdf.section_title("SUMMARY")
pdf.set_font('helvetica', '', 10)
summary_text = ("Highly motivated 3rd-year B.E. student in Information Science at Jyothy Institute of Technology-VTU. "
                "Passionate about web development and software engineering with a strong foundation in HTML, CSS, React.js, and SQL. "
                "Looking for an opportunity to improve my skills and gain practical experience.")
pdf.multi_cell(0, 5, summary_text.encode('latin-1', 'replace').decode('latin-1'), new_x="LMARGIN", new_y="NEXT")
pdf.ln(3)

# Skills
pdf.section_title("TECHNICAL SKILLS")
pdf.set_font('helvetica', '', 10)
pdf.multi_cell(0, 6, "Languages: Java (Basics), Python (Basics)", new_x="LMARGIN", new_y="NEXT")
pdf.multi_cell(0, 6, "Web Technologies: HTML5, CSS3, Bootstrap, React.js, Node.js", new_x="LMARGIN", new_y="NEXT")
pdf.multi_cell(0, 6, "Databases: MySQL, MongoDB", new_x="LMARGIN", new_y="NEXT")
pdf.multi_cell(0, 6, "Tools: VS Code, GitHub", new_x="LMARGIN", new_y="NEXT")
pdf.ln(3)

# Projects
pdf.section_title("ACADEMIC PROJECTS")
pdf.project_item("Student Domain Guidance App", "React.js (Vite), Node.js, Express.js, MongoDB", [
    "Guidance platform with personalized academic paths and user authentication."
])
pdf.project_item("Library Management System", "HTML, CSS, Bootstrap, JavaScript, Node.js, MongoDB", [
    "Web-based system for book tracking and members with full CRUD operations."
])
pdf.project_item("ATS RESUME ANALYZER", "Node.js, Express, MongoDB, Gemini AI, React.js, PDF-Parse", [
    "Full-stack ATS using Generative AI (Gemini) for intelligent resume analysis and scoring."
])

# Education
pdf.section_title("EDUCATION")
pdf.edu_item("Jyothy Institute of Technology-VTU, Bangalore", "B.E. in Information Science", "CGPA: 8.5/10 | Expected Graduation: June 2027")
pdf.edu_item("Sri Bhagawan Mahaveer Jain College, Bangalore", "Class XII (PUC)", "Year of Passing: 2022 | Percentage: 91%")
pdf.edu_item("Carmel School, Bangalore", "Class X", "Year of Passing: 2020 | Percentage: 88%")

# Achievements
pdf.section_title("ACHIEVEMENTS and CERTIFICATES")
pdf.set_font('helvetica', 'B', 11)
pdf.cell(0, 5, "GAMETHON 7.0", new_x="LMARGIN", new_y="NEXT")
pdf.set_font('helvetica', '', 10)
pdf.multi_cell(0, 5, "Participated in Gamethon 7.0 hackathon, collaborating on an innovative gaming concept.", new_x="LMARGIN", new_y="NEXT")
pdf.ln(2)
pdf.set_font('helvetica', 'B', 11)
pdf.cell(0, 5, "HACKATHON", new_x="LMARGIN", new_y="NEXT")
pdf.set_font('helvetica', '', 10)
pdf.multi_cell(0, 5, "Actively participated in college-level hackathons, demonstrating problem-solving skills.", new_x="LMARGIN", new_y="NEXT")

pdf.output("Boomika_Bhushan_Resume.pdf")
