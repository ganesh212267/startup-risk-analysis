def calculate_risk_profit(data):
    investment = float(data.get("investment", 0))
    expenses = float(data.get("expenses", 0))
    idea_name = data.get("idea_name", "This startup")
    industry = data.get("industry", "General")
    market = data.get("market", "Unknown")
    business_model = data.get("business_model", "B2C")
    team_expertise = data.get("team_expertise", "Moderate")
    tech_complexity = data.get("tech_complexity", "Moderate")

    team_map = {
        "Beginner": 35,
        "Moderate": 20,
        "Experienced": 5,
    }

    tech_map = {
        "Simple": 5,
        "Moderate": 20,
        "Advanced": 35,
    }

    model_map = {
        "B2B": 10,
        "B2C": 18,
        "Subscription": 8,
        "Freemium": 28,
    }

    industry_map = {
        "AI": 25,
        "SaaS": 12,
        "E-commerce": 18,
        "EdTech": 15,
    }

    market_lower = str(market).lower()
    if "global" in market_lower:
        market_risk = 20
    elif "india" in market_lower:
        market_risk = 12
    else:
        market_risk = 15

    if expenses >= 500000:
        expense_risk = 20
    elif expenses >= 250000:
        expense_risk = 12
    elif expenses >= 100000:
        expense_risk = 6
    else:
        expense_risk = 2

    if investment <= 100000:
        investment_risk = 15
    elif investment <= 300000:
        investment_risk = 10
    elif investment <= 700000:
        investment_risk = 5
    else:
        investment_risk = 2

    base_risk = (
        team_map.get(team_expertise, 20)
        + tech_map.get(tech_complexity, 20)
        + model_map.get(business_model, 15)
        + industry_map.get(industry, 15)
        + market_risk
        + expense_risk
        + investment_risk
    )

    risk_score = max(5, min(95, base_risk))

    revenue = expenses * 2.3 if expenses > 0 else investment * 0.35
    profit = revenue - expenses
    roi = ((profit / investment) * 100) if investment > 0 else 0

    if risk_score <= 35:
        risk_level = "Low"
        recommendation = "Strong potential. Focus on customer acquisition and rapid execution."
    elif risk_score <= 70:
        risk_level = "Medium"
        recommendation = "Promising idea. Reduce uncertainty through market validation and MVP testing."
    else:
        risk_level = "High"
        recommendation = "High-risk concept. Simplify the product, improve execution capability, and reduce burn."

    reasons = []

    if team_expertise == "Beginner":
        reasons.append("the founding team has limited experience, which increases execution risk")
    elif team_expertise == "Moderate":
        reasons.append("the team has moderate experience, so execution is possible but still needs support")
    else:
        reasons.append("the experienced team reduces execution risk")

    if tech_complexity == "Advanced":
        reasons.append("the product requires advanced technology, which raises development difficulty")
    elif tech_complexity == "Moderate":
        reasons.append("the technology is moderately complex and may require careful planning")
    else:
        reasons.append("the technology is relatively simple, which lowers implementation risk")

    if business_model == "Freemium":
        reasons.append("the freemium model can make monetization slower and less predictable")
    elif business_model == "Subscription":
        reasons.append("the subscription model can provide recurring revenue if customers retain well")
    elif business_model == "B2C":
        reasons.append("a B2C model may require more marketing spend to acquire users")
    elif business_model == "B2B":
        reasons.append("a B2B model can create stronger long-term contracts but may have slower sales cycles")

    if expenses > 300000:
        reasons.append("monthly expenses are high, which can increase burn rate pressure")
    elif expenses < 100000:
        reasons.append("monthly expenses are relatively controlled, which helps reduce financial pressure")

    if len(reasons) == 1:
        risk_explanation = f"{idea_name} is classified as {risk_level.lower()} risk because {reasons[0]}."
    else:
        risk_explanation = (
            f"{idea_name} is classified as {risk_level.lower()} risk because "
            + ", ".join(reasons[:-1])
            + ", and "
            + reasons[-1]
            + "."
        )

    description = (
        f"{idea_name} operates in the {industry} sector with a {business_model} model aimed at {market}. "
        f"The estimated investment is ₹{investment:,.0f}, monthly expenses are ₹{expenses:,.0f}, "
        f"projected revenue is ₹{revenue:,.0f}, projected profit is ₹{profit:,.0f}, "
        f"and estimated ROI is {roi:.2f}%."
    )

    executive_summary = (
        f"{idea_name} shows a {risk_level.lower()}-to-moderate execution profile with an estimated ROI of {roi:.2f}%. "
        f"The idea appears most suitable for founders who can validate demand quickly and maintain cost discipline."
    )

    swot = {
        "strengths": [
            "Clear startup concept with defined business model",
            "Revenue potential based on current expense assumptions",
            "Can be positioned for focused niche execution",
        ],
        "weaknesses": [
            "Execution capability may be constrained by current team strength",
            "Profitability depends on efficient cost control",
            "Market entry may require strong differentiation",
        ],
        "opportunities": [
            "Can expand into adjacent segments after validation",
            "Potential to refine into a niche-first MVP",
            "Scope to improve retention through recurring value",
        ],
        "threats": [
            "Competition from similar existing startups",
            "Customer acquisition costs may rise",
            "Technical complexity can delay launch",
        ],
    }

    alternative_ideas_map = {
        "AI": [
            "AI chatbot for small business customer support",
            "AI resume screening tool for recruiters",
            "AI content summarizer for students",
            "AI sales assistant for local shops",
        ],
        "EdTech": [
            "Exam preparation app for competitive tests",
            "Micro-learning app for college students",
            "Doubt-solving platform for schools",
            "B2B learning management tool for institutes",
        ],
        "SaaS": [
            "CRM tool for small businesses",
            "Invoice automation platform",
            "Employee task tracking dashboard",
            "Subscription analytics platform",
        ],
        "E-commerce": [
            "Niche marketplace for local handmade products",
            "D2C store for eco-friendly goods",
            "Social commerce app for college sellers",
            "Hyperlocal delivery platform",
        ],
    }

    existing_startups_map = {
        "AI": [
            {"name": "OpenAI", "info": "AI tools and language models"},
            {"name": "Jasper AI", "info": "AI content generation platform"},
            {"name": "Grammarly", "info": "AI writing assistant"},
            {"name": "Synthesia", "info": "AI video generation"},
        ],
        "EdTech": [
            {"name": "Byju’s", "info": "Online learning platform for students"},
            {"name": "Unacademy", "info": "Competitive exam preparation platform"},
            {"name": "Coursera", "info": "Global online courses platform"},
            {"name": "Vedantu", "info": "Live online tutoring platform"},
        ],
        "SaaS": [
            {"name": "Salesforce", "info": "CRM software platform"},
            {"name": "HubSpot", "info": "Marketing and sales automation"},
            {"name": "Zoho", "info": "Business software suite"},
            {"name": "Freshworks", "info": "Customer engagement software"},
        ],
        "E-commerce": [
            {"name": "Amazon", "info": "Global e-commerce marketplace"},
            {"name": "Flipkart", "info": "Indian e-commerce platform"},
            {"name": "Meesho", "info": "Social commerce platform"},
            {"name": "Nykaa", "info": "Beauty and lifestyle marketplace"},
        ],
    }

    alternative_ideas = alternative_ideas_map.get(
        industry,
        [
            "Low-cost MVP version of the same startup idea",
            "Niche-focused version for a smaller customer segment",
            "B2B version of the same concept",
            "Subscription-based simplified service model",
        ],
    )

    existing_startups = existing_startups_map.get(
        industry,
        [
            {"name": "Generic Startup A", "info": "Similar business model"},
            {"name": "Generic Startup B", "info": "Alternative approach"},
        ],
    )

    competitors = [
        {"name": "Startup Alpha", "info": "Fast-moving product in adjacent market"},
        {"name": "GrowthStack AI", "info": "Uses AI workflows for automation"},
        {"name": "Vision Launch", "info": "Focuses on SME business optimization"},
    ]

    pitch = (
        f"{idea_name} is an innovative startup in the {industry} sector targeting {market} customers. "
        f"It operates on a {business_model} model and aims to solve real-world problems using "
        f"{tech_complexity.lower()} technology. With an estimated ROI of {roi:.2f}% and a "
        f"{risk_level.lower()} risk profile, this startup has strong potential for scalable growth. "
        f"The team’s {team_expertise.lower()} expertise will play a key role in execution, while "
        f"cost optimization and market validation will be critical for success."
    )

    elevator_pitch = (
        f"{idea_name} is a {industry} startup designed for {market}. "
        f"It uses a {business_model} model to deliver scalable solutions with strong ROI potential."
    )

    investor_summary = (
        f"Investment required: ₹{investment:,.0f}. "
        f"Expected ROI: {roi:.2f}%. "
        f"Risk Level: {risk_level}. "
        f"This startup presents a {risk_level.lower()}-risk opportunity with projected profitability "
        f"and scalability potential."
    )

    return {
        "risk_score": round(risk_score, 2),
        "risk_level": risk_level,
        "revenue": round(revenue, 2),
        "profit": round(profit, 2),
        "roi": round(roi, 2),
        "recommendation": recommendation,
        "description": description,
        "risk_explanation": risk_explanation,
        "executive_summary": executive_summary,
        "swot": swot,
        "alternative_ideas": alternative_ideas,
        "existing_startups": existing_startups,
        "competitors": competitors,
        "pitch": pitch,
        "elevator_pitch": elevator_pitch,
        "investor_summary": investor_summary,
    }