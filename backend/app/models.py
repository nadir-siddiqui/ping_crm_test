# backend/app/models.py

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Company(Base):
    __tablename__ = "companies"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, unique=True, nullable=False)
    
    # One-to-many relationship with contacts
    contacts = relationship("Contact", back_populates="company", cascade="all, delete")

class Contact(Base):
    __tablename__ = "contacts"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    phone = Column(String, nullable=False)
    city = Column(String, nullable=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    
    # Relationship linking to Company
    company = relationship("Company", back_populates="contacts")
