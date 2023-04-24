from fastapi import APIRouter, Depends
from core.db import get_db
from sqlalchemy.orm import Session
from sqlalchemy import func
from models.book.models import UserBook
from schema.book import Book, AllBooks

book_router = APIRouter()


@book_router.get("/all_books", response_model=AllBooks, name="获取用户图书")
async def all_books(page_no: int, page_size: int, search_info: str, db: Session = Depends(get_db)):
    if search_info:
        total = db.query(func.count(UserBook.id)).filter(
            UserBook.title.like(f"%{search_info}%")).scalar()
        books = db.query(UserBook).filter(UserBook.title.like(f"%{search_info}%")).order_by(
            UserBook.id.asc()).slice(page_size * (page_no - 1), page_size * page_no)
    else:
        total = db.query(func.count(UserBook.id)).scalar()
        books = db.query(UserBook).order_by(UserBook.id.asc()).slice(page_size * (page_no - 1), page_size * page_no)
    book_list = {
        "total": total,
        "books": [Book(
            **{"title": book.title,
               "pic": book.pic,
               "author": book.author,
               "intro": book.intro}) for book in books]}
    print(AllBooks(**book_list))
    return AllBooks(**book_list)
