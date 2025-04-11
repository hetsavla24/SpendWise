from rest_framework import serializers

class DashboardDataSerializer(serializers.Serializer):
    summary = serializers.DictField()
    monthly_analysis = serializers.ListField()
    category_analysis = serializers.ListField()
    recent_transactions = serializers.ListField()
    savings_goal = serializers.DictField()
