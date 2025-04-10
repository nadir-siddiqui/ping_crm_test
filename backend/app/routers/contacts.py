# backend/app/routers/contacts.py

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from .. import schemas, crud, database

router = APIRouter(
    prefix="/contacts",
    tags=["contacts"]
)

@router.get("/", response_model=List[schemas.Contact])
def read_contacts(
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = Query(None, description="Search contacts by name"),
    db: Session = Depends(database.get_db)
):
    contacts = crud.get_contacts(db, skip=skip, limit=limit)
    if search:
        contacts = [c for c in contacts if search.lower() in c.name.lower()]
    return contacts

@router.get("/{contact_id}", response_model=schemas.Contact)
def read_contact(contact_id: int, db: Session = Depends(database.get_db)):
    db_contact = crud.get_contact(db, contact_id)
    if db_contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return db_contact

@router.post("/", response_model=schemas.Contact)
def create_new_contact(contact: schemas.ContactCreate, db: Session = Depends(database.get_db)):
    return crud.create_contact(db, contact)

@router.put("/{contact_id}", response_model=schemas.Contact)
def update_existing_contact(contact_id: int, contact: schemas.ContactCreate, db: Session = Depends(database.get_db)):
    updated = crud.update_contact(db, contact_id, contact)
    if not updated:
        raise HTTPException(status_code=404, detail="Contact not found")
    return updated

@router.delete("/{contact_id}", response_model=schemas.DeleteResponse)
def delete_existing_contact(contact_id: int, db: Session = Depends(database.get_db)):
    db_contact = crud.get_contact(db, contact_id)
    if db_contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    try:
        db.delete(db_contact)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error deleting contact: {e}")
    
    return {"id": contact_id, "message": "Contact successfully deleted"}
