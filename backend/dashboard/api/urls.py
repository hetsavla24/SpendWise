from django.urls import path
from .views import (
    DashboardAnalyticsView,
    start_voice_assistant,
    stop_voice_assistant,
    get_voice_status,
)

urlpatterns = [
    path('analytics/', DashboardAnalyticsView.as_view(), name='dashboard-analytics'),
    path('voice/start/', start_voice_assistant, name='start-voice-assistant'),
    path('voice/stop/', stop_voice_assistant, name='stop-voice-assistant'),
    path('voice/status/', get_voice_status, name='voice-status'),
]
