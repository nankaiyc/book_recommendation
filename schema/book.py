from pydantic import BaseModel
from typing import List

class Book(BaseModel):
    title: str
    author: str
    intro: str
    pic: str

class AllBooks(BaseModel):
    total: int
    books: List[Book]

    class Config:
        schema_extra = {
            "example": {"total":14,"books":[
                {
                    "title": "书名",
                    "pic": "123",
                    "author": "小明",
                    "intro": "图书介绍"
                }
            ]}
        }