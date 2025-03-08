import pandas as pd

def load_data(file_path):
    """
    Loads the bank statement CSV and preprocesses the data.
    
    Returns:
        df (DataFrame): Preprocessed DataFrame or None if an error occurs.
    """
    try:
        df = pd.read_csv(file_path)
    except FileNotFoundError:
        print(f"Error: File {file_path} not found.")
        return None
    except Exception as e:
        print(f"Error loading CSV: {e}")
        return None

    try:
        # Convert Transaction_Date to datetime and create extra columns
        df['Transaction_Date'] = pd.to_datetime(df['Transaction_Date'])
        df['Year'] = df['Transaction_Date'].dt.year
        df['Month_Num'] = df['Transaction_Date'].dt.month
        df['Month'] = df['Transaction_Date'].dt.strftime('%B')  # e.g., January, February
        df['Week_Num'] = df['Transaction_Date'].dt.strftime('%U').astype(int) + 1  # Week number starting at 1
        df['Day'] = df['Transaction_Date'].dt.date
    except Exception as e:
        print(f"Error processing date columns: {e}")
        return None

    return df
