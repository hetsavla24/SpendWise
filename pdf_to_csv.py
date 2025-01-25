import pdfplumber
import pandas as pd

def pdf_to_csv(pdf_path, password, csv_path):
    # Read PDF file
    pdf = pdfplumber.open(pdf_path, password=password)

    df = pd.DataFrame()

    for i in range(len(pdf.pages)):
        table = pdf.pages[i].extract_table()
        local_df = pd.DataFrame(table[1:], columns=table[0])
        df = pd.concat([df, local_df], ignore_index=True)

    # Save to CSV
    df.to_csv(csv_path, index=False)