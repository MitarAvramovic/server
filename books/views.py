# books/views.py

from django.views.decorators.csrf import csrf_exempt


import json
from django.http import JsonResponse
from django.views import View
from .models import Book


@csrf_exempt
def book_list(request):
    if request.method == "GET":
        books = Book.objects.all().values("id", "title", "author")
        print(list(books))
        return JsonResponse(list(books), safe=False)

    elif request.method == "POST":
        print("POST radi")
        data = json.loads(request.body)

        title = data.get("title")
        author = data.get("author")

        book = Book.objects.create(title=title, author=author)

        return JsonResponse({"id": book.id, "title": book.title, "author": book.author})
