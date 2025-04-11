def register_callbacks(app, df):
    from dash import Input, Output, State
    import plotly.express as px
    from helpers import generate_summary, create_bar_chart, summary_box

    # --- Callback for Summary Boxes (common to both tabs) ---
    @app.callback(
        Output('summary-boxes', 'children'),
        [Input('date-picker-range', 'start_date'),
         Input('date-picker-range', 'end_date')]
    )
    def update_summary_boxes(start_date, end_date):
        try:
            df_filtered = df[(df['Transaction_Date'] >= start_date) & (df['Transaction_Date'] <= end_date)]
            income = df_filtered['Credit'].sum()
            expenditure = df_filtered['Debit'].sum()
            balance = income - expenditure
            total_tx = len(df_filtered)
            boxes = [
                summary_box("Income", f"₹{income:,.2f}", bg_color='#d4edda', text_color='#155724'),
                summary_box("Expenditure", f"₹{expenditure:,.2f}", bg_color='#f8d7da', text_color='#721c24'),
                summary_box("Balance", f"₹{balance:,.2f}", bg_color='#d1ecf1', text_color='#0c5460'),
                summary_box("Total Transactions", total_tx, bg_color='#fff3cd', text_color='#856404')
            ]
            return boxes
        except Exception as e:
            print(f"Error in update_summary_boxes: {e}")
            return []

    # --- Callbacks for General Analysis Tab ---
    @app.callback(
        [Output('freq-bar', 'figure'),
         Output('top-transactions', 'figure'),
         Output('amount-pie', 'figure'),
         Output('date-trend', 'figure'),
         Output('store-freq-bar', 'data'),
         Output('store-top-transactions', 'data'),
         Output('store-amount-pie', 'data'),
         Output('store-date-trend', 'data')],
        [Input('date-picker-range', 'start_date'),
         Input('date-picker-range', 'end_date')]
    )
    def update_general_analysis(start_date, end_date):
        try:
            df_filtered = df[(df['Transaction_Date'] >= start_date) & (df['Transaction_Date'] <= end_date)].copy()
        except Exception as e:
            print(f"Error filtering data in general analysis: {e}")
            return {}, {}, {}, {}, None, None, None, None
        
        # Create Transaction_Key: use Recipient_Name if available; otherwise, Transaction_ID
        try:
            if 'Recipient_Name' in df_filtered.columns:
                df_filtered['Transaction_Key'] = df_filtered['Recipient_Name']
            else:
                df_filtered['Transaction_Key'] = df_filtered['Transaction_ID']
        except Exception as e:
            print(f"Error creating Transaction_Key: {e}")
            df_filtered['Transaction_Key'] = df_filtered['Transaction_ID']
        
        # Frequency Distribution
        try:
            transaction_counts = df_filtered['Transaction_Key'].value_counts()
            frequency_groups = {
                '1 Transaction': sum(transaction_counts == 1),
                '1-5 Transactions': sum((transaction_counts > 1) & (transaction_counts <= 5)),
                '5-10 Transactions': sum((transaction_counts > 5) & (transaction_counts <= 10)),
                '10-35 Transactions': sum((transaction_counts > 10) & (transaction_counts <= 35)),
                '35-50 Transactions': sum((transaction_counts > 35) & (transaction_counts <= 50)),
                'More than 50': sum(transaction_counts > 50)
            }
            freq_fig = px.bar(
                x=list(frequency_groups.keys()),
                y=list(frequency_groups.values()),
                labels={'x': "Transaction Frequency", 'y': "Count"},
                title="Transaction Frequency Distribution"
            )
        except Exception as e:
            print(f"Error creating frequency distribution chart: {e}")
            freq_fig = {}
        
        # Top 10 Frequent Transactions
        try:
            top_transactions = transaction_counts.head(10)
            top_fig = px.bar(
                x=top_transactions.values,
                y=top_transactions.index,
                orientation='h',
                labels={'x': "Transaction Count", 'y': "Transaction Key"},
                title="Top 10 Frequent Transactions"
            )
        except Exception as e:
            print(f"Error creating top transactions chart: {e}")
            top_fig = {}
        
        # Transaction Amount Distribution (based on Debit amounts)
        try:
            transaction_ranges = {
                '0-50': sum(df_filtered['Debit'] <= 50),
                '50-100': sum((df_filtered['Debit'] > 50) & (df_filtered['Debit'] <= 100)),
                '100-500': sum((df_filtered['Debit'] > 100) & (df_filtered['Debit'] <= 500)),
                '500-1000': sum((df_filtered['Debit'] > 500) & (df_filtered['Debit'] <= 1000)),
                '1000-5000': sum((df_filtered['Debit'] > 1000) & (df_filtered['Debit'] <= 5000)),
                '5000-10000': sum((df_filtered['Debit'] > 5000) & (df_filtered['Debit'] <= 10000)),
                '10000+': sum(df_filtered['Debit'] > 10000)
            }
            amount_pie = px.pie(
                names=list(transaction_ranges.keys()),
                values=list(transaction_ranges.values()),
                title="Transaction Amount Distribution"
            )
        except Exception as e:
            print(f"Error creating amount distribution chart: {e}")
            amount_pie = {}
        
        # Date-wise Transaction Trends
        try:
            date_trend_df = df_filtered.groupby('Transaction_Date')['Debit'].sum().reset_index()
            trend_fig = px.line(
                date_trend_df,
                x="Transaction_Date",
                y="Debit",
                title="Transaction Trends Over Time",
                labels={'Transaction_Date': "Date", 'Debit': "Total Amount"}
            )
        except Exception as e:
            print(f"Error creating date trend chart: {e}")
            trend_fig = {}
        
        return freq_fig, top_fig, amount_pie, trend_fig, freq_fig, top_fig, amount_pie, trend_fig

    # --- Callbacks for Breakdown Analysis Tab ---
    @app.callback(
        Output('month-dropdown', 'options'),
        Input('year-dropdown', 'value')
    )
    def update_month_dropdown(selected_year):
        if not selected_year:
            return []
        try:
            months = df[df['Year'] == selected_year][['Month_Num', 'Month']].drop_duplicates()
            return [{'label': row['Month'], 'value': row['Month_Num']} for _, row in months.iterrows()]
        except Exception as e:
            print(f"Error updating month dropdown: {e}")
            return []

    @app.callback(
        Output('week-dropdown', 'options'),
        [Input('year-dropdown', 'value'),
         Input('month-dropdown', 'value')]
    )
    def update_week_dropdown(selected_year, selected_month):
        if not selected_year or not selected_month:
            return []
        try:
            weeks = df[(df['Year'] == selected_year) & (df['Month_Num'] == selected_month)][['Week_Num']].drop_duplicates()
            return [{'label': f'Week {w}', 'value': w} for w in sorted(weeks['Week_Num'])]
        except Exception as e:
            print(f"Error updating week dropdown: {e}")
            return []

    @app.callback(
        [Output('yearly-summary', 'figure'),
         Output('store-yearly-summary', 'data')],
        Input('year-dropdown', 'value')
    )
    def update_yearly_summary(selected_year):
        if not selected_year:
            return {}, {}
        try:
            df_filtered = df[df['Year'] == selected_year]
            df_summary = generate_summary(df_filtered, 'Month')
            fig = create_bar_chart(df_summary, 'Month', f'Year {selected_year} Summary')
            return fig, fig
        except Exception as e:
            print(f"Error in yearly summary: {e}")
            return {}, {}

    @app.callback(
        [Output('monthly-summary', 'figure'),
         Output('store-monthly-summary', 'data')],
        [Input('year-dropdown', 'value'),
         Input('month-dropdown', 'value')]
    )
    def update_monthly_summary(selected_year, selected_month):
        if not selected_year or not selected_month:
            return {}, {}
        try:
            df_filtered = df[(df['Year'] == selected_year) & (df['Month_Num'] == selected_month)]
            df_summary = generate_summary(df_filtered, 'Week_Num')
            if df_summary is not None:
                df_summary['Week_Num'] = df_summary['Week_Num'].apply(lambda x: f'Week {x}')
                fig = create_bar_chart(df_summary, 'Week_Num', f'{df_filtered["Month"].iloc[0]} Summary')
                return fig, fig
            else:
                return {}, {}
        except Exception as e:
            print(f"Error in monthly summary: {e}")
            return {}, {}

    @app.callback(
        [Output('weekly-summary', 'figure'),
         Output('store-weekly-summary', 'data')],
        [Input('year-dropdown', 'value'),
         Input('month-dropdown', 'value'),
         Input('week-dropdown', 'value')]
    )
    def update_weekly_summary(selected_year, selected_month, selected_week):
        if not selected_year or not selected_month or not selected_week:
            return {}, {}
        try:
            df_filtered = df[
                (df['Year'] == selected_year) &
                (df['Month_Num'] == selected_month) &
                (df['Week_Num'] == selected_week)
            ]
            df_summary = generate_summary(df_filtered, 'Day')
            fig = create_bar_chart(df_summary, 'Day', f'Week {selected_week} Summary')
            return fig, fig
        except Exception as e:
            print(f"Error in weekly summary: {e}")
            return {}, {}

    @app.callback(
        [Output('daily-summary', 'figure'),
         Output('store-daily-summary', 'data')],
        [Input('year-dropdown', 'value'),
         Input('month-dropdown', 'value'),
         Input('week-dropdown', 'value')]
    )
    def update_daily_summary(selected_year, selected_month, selected_week):
        if not selected_year or not selected_month or not selected_week:
            return {}, {}
        try:
            df_filtered = df[
                (df['Year'] == selected_year) &
                (df['Month_Num'] == selected_month) &
                (df['Week_Num'] == selected_week)
            ]
            df_summary = generate_summary(df_filtered, 'Day')
            fig = create_bar_chart(df_summary, 'Day', f'Daily Summary for Week {selected_week}')
            return fig, fig
        except Exception as e:
            print(f"Error in daily summary: {e}")
            return {}, {}

    # --- Callbacks to Toggle Modals (General Analysis & Breakdown Analysis) ---
    @app.callback(
        Output("modal-freq", "is_open"),
        [Input("btn-expand-freq", "n_clicks"), Input("close-modal-freq", "n_clicks")],
        [State("modal-freq", "is_open")]
    )
    def toggle_modal_freq(expand, close, is_open):
        try:
            if expand or close:
                return not is_open
            return is_open
        except Exception as e:
            print(f"Error toggling modal-freq: {e}")
            return is_open

    @app.callback(
        Output("modal-top", "is_open"),
        [Input("btn-expand-top", "n_clicks"), Input("close-modal-top", "n_clicks")],
        [State("modal-top", "is_open")]
    )
    def toggle_modal_top(expand, close, is_open):
        try:
            if expand or close:
                return not is_open
            return is_open
        except Exception as e:
            print(f"Error toggling modal-top: {e}")
            return is_open

    @app.callback(
        Output("modal-amount", "is_open"),
        [Input("btn-expand-amount", "n_clicks"), Input("close-modal-amount", "n_clicks")],
        [State("modal-amount", "is_open")]
    )
    def toggle_modal_amount(expand, close, is_open):
        try:
            if expand or close:
                return not is_open
            return is_open
        except Exception as e:
            print(f"Error toggling modal-amount: {e}")
            return is_open

    @app.callback(
        Output("modal-trend", "is_open"),
        [Input("btn-expand-trend", "n_clicks"), Input("close-modal-trend", "n_clicks")],
        [State("modal-trend", "is_open")]
    )
    def toggle_modal_trend(expand, close, is_open):
        try:
            if expand or close:
                return not is_open
            return is_open
        except Exception as e:
            print(f"Error toggling modal-trend: {e}")
            return is_open

    @app.callback(
        Output("modal-yearly", "is_open"),
        [Input("btn-expand-yearly", "n_clicks"), Input("close-modal-yearly", "n_clicks")],
        [State("modal-yearly", "is_open")]
    )
    def toggle_modal_yearly(expand, close, is_open):
        try:
            if expand or close:
                return not is_open
            return is_open
        except Exception as e:
            print(f"Error toggling modal-yearly: {e}")
            return is_open

    @app.callback(
        Output("modal-monthly", "is_open"),
        [Input("btn-expand-monthly", "n_clicks"), Input("close-modal-monthly", "n_clicks")],
        [State("modal-monthly", "is_open")]
    )
    def toggle_modal_monthly(expand, close, is_open):
        try:
            if expand or close:
                return not is_open
            return is_open
        except Exception as e:
            print(f"Error toggling modal-monthly: {e}")
            return is_open

    @app.callback(
        Output("modal-weekly", "is_open"),
        [Input("btn-expand-weekly", "n_clicks"), Input("close-modal-weekly", "n_clicks")],
        [State("modal-weekly", "is_open")]
    )
    def toggle_modal_weekly(expand, close, is_open):
        try:
            if expand or close:
                return not is_open
            return is_open
        except Exception as e:
            print(f"Error toggling modal-weekly: {e}")
            return is_open

    @app.callback(
        Output("modal-daily", "is_open"),
        [Input("btn-expand-daily", "n_clicks"), Input("close-modal-daily", "n_clicks")],
        [State("modal-daily", "is_open")]
    )
    def toggle_modal_daily(expand, close, is_open):
        try:
            if expand or close:
                return not is_open
            return is_open
        except Exception as e:
            print(f"Error toggling modal-daily: {e}")
            return is_open

    # --- Callbacks to Update Modal Graphs (General & Breakdown) ---
    @app.callback(
        Output("modal-freq-bar", "figure"),
        Input("store-freq-bar", "data")
    )
    def update_modal_freq_bar(store_data):
        return store_data

    @app.callback(
        Output("modal-top-transactions", "figure"),
        Input("store-top-transactions", "data")
    )
    def update_modal_top(store_data):
        return store_data

    @app.callback(
        Output("modal-amount-pie", "figure"),
        Input("store-amount-pie", "data")
    )
    def update_modal_amount(store_data):
        return store_data

    @app.callback(
        Output("modal-date-trend", "figure"),
        Input("store-date-trend", "data")
    )
    def update_modal_trend(store_data):
        return store_data

    @app.callback(
        Output("modal-yearly-summary", "figure"),
        Input("store-yearly-summary", "data")
    )
    def update_modal_yearly_summary(store_data):
        return store_data

    @app.callback(
        Output("modal-monthly-summary", "figure"),
        Input("store-monthly-summary", "data")
    )
    def update_modal_monthly_summary(store_data):
        return store_data

    @app.callback(
        Output("modal-weekly-summary", "figure"),
        Input("store-weekly-summary", "data")
    )
    def update_modal_weekly_summary(store_data):
        return store_data

    @app.callback(
        Output("modal-daily-summary", "figure"),
        Input("store-daily-summary", "data")
    )
    def update_modal_daily_summary(store_data):
        return store_data
