# backend/app/routers/companies.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from .. import schemas, crud, database

router = APIRouter(
    prefix="/companies",
    tags=["companies"]
)

@router.get("/", response_model=List[schemas.Company])
def read_companies(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    return crud.get_companies(db, skip=skip, limit=limit)

@router.get("/{company_id}", response_model=schemas.Company)
def read_company(company_id: int, db: Session = Depends(database.get_db)):
    db_company = crud.get_company(db, company_id)
    if db_company is None:
        raise HTTPException(status_code=404, detail="Company not found")
    return db_company

@router.post("/", response_model=schemas.Company)
def create_new_company(company: schemas.CompanyCreate, db: Session = Depends(database.get_db)):
    return crud.create_company(db, company)

@router.put("/{company_id}", response_model=schemas.Company)
def update_existing_company(company_id: int, company: schemas.CompanyCreate, db: Session = Depends(database.get_db)):
    updated = crud.update_company(db, company_id, company)
    if not updated:
        raise HTTPException(status_code=404, detail="Company not found")
    return updated

@router.delete("/{company_id}", response_model=schemas.DeleteResponse)
def delete_existing_company(company_id: int, db: Session = Depends(database.get_db)):
    db_company = crud.get_company(db, company_id)
    if db_company is None:
        raise HTTPException(status_code=404, detail="Company not found")
    
    try:
        db.delete(db_company)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error deleting company: {e}")
    
    return {"id": company_id, "message": "Company successfully deleted"}
