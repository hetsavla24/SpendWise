import dash
import dash_bootstrap_components as dbc
from data_processing import load_data
from layout import serve_layout
import sys

# Load data
df = load_data("Csv/Merge_Proccessed.csv")
if df is None:
    print("Failed to load data. Exiting.")
    sys.exit(1)

# Initialize the Dash app with Bootstrap
external_stylesheets = [dbc.themes.BOOTSTRAP]
app = dash.Dash(__name__, external_stylesheets=external_stylesheets)
app.layout = serve_layout(df)

# Import and register callbacks after app and df are defined
from callbacks import register_callbacks
register_callbacks(app, df)

if __name__ == '__main__':
    app.run_server(debug=True, port=8060)
