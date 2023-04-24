from models.base import Base
from sqlalchemy import Column,String,Text,Integer
from utils.snow_flake import generate_id

class UserBook(Base):
    __tablename__ = "user_book"
    id = Column(Integer(),primary_key=True,default=generate_id,index=True)
    sump = Column(Integer())
    title = Column(String(32))
    author = Column(String(32))
    intro = Column(Text())
    num = Column(Integer())
    pic = Column(String(64))
    good = Column(String(32))
    tags_id = Column(Integer())
    rate_num = Column(Integer())