"""
AGRI-SHARE — Complete UI Showcase PDF Generator
Generates a comprehensive, exhibition-ready PDF of the entire user interface.
"""
import os
import sys
import subprocess
import time
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
import fitz  # PyMuPDF

WORKSPACE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_PDF = os.path.join(WORKSPACE_DIR, "AGRI_SHARE_Complete_UI_Showcase.pdf")
TEMP_DIR = os.path.join(WORKSPACE_DIR, "temp_pdf_pages")
os.makedirs(TEMP_DIR, exist_ok=True)

CHROME_BIN = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
if not os.path.exists(CHROME_BIN):
    CHROME_BIN = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

print(f"Using browser binary: {CHROME_BIN}")

def create_cover_page(filepath):
    """Creates a prestigious cover page for the Science Exhibition PDF."""
    c = canvas.Canvas(filepath, pagesize=letter)
    width, height = letter # 612 x 792

    # Background gradient block (Dark Emerald Green)
    c.setFillColor(colors.HexColor("#0F291E"))
    c.rect(0, 0, width, height, fill=True, stroke=False)

    # Top decorative golden accent bar
    c.setFillColor(colors.HexColor("#EAB308"))
    c.rect(0, height - 12, width, 12, fill=True, stroke=False)

    # Decorative inner framed border
    c.setStrokeColor(colors.HexColor("#22C55E"))
    c.setLineWidth(1.5)
    c.rect(24, 24, width - 48, height - 48, fill=False, stroke=True)

    c.setStrokeColor(colors.HexColor("#CA8A04"))
    c.setLineWidth(0.75)
    c.rect(28, 28, width - 56, height - 56, fill=False, stroke=True)

    # School Logo
    logo_path = os.path.join(WORKSPACE_DIR, "assets", "school_logo.png")
    if os.path.exists(logo_path):
        # White circular backing for logo
        c.setFillColor(colors.white)
        c.circle(width / 2, height - 125, 48, fill=True, stroke=False)
        c.setStrokeColor(colors.HexColor("#EAB308"))
        c.setLineWidth(2)
        c.circle(width / 2, height - 125, 48, fill=False, stroke=True)
        c.drawImage(logo_path, width / 2 - 40, height - 125 - 40, width=80, height=80, mask='auto')

    # Trust Title
    c.setFillColor(colors.HexColor("#FDE047"))
    c.setFont("Helvetica-Bold", 10)
    c.drawCentredString(width / 2, height - 195, "P. K. KRISHNAN EDUCATIONAL TRUST'S")

    # School Name
    c.setFillColor(colors.white)
    c.setFont("Helvetica-Bold", 18)
    c.drawCentredString(width / 2, height - 220, "SHREE SIDDHI VINAYAGAR ENGLISH HIGH SCHOOL")

    # Event Badge
    c.setFillColor(colors.HexColor("#86EFAC"))
    c.setFont("Helvetica-Bold", 12)
    c.drawCentredString(width / 2, height - 245, "🔬 SCHOOL SCIENCE EXHIBITION 2026 SHOWCASE")

    # Separator Line
    c.setStrokeColor(colors.HexColor("#334155"))
    c.setLineWidth(1)
    c.line(50, height - 262, width - 50, height - 262)

    # Main Project Title Box
    c.setFillColor(colors.HexColor("#166534"))
    c.roundRect(50, height - 375, width - 100, 95, 8, fill=True, stroke=False)
    c.setStrokeColor(colors.HexColor("#4ADE80"))
    c.setLineWidth(1.5)
    c.roundRect(50, height - 375, width - 100, 95, 8, fill=False, stroke=True)

    c.setFillColor(colors.HexColor("#FEF08A"))
    c.setFont("Helvetica-Bold", 26)
    c.drawCentredString(width / 2, height - 315, "AGRI-SHARE")

    c.setFillColor(colors.white)
    c.setFont("Helvetica", 12)
    c.drawCentredString(width / 2, height - 340, "A Smart Agricultural Equipment Sharing Platform")

    c.setFillColor(colors.HexColor("#BBF7D0"))
    c.setFont("Helvetica-Oblique", 9.5)
    c.drawCentredString(width / 2, height - 360, "Share Equipment • Reduce Farming Costs • Empower Rural Communities")

    # Document Purpose
    c.setFillColor(colors.HexColor("#E2E8F0"))
    c.setFont("Helvetica-Bold", 13)
    c.drawString(60, height - 410, "📑 COMPLETE USER INTERFACE & ARCHITECTURE SHOWCASE")

    # Table of Contents / Index Box
    c.setFillColor(colors.HexColor("#091710"))
    c.roundRect(50, height - 640, width - 100, 215, 6, fill=True, stroke=False)
    c.setStrokeColor(colors.HexColor("#1E3A2B"))
    c.setLineWidth(1)
    c.roundRect(50, height - 640, width - 100, 215, 6, fill=False, stroke=True)

    c.setFillColor(colors.HexColor("#4ADE80"))
    c.setFont("Helvetica-Bold", 11)
    c.drawString(65, height - 440, "COMPLETE UI PROTOTYPE INDEX:")

    sections = [
        ("01", "SSVEHS Animated Intro & Showcase Launch Loader", "School Logo & Launch"),
        ("02", "Home Page — Agritech Ecosystem & Value Propositions", "Hero, Highlights, Metrics"),
        ("03", "Find Agricultural Equipment — Smart Village Machinery Search", "Google Form Dual-Sync"),
        ("04", "List Your Equipment — Rural Machinery Registry", "Real Sheets Master DB"),
        ("05", "Available Machinery Database — Live Equipment Catalog", "Equipment Catalog Grid"),
        ("06", "Financial Cost Calculator — Capital Lockup & Savings Meter", "80% Cost Reduction Analysis"),
        ("07", "Crop Calendar — Seasonal Sowing & Harvesting Timetable", "Equipment Matrix"),
        ("08", "About AGRI-SHARE — Methodology, School & Exhibition Guide", "Student Innovation Model"),
        ("09", "Role Portals & Management Dashboards", "Owner & Farmer Consoles"),
        ("10", "Google Cloud Integration & Central Spreadsheet Settings", "Database Schema & Sync")
    ]

    y_pos = height - 462
    for num, title, note in sections:
        c.setFillColor(colors.HexColor("#EAB308"))
        c.setFont("Helvetica-Bold", 9)
        c.drawString(65, y_pos, f"[{num}]")

        c.setFillColor(colors.white)
        c.setFont("Helvetica", 9)
        c.drawString(95, y_pos, title)

        c.setFillColor(colors.HexColor("#94A3B8"))
        c.setFont("Helvetica-Oblique", 8)
        c.drawRightString(width - 65, y_pos, note)
        y_pos -= 17.5

    # Footer Metadata
    c.setFillColor(colors.HexColor("#14532D"))
    c.rect(50, 42, width - 100, 32, fill=True, stroke=False)

    c.setFillColor(colors.white)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(65, 55, "Viksit Bharat 2047 🇮🇳 | Digital Public Infrastructure for Smallholder Farmers")

    c.setFillColor(colors.HexColor("#FEF08A"))
    c.setFont("Helvetica", 8)
    c.drawRightString(width - 65, 55, "Exhibition Date: October 2026")

    c.save()
    print("Cover page generated successfully.")

def capture_url_to_pdf(url, output_pdf, wait_seconds=3):
    """Uses Chrome headless to render and export any URL to a vector PDF."""
    abs_output = os.path.abspath(output_pdf)
    cmd = [
        CHROME_BIN,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--no-pdf-header-footer",
        "--run-all-compositor-stages-before-draw",
        f"--virtual-time-budget={int(wait_seconds * 1000)}",
        "--window-size=1280,1800",
        f"--print-to-pdf={abs_output}",
        url
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if os.path.exists(abs_output) and os.path.getsize(abs_output) > 1000:
        return True
    return False

def build_full_pdf():
    print("Step 1: Generating prestigious Cover Page...")
    cover_pdf = os.path.join(TEMP_DIR, "00_cover.pdf")
    create_cover_page(cover_pdf)

    pages_to_capture = [
        ("01_intro_loader.pdf", "http://localhost:8000/", 1),
        ("02_home.pdf", "http://localhost:8000/?noloader=1#home", 3),
        ("03_find.pdf", "http://localhost:8000/?noloader=1#find", 3),
        ("04_list.pdf", "http://localhost:8000/?noloader=1#list", 3),
        ("05_available.pdf", "http://localhost:8000/?noloader=1#available", 3),
        ("06_calculator.pdf", "http://localhost:8000/?noloader=1#calculator", 3),
        ("07_calendar.pdf", "http://localhost:8000/?noloader=1#calendar", 3),
        ("08_about.pdf", "http://localhost:8000/?noloader=1#about", 3),
        ("09_owner_dashboard.pdf", "http://localhost:8000/?noloader=1#owner-dashboard", 3),
        ("10_farmer_dashboard.pdf", "http://localhost:8000/?noloader=1#farmer-dashboard", 3),
        ("11_config_modal.pdf", "http://localhost:8000/?noloader=1#config-modal", 3),
    ]

    captured_files = [cover_pdf]

    for filename, url, wait_sec in pages_to_capture:
        dest_pdf = os.path.join(TEMP_DIR, filename)
        print(f"Capturing: {filename} from {url}...")
        success = capture_url_to_pdf(url, dest_pdf, wait_sec)
        if success:
            print(f"  ✓ Captured {filename} ({os.path.getsize(dest_pdf)} bytes)")
            captured_files.append(dest_pdf)
        else:
            print(f"  ✗ Failed to capture {filename}")

    print("\nStep 2: Merging all pages into master PDF...")
    master_doc = fitz.open()

    for pdf_file in captured_files:
        doc = fitz.open(pdf_file)
        master_doc.insert_pdf(doc)
        doc.close()

    total_pages = len(master_doc)
    print(f"Total pages before header/footer stamping: {total_pages}")

    print("Step 3: Stamping running headers and footers with pagination...")
    # Add running header and footer to page 2 onwards (skip cover page)
    for p_idx in range(1, total_pages):
        page = master_doc[p_idx]
        rect = page.rect
        p_width, p_height = rect.width, rect.height

        # Header bar
        header_text = "AGRI-SHARE — Smart Agricultural Equipment Sharing | SSVEHS Science Exhibition 2026"
        page.insert_text(
            fitz.Point(36, 22),
            header_text,
            fontsize=8,
            color=(0.08, 0.35, 0.18), # #14532D
            fontname="helv"
        )
        # Header line
        page.draw_line(fitz.Point(36, 26), fitz.Point(p_width - 36, 26), color=(0.85, 0.90, 0.85), width=0.75)

        # Footer line
        page.draw_line(fitz.Point(36, p_height - 26), fitz.Point(p_width - 36, p_height - 26), color=(0.85, 0.90, 0.85), width=0.75)
        # Footer text
        footer_left = "Shree Siddhi Vinayagar English High School • Digital Public Infrastructure"
        footer_right = f"Page {p_idx + 1} of {total_pages}"
        page.insert_text(
            fitz.Point(36, p_height - 14),
            footer_left,
            fontsize=7.5,
            color=(0.4, 0.45, 0.4),
            fontname="helv"
        )
        page.insert_text(
            fitz.Point(p_width - 95, p_height - 14),
            footer_right,
            fontsize=7.5,
            color=(0.1, 0.45, 0.2),
            fontname="helv"
        )

    master_doc.save(OUTPUT_PDF)
    master_doc.close()

    print(f"\n Master PDF successfully generated at:\n{OUTPUT_PDF}")
    print(f"File size: {round(os.path.getsize(OUTPUT_PDF) / (1024 * 1024), 2)} MB")
    print(f"Total pages: {total_pages}")

if __name__ == "__main__":
    build_full_pdf()
