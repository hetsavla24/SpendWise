from rest_framework.views import APIView
from rest_framework.response import Response
import pandas as pd
from datetime import datetime
from collections import defaultdict

class DashboardAnalyticsView(APIView):
    def get(self, request):
        try:
            # Read the CSV file
            df = pd.read_csv('csvs/Merge_Proccessed.csv')
            df['Transaction_Date'] = pd.to_datetime(df['Transaction_Date'])

            # Calculate summary
            total_credit = df['Credit'].sum()
            total_debit = df['Debit'].sum()
            current_balance = total_credit - total_debit
            total_transactions = len(df)

            # Monthly analysis
            monthly_data = df.groupby(df['Transaction_Date'].dt.strftime('%b %Y')).agg({
                'Credit': 'sum',
                'Debit': 'sum'
            }).reset_index()
            
            monthly_analysis = []
            for _, row in monthly_data.iterrows():
                monthly_analysis.append({
                    'month': row['Transaction_Date'],
                    'total_credit': float(row['Credit']),
                    'total_debit': float(row['Debit'])
                })

            # Category analysis (using Transaction_Type instead)
            category_analysis = df.groupby('Transaction_Type')['Debit'].sum().reset_index()
            category_analysis = category_analysis.sort_values('Debit', ascending=False)
            category_data = category_analysis.head(5).to_dict('records')

            # Recent transactions (last 10)
            recent_transactions = []
            recent_df = df.sort_values('Transaction_Date', ascending=False).head(10)
            for _, row in recent_df.iterrows():
                recent_transactions.append({
                    'transaction_id': str(row['Transaction_ID']),
                    'transaction_date': row['Transaction_Date'].strftime('%Y-%m-%d'),
                    'recipient_name': row['Recipient_Name'],
                    'debit': float(row['Debit']),
                    'credit': float(row['Credit'])
                })

            # Calculate savings goal
            monthly_savings = []
            for _, group in df.groupby(df['Transaction_Date'].dt.strftime('%Y-%m')):
                savings = group['Credit'].sum() - group['Debit'].sum()
                if savings > 0:
                    monthly_savings.append(savings)

            avg_monthly_savings = sum(monthly_savings) / len(monthly_savings) if monthly_savings else 0
            target_savings = avg_monthly_savings * 12  # Annual target
            current_savings = current_balance
            progress = min(100, (current_savings / target_savings * 100)) if target_savings > 0 else 0

            response_data = {
                'summary': {
                    'total_transactions': total_transactions,
                    'total_credit': float(total_credit),
                    'total_debit': float(total_debit),
                    'current_balance': float(current_balance),
                },
                'monthly_analysis': monthly_analysis,
                'category_analysis': category_data,
                'recent_transactions': recent_transactions,
                'savings_goal': {
                    'current': float(current_savings),
                    'target': float(target_savings),
                    'progress': float(progress)
                }
            }

            return Response(response_data)
        except Exception as e:
            print(f"Error: {str(e)}")  # Add this line for debugging
            return Response({'error': str(e)}, status=500)
