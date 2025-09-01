import google.generativeai as genai

genai.configure(api_key="AIzaSyAZ8Ov7mF1HCp57e3plsrxpWYo1ANUYpWI")
model = genai.GenerativeModel("gemini-2.5-flash")

def generate_manifesto(party_name, issues, policies, vision):
    prompt = f"""
    Draft an election manifesto for the political organization "{party_name}".

    Key Issues: {issues}
    Policy Priorities: {policies}
    Vision: {vision}

    The manifesto should be well-structured with these sections:
    1. Introduction
    2. Vision Statement
    3. Key Issues & Proposed Solutions
    4. Policy Priorities
    5. Conclusion

    Use a professional, formal, and inspirational tone.
    """

    output = model.generate_content(prompt)
    return output.text
