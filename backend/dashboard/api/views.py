from rest_framework.views import APIView
from rest_framework.response import Response
import pandas as pd
from datetime import datetime
from collections import defaultdict
from rest_framework.decorators import api_view
from rest_framework import status
from vapi_python import Vapi
import os
import json
import logging

logger = logging.getLogger(__name__)

class DashboardAnalyticsView(APIView):
    def get(self, request):
        try:
            # Get date parameters
            start_date = request.query_params.get('start_date')
            end_date = request.query_params.get('end_date')

            # Read the CSV file
            df = pd.read_csv('csvs/Merge_Proccessed.csv')
            df['Transaction_Date'] = pd.to_datetime(df['Transaction_Date'])

            # Filter data based on date range if provided
            if start_date and end_date:
                start_date = pd.to_datetime(start_date)
                end_date = pd.to_datetime(end_date)
                df = df[(df['Transaction_Date'] >= start_date) & (df['Transaction_Date'] <= end_date)]

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

            # Calculate savings goal based on filtered data
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

# Voice Assistant Configuration
VAPI_API_KEY = "969d188d-61d3-4284-a13b-9c2ec4cc3294"
VAPI_ASSISTANT_ID = "2bb33599-178f-4be1-96bf-afd74aa0e0e0"

vapi_instance = None

@api_view(['POST'])
def start_voice_assistant(request):
    global vapi_instance
    try:
        logger.info("Starting voice assistant...")
        
        # Reset the instance if it exists to ensure a fresh start
        if vapi_instance:
            try:
                vapi_instance.stop()
            except:
                pass
            vapi_instance = None
            
        # Create new instance
        vapi_instance = Vapi(api_key=VAPI_API_KEY)
        logger.info("Created new Vapi instance")
        
        # Configure callbacks
        def on_speech_start():
            logger.info("Speech started")
            
        def on_speech_end():
            logger.info("Speech ended")
            
        def on_transcription(text):
            logger.info(f"Transcription: {text}")
            
        def on_response(response):
            logger.info(f"Assistant response: {response}")
            
        vapi_instance.on_speech_start = on_speech_start
        vapi_instance.on_speech_end = on_speech_end
        vapi_instance.on_transcription = on_transcription
        vapi_instance.on_response = on_response
        
        logger.info("Starting Vapi with assistant ID...")
        vapi_instance.start(assistant_id=VAPI_ASSISTANT_ID)
        logger.info("Vapi started successfully")
        
        return Response({'status': 'started'}, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Error starting voice assistant: {str(e)}", exc_info=True)
        return Response({
            'error': str(e),
            'detail': 'Failed to start voice assistant. Please check the API key and assistant ID.'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def stop_voice_assistant(request):
    global vapi_instance
    try:
        if vapi_instance:
            logger.info("Stopping voice assistant...")
            response = vapi_instance.stop()
            logger.info("Voice assistant stopped successfully")
            return Response({
                'status': 'stopped',
                'transcription': response.get('transcription', ''),
                'response': response.get('response', '')
            }, status=status.HTTP_200_OK)
        logger.warning("Attempted to stop non-initialized voice assistant")
        return Response({'error': 'Voice assistant not initialized'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"Error stopping voice assistant: {str(e)}", exc_info=True)
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_voice_status(request):
    global vapi_instance
    try:
        if vapi_instance:
            is_active = vapi_instance.is_active if hasattr(vapi_instance, 'is_active') else False
            return Response({'is_active': is_active}, status=status.HTTP_200_OK)
        return Response({'is_active': False}, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Error getting voice status: {str(e)}", exc_info=True)
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
