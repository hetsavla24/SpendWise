# voice.py
import streamlit as st
from vapi_python import Vapi
import os
from dotenv import load_dotenv
load_dotenv()

API_KEY = os.getenv("API_KEY")
ASSISTANT_ID = os.getenv("ASSISTANT_ID")

# Streamlit Page Setup
st.set_page_config(page_title="SpendWise Voice Assistant", page_icon="🎙️")
st.title("🎙️ Talk to Your SpendWise Finance Assistant")

st.markdown("""
Welcome to SpendWise's Voice Assistant! Click **Start** to begin the conversation and **Stop** when you're done.

You can ask about:
- Your monthly spending patterns
- Budgeting tips
- Where you spent the most this month
""")

# Initialize Vapi client only once
if "vapi" not in st.session_state:
    st.session_state.vapi = Vapi(api_key=API_KEY)
    st.session_state.started = False

# START Button
if st.button("▶️ Start Talking"):
    try:
        st.session_state.vapi.start(assistant_id=ASSISTANT_ID)
        st.session_state.started = True
        st.success("Assistant is listening... Speak now! 🎧")
    except Exception as e:
        st.error(f"Failed to start assistant: {e}")

# STOP Button
if st.button("⏹️ Stop Talking"):
    if st.session_state.started:
        try:
            st.session_state.vapi.stop()
            st.session_state.started = False
            st.info("Assistant has stopped listening.")
        except Exception as e:
            st.error(f"Failed to stop assistant: {e}")
    else:
        st.warning("Assistant is not currently running.")
