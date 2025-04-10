from pydantic import BaseModel
from typing import Optional, List

# -------------------------------
# Company Schemas
# -------------------------------

class DeleteResponse(BaseModel):
    id: int
    message: str
    
class CompanyBase(BaseModel):
    name: str

class CompanyCreate(CompanyBase):
    pass

# This schema is used when sending a company inside a contact.
# It does not include the 'contacts' field, thus breaking the recursion.
class CompanyInContact(CompanyBase):
    id: int

    class Config:
        # For Pydantic V1 use orm_mode, for V2 you can use:
        # from_attributes = True
        orm_mode = True

# Schema for full company details (if needed separately)
# If you need to include contacts in the Company response,
# you must handle the recursion by limiting depth or using a separate schema.
class Company(CompanyBase):
    id: int
    # If you want to include contacts, you'll run into recursion unless you use a separate schema.
    # For now, we exclude it here.
    # contacts: Optional[List[Contact]] = []
    class Config:
        orm_mode = True

# -------------------------------
# Contact Schemas
# -------------------------------

class ContactBase(BaseModel):
    name: str
    phone: str
    city: Optional[str] = None
    company_id: int

class ContactCreate(ContactBase):
    pass

class Contact(ContactBase):
    id: int
    # Use the minimal Company schema to avoid cycles
    company: Optional[CompanyInContact] = None

    class Config:
        orm_mode = True
