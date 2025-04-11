# category_tab.py
import pandas as pd
import plotly.express as px
from dash import dcc, html

def load_category_data():
    """
    Load and preprocess the categorized transactions data.
    """
    try:
        df_cat = pd.read_csv("Csv/Categorized_Transactions.csv")
        df_cat['Transaction_Date'# Step 1: Import Libraries
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import LabelEncoder, RobustScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.feature_selection import RFE
…] = pd.to_datetime(df_cat['Transaction_Date'], errors='coerce')
        df_cat['Month'] = df_cat['Transaction_Date'].dt.strftime('%B')
        # Assume Debit represents spending; fill missing with zero.
        df_cat['Amount_Spent'] = df_cat['Debit'].fillna(0)
        return df_cat
    except Exception as e:
        print(f"Error loading category data: {e}")
        return None

def serve_category_tab():
    """
    Returns the layout for the Category Specification tab.
    """
    df_cat = load_category_data()
    if df_cat is None:
        return html.Div("Error loading category data.")

    # Prepare grouped summaries
    category_summary = df_cat.groupby("Transaction_Category")["Amount_Spent"].sum().reset_index()
    subcategory_summary = df_cat.groupby(["Transaction_Category", "Sub_Category"])["Amount_Spent"].sum().reset_index()
    monthly_summary = df_cat.groupby("Month")["Amount_Spent"].sum().reset_index()

    layout = html.Div([
        html.H2("Category Specification", style={'textAlign': 'center', 'color': '#333'}),
        dcc.Graph(
            id='category-pie-chart',
            figure=px.pie(category_summary,
                          values='Amount_Spent',
                          names='Transaction_Category', 
                          title="Category-wise Spending Breakdown",
                          color_discrete_sequence=px.colors.qualitative.Pastel)
        ),
        dcc.Graph(
            id='subcategory-bar-chart',
            figure=px.bar(subcategory_summary,
                          x='Sub_Category',
                          y='Amount_Spent',
                          title="Subcategory-wise Breakdown",
                          color='Transaction_Category',
                          color_discrete_sequence=px.colors.qualitative.Safe)
        ),
        dcc.Graph(
            id='monthly-trend-chart',
            figure=px.line(monthly_summary,
                           x='Month',
                           y='Amount_Spent',
                           markers=True, 
                           title="Monthly Spending Trend",
                           line_shape='spline',
                           color_discrete_sequence=['#2E91E5'])
        )
    ])
    return layout
