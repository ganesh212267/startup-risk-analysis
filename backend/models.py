from sqlalchemy import Column, Integer, String, Float
from database import Base

class StartupAnalysis(Base):
    __tablename__ = "startup_analysis"

    id = Column(Integer, primary_key=True, index=True)
    idea_name = Column(String)
    industry = Column(String)
    market = Column(String)
    business_model = Column(String)
    team_expertise = Column(String)
    tech_complexity = Column(String)
    investment = Column(Float)
    expenses = Column(Float)
    revenue = Column(Float)
    risk_score = Column(Float)
    roi = Column(Float)
    profit = Column(Float)
    recommendation = Column(String)