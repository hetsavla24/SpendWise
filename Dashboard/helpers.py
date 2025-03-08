import plotly.express as px
from dash import html
import pandas as pd

def generate_summary(df_filtered, group_col):
    """
    Group and summarize data based on a given column.
    Returns a DataFrame with Debit, Credit, recalculated Balance, and Total_Transactions.
    """
    try:
        required_columns = ['Debit', 'Credit', 'Balance']
        for col in required_columns:
            if col not in df_filtered.columns:
                raise ValueError(f"Column '{col}' does not exist in the DataFrame")
                
        df_grouped = df_filtered.groupby(group_col).agg({
            'Debit': 'sum',
            'Credit': 'sum',
            'Balance': 'last'
        }).reset_index()
        transaction_counts = df_filtered.groupby(group_col).size().reset_index(name='Total_Transactions')
        df_summary = df_grouped.merge(transaction_counts, on=group_col)
        # Recalculate Balance as (Credit - Debit)
        df_summary['Balance'] = df_summary['Credit'] - df_summary['Debit']
        return df_summary
    except Exception as e:
        print(f"Error in generate_summary: {e}")
        return None

def create_bar_chart(df_summary, x_col, title):
    """
    Create a grouped bar chart comparing Debit and Credit.
    """
    try:
        if x_col not in df_summary.columns:
            raise ValueError(f"Column '{x_col}' does not exist in the DataFrame")
        
        fig = px.bar(
            df_summary, 
            x=x_col, 
            y=['Debit', 'Credit'], 
            text_auto='.2s',
            labels={'value': 'Amount', 'variable': 'Type'},
            barmode='group',
            color_discrete_map={'Debit': 'lightcoral', 'Credit': 'lightblue'},
            hover_data=['Total_Transactions', 'Balance']
        )
        fig.update_layout(
            title=title,
            xaxis_title=x_col,
            yaxis_title='Amount',
            plot_bgcolor='whitesmoke'
        )
        return fig
    except Exception as e:
        print(f"Error in create_bar_chart: {e}")
        return {}

def summary_box(title, value, bg_color, text_color):
    """
    Create a styled summary box as a Dash HTML component.
    """
    return html.Div([
        html.H4(title, style={'fontFamily': 'Arial', 'color': text_color}),
        html.P(value, style={'fontSize': '28px', 'fontWeight': 'bold', 'color': text_color, 'margin': '0'})
    ], style={
        'padding': '20px',
        'margin': '5px',
        'backgroundColor': bg_color,
        'borderRadius': '10px',
        'textAlign': 'center',
        'flex': '1',
        'boxShadow': '2px 2px 2px lightgrey'
    })
