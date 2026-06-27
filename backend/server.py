from fastapi import FastAPI, APIRouter, HTTPException, status
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, BeforeValidator, ConfigDict
from typing import Annotated, List, Optional
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection from env
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'test_database')
logger.info(f"Connecting to MongoDB at {mongo_url}, DB: {db_name}")

client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

app = FastAPI(title="Crystal Blue Water Solution API")

# Setup CORS Origins
cors_origins = os.environ.get('CORS_ORIGINS', '*').split(',')
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api")

# --- Pydantic & MongoDB Adherence Models ---

# PyObjectId type that coerces ObjectId -> str
PyObjectId = Annotated[str, BeforeValidator(str)]

class BaseDocument(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str, datetime: lambda dt: dt.isoformat()}
    )

    @classmethod
    def from_mongo(cls, data: dict):
        if not data:
            return None
        return cls(**data)

    def to_mongo(self):
        data = self.model_dump(by_alias=True, exclude_none=True)
        # If id exists, set as _id of type ObjectId or keep as string
        if "id" in data:
            data["_id"] = data.pop("id")
        if "_id" in data and isinstance(data["_id"], str):
            try:
                data["_id"] = ObjectId(data["_id"])
            except Exception:
                pass
        return data

# Inquiry Model
class Inquiry(BaseDocument):
    name: str
    email: str
    phone: Optional[str] = ""
    property_type: str
    message: str
    selected_solutions: List[str] = Field(default_factory=list)
    status: str = "Pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class InquiryCreate(BaseModel):
    name: str = Field(..., min_length=2)
    email: str = Field(...)
    phone: Optional[str] = ""
    property_type: str = Field(...)
    message: str = Field(...)
    selected_solutions: List[str] = Field(default_factory=list)

class InquiryStatusUpdate(BaseModel):
    status: str

# Water Analysis Input & Recommendation Models
class WaterAnalysisInput(BaseModel):
    water_source: str # "Borewell", "Municipal", "Tanker"
    tds_level: int # in PPM
    hardness_level: int # in PPM
    symptoms: List[str] = Field(default_factory=list) # "Scaling", "Odor", "Staining", "Hairfall", "Dry Skin"

class WaterAnalysisReport(BaseModel):
    severity: str # "Low", "Moderate", "Critical"
    tds_analysis: str
    hardness_analysis: str
    recommended_system: str
    system_description: str
    stages: List[str]
    symptoms_addressed: List[str]

# --- API Endpoints ---

@api_router.get("/", status_code=status.HTTP_200_OK)
async def root():
    return {
        "status": "online",
        "brand": "Crystal Blue Water Solution",
        "description": "Premium Engineered Water Filtration Systems",
        "framework": "FastAPI + MongoDB"
    }

@api_router.post("/inquiries", response_model=Inquiry, status_code=status.HTTP_201_CREATED)
async def create_inquiry(inquiry_in: InquiryCreate):
    try:
        inquiry_dict = inquiry_in.model_dump()
        new_inquiry = Inquiry(**inquiry_dict)
        doc = new_inquiry.to_mongo()
        
        # Insert to DB
        result = await db.inquiries.insert_one(doc)
        doc["_id"] = result.inserted_id
        
        return Inquiry.from_mongo(doc)
    except Exception as e:
        logger.error(f"Error creating inquiry: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Database insertion failed: {str(e)}")

@api_router.get("/inquiries", response_model=List[Inquiry], status_code=status.HTTP_200_OK)
async def get_inquiries():
    try:
        cursor = db.inquiries.find().sort("created_at", -1)
        docs = await cursor.to_list(length=100)
        return [Inquiry.from_mongo(d) for d in docs]
    except Exception as e:
        logger.error(f"Error fetching inquiries: {str(e)}")
        raise HTTPException(status_code=500, detail="Database query failed")

@api_router.patch("/inquiries/{inquiry_id}/status", response_model=Inquiry, status_code=status.HTTP_200_OK)
async def update_inquiry_status(inquiry_id: str, status_update: InquiryStatusUpdate):
    try:
        if not ObjectId.is_valid(inquiry_id):
            raise HTTPException(status_code=400, detail="Invalid inquiry ID format")
        
        result = await db.inquiries.find_one_and_update(
            {"_id": ObjectId(inquiry_id)},
            {"$set": {"status": status_update.status}},
            return_document=True
        )
        if not result:
            raise HTTPException(status_code=404, detail="Inquiry not found")
        
        return Inquiry.from_mongo(result)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating status: {str(e)}")
        raise HTTPException(status_code=500, detail="Status update failed")

@api_router.post("/analyze-water", response_model=WaterAnalysisReport, status_code=status.HTTP_200_OK)
async def analyze_water(input_data: WaterAnalysisInput):
    # Rule-based premium recommendation engine
    tds = input_data.tds_level
    hardness = input_data.hardness_level
    source = input_data.water_source
    symptoms = input_data.symptoms
    
    # Assess severity
    if tds > 1000 or hardness > 400 or "Odor" in symptoms:
        severity = "Critical"
    elif tds > 400 or hardness > 150 or len(symptoms) >= 2:
        severity = "Moderate"
    else:
        severity = "Low"
        
    # Analyze TDS
    if tds < 150:
        tds_analysis = "Optimal TDS. Mineral content is well-balanced for drinking and domestic use."
    elif tds < 500:
        tds_analysis = "Acceptable TDS. Elevated mineral concentration, typical of municipal or shallow well water."
    else:
        tds_analysis = f"High TDS ({tds} PPM). High concentration of dissolved solids, which can lead to scaling, metallic taste, and dry skin."
        
    # Analyze Hardness
    if hardness < 100:
        hardness_analysis = "Soft Water. Safe for plumbing, luxury bathroom fittings, and hair health."
    elif hardness < 250:
        hardness_analysis = f"Moderately Hard ({hardness} PPM). Scaling will slowly accumulate in geysers, showerheads, and luxury glass enclosures."
    else:
        hardness_analysis = f"Extremely Hard ({hardness} PPM). Aggressive scaling occurs. Leads to severe hair fall, scaling of glass, and reduced lifespan of high-end appliances."
        
    # Systems recommendations
    if source == "Borewell" or tds > 800:
        recommended_system = "Premium Industrial-Grade Whole Villa RO + Ultrafiltration"
        system_description = "The ultimate high-flow treatment configuration designed for high TDS borewell water. It eliminates 99.9% of dissolved solids, heavy metals, and bacteria, delivering pristine bottled-quality water to every single tap in your property."
        stages = [
            "Media Pre-filtration (Sand & Sediment Removal)",
            "Granular Activated Carbon (Odor & Organic Compound Elimination)",
            "Dual-Core Premium Water Softener (Scale Prevention)",
            "High-Flux Low-Energy RO Membrane System (Dissolved Solids Removal)",
            "Post-Treatment Mineral Restorer & UV-C Disinfection"
        ]
    elif hardness > 200 or "Scaling" in symptoms or "Hairfall" in symptoms:
        recommended_system = "Dual-Core Smart Water Softening & Filtration Matrix"
        system_description = "Engineered specifically to solve severe scaling and hard water issues. Replaces calcium and magnesium ions with soft ions using precision smart-regeneration technology. Keeps your skin radiant, hair soft, and luxury fittings spotless."
        stages = [
            "Heavy-Duty Sediment Filter (5 Micron absolute separation)",
            "Premium Ion-Exchange Dual Resin Matrix (Salt-free soft water generation)",
            "Coconut Shell Catalytic Carbon Block (Chlorine & VOC filtration)",
            "Micro-filtration Shield (Pathogen safety barrier)"
        ]
    else:
        recommended_system = "Elite Whole House Intelligent Multi-Stage Filtration"
        system_description = "The standard-bearer of luxury water purification. Ideal for clean municipal sources to remove trace pathogens, chemicals, micro-plastics, and chlorine. Provides crystalline, mineral-rich, completely odor-free water everywhere."
        stages = [
            "Multi-Gradient High-Capacity Sediment Filter",
            "Advanced Electro-Adsorptive Filtration Core",
            "KDF-55 Process Media (Heavymetal & chlorine neutralization)",
            "Sub-micron Ultrafiltration (UF) Protective Shield"
        ]
        
    return WaterAnalysisReport(
        severity=severity,
        tds_analysis=tds_analysis,
        hardness_analysis=hardness_analysis,
        recommended_system=recommended_system,
        system_description=system_description,
        stages=stages,
        symptoms_addressed=list(set(symptoms + ["Fine sediment", "Trace Chlorine"]))
    )

app.include_router(api_router)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
