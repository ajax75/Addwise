import os
import pytest
import requests
from pathlib import Path

# Helper to load REACT_APP_BACKEND_URL from /app/frontend/.env
def get_base_url():
    env_path = Path("/app/frontend/.env")
    if env_path.exists():
        with open(env_path, "r") as f:
            for line in f:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    val = line.split("=", 1)[1].strip()
                    # Strip any quotes
                    val = val.strip('"').strip("'")
                    return val.rstrip("/")
    return "https://clarity-labs-3.preview.emergentagent.com"

BASE_URL = get_base_url()
API_URL = f"{BASE_URL}/api"

@pytest.fixture
def api_client():
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session

class TestWaterLabAndInquiries:
    """Test suite for Crystal Blue Water Solutions Backend APIs"""

    def test_root_endpoint(self, api_client):
        """Verify the API root/health check endpoint is online"""
        # We append trailing slash because FastAPI redirects to trailing slash
        response = api_client.get(f"{API_URL}/")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "online"
        assert "brand" in data
        assert data["brand"] == "Crystal Blue Water Solutions"

    def test_analyze_water_endpoint(self, api_client):
        """Test POST /api/analyze-water with sliders/source inputs"""
        payload = {
            "water_source": "Borewell",
            "tds_level": 750,
            "hardness_level": 400,
            "symptoms": ["Scaling", "Hairfall", "Dry Skin"]
        }
        response = api_client.post(f"{API_URL}/analyze-water", json=payload)
        assert response.status_code == 200
        data = response.json()
        
        # Validate critical analysis fields
        assert "severity" in data
        assert data["severity"] in ["Low", "Moderate", "Critical"]
        assert "tds_analysis" in data
        assert "hardness_analysis" in data
        assert "recommended_system" in data
        assert "system_description" in data
        assert isinstance(data["stages"], list)
        assert len(data["stages"]) > 0
        assert "symptoms_addressed" in data
        assert "Scaling" in data["symptoms_addressed"]

    def test_inquiry_crud_lifecycle(self, api_client):
        """Test full Inquiry lifecycle: POST -> GET -> PATCH -> GET (verification)"""
        # 1. Create a unique inquiry (POST /api/inquiries)
        inquiry_payload = {
            "name": "TEST_Alex Mercer",
            "email": "TEST_alex@mercer.com",
            "phone": "+15550192831",
            "property_type": "Villa",
            "message": "TEST_Please send custom blueprint proposals for Whole Villa RO system.",
            "selected_solutions": ["Whole Villa Matrix", "Custom Blueprints"]
        }
        create_response = api_client.post(f"{API_URL}/inquiries", json=inquiry_payload)
        assert create_response.status_code == 201
        created_data = create_response.json()
        
        # Verify the created fields match and ID is generated
        assert "id" in created_data or "_id" in created_data
        inquiry_id = created_data.get("id") or created_data.get("_id")
        assert inquiry_id is not None
        assert created_data["name"] == inquiry_payload["name"]
        assert created_data["email"] == inquiry_payload["email"]
        assert created_data["status"] == "Pending"  # default status

        # 2. Retrieve all inquiries (GET /api/inquiries) and verify persistence
        get_response = api_client.get(f"{API_URL}/inquiries")
        assert get_response.status_code == 200
        inquiries_list = get_response.json()
        assert isinstance(inquiries_list, list)
        assert len(inquiries_list) > 0
        
        # Find our created inquiry by ID
        matching_inq = next((x for x in inquiries_list if (x.get("id") == inquiry_id or x.get("_id") == inquiry_id)), None)
        assert matching_inq is not None, "Created inquiry not found in the list!"
        assert matching_inq["name"] == inquiry_payload["name"]

        # 3. Update Status (PATCH /api/inquiries/{inquiry_id}/status)
        patch_payload = {"status": "Scheduled"}
        patch_response = api_client.patch(f"{API_URL}/inquiries/{inquiry_id}/status", json=patch_payload)
        assert patch_response.status_code == 200
        patched_data = patch_response.json()
        assert patched_data["status"] == "Scheduled"

        # 4. Verify Status was actually persisted in database (GET /api/inquiries again)
        get_verify_response = api_client.get(f"{API_URL}/inquiries")
        assert get_verify_response.status_code == 200
        updated_list = get_verify_response.json()
        matching_updated_inq = next((x for x in updated_list if (x.get("id") == inquiry_id or x.get("_id") == inquiry_id)), None)
        assert matching_updated_inq is not None
        assert matching_updated_inq["status"] == "Scheduled"
