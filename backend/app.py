from flask import Flask, request, jsonify
from flask_cors import CORS
from database import Base, engine, SessionLocal
from models import StartupAnalysis
from utils import calculate_risk_profit

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
Base.metadata.create_all(bind=engine)

@app.route("/")
def home():
    return "Backend is running"

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    result = calculate_risk_profit(data)

    db = SessionLocal()
    record = StartupAnalysis(
        idea_name=data.get("idea_name"),
        industry=data.get("industry"),
        market=data.get("market"),
        business_model=data.get("business_model"),
        team_expertise=data.get("team_expertise"),
        tech_complexity=data.get("tech_complexity"),
        investment=float(data.get("investment", 0)),
        expenses=float(data.get("expenses", 0)),
        revenue=result["revenue"],
        risk_score=result["risk_score"],
        roi=result["roi"],
        profit=result["profit"],
        recommendation=result["recommendation"],
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    db.close()

    return jsonify(result)

@app.route("/history", methods=["GET"])
def history():
    db = SessionLocal()
    records = db.query(StartupAnalysis).order_by(StartupAnalysis.id.desc()).all()

    history_data = []
    for r in records:
        history_data.append({
            "id": r.id,
            "idea_name": r.idea_name,
            "industry": r.industry,
            "market": r.market,
            "business_model": r.business_model,
            "investment": r.investment,
            "expenses": r.expenses,
            "revenue": r.revenue,
            "profit": r.profit,
            "roi": r.roi,
            "risk_score": r.risk_score,
            "risk_level": "Medium",
            "recommendation": r.recommendation,
            "description": f"{r.idea_name} operates in the {r.industry} sector with a {r.business_model} model aimed at {r.market}.",
            "risk_explanation": "Saved history item loaded from previous analysis.",
            "executive_summary": "This is a previously saved startup analysis record.",
            "swot": {
                "strengths": ["Saved analysis available"],
                "weaknesses": ["Detailed SWOT not stored in database"],
                "opportunities": ["Re-run analysis for fresh insights"],
                "threats": ["Historical snapshot may be incomplete"]
            },
            "alternative_ideas": [],
            "existing_startups": []
        })

    db.close()
    return jsonify(history_data)

if __name__ == "__main__":
    app.run(debug=True)