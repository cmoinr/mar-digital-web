from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
from typing import List

router = APIRouter(tags=["leads"])

class LeadIn(BaseModel):
    nombre: str
    email: EmailStr

class LeadOut(LeadIn):
    id: int

_fake_db: List[LeadOut] = []
_counter = 1

@router.post("/leads", response_model=LeadOut)
def create_lead(data: LeadIn):
    global _counter
    lead = LeadOut(id=_counter, **data.dict())
    _fake_db.append(lead)
    _counter += 1
    return lead

@router.get("/leads", response_model=List[LeadOut])
def list_leads():
    return _fake_db
