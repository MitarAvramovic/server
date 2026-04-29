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
        return JsonResponse(list(books), safe=False)

    elif request.method == "POST":
        data = json.loads(request.body)

        title = data.get("title")
        author = data.get("author")

        book = Book.objects.create(title=title, author=author)

        return JsonResponse({"id": book.id, "title": book.title, "author": book.author})


@csrf_exempt
def book_detail(request, pk):
    try:
        book = Book.objects.get(pk=pk)
    except Book.DoesNotExist:
        return JsonResponse({"error": "Not found"}, status=404)

    if request.method == "GET":
        return JsonResponse({"id": book.id, "title": book.title, "author": book.author})

    if request.method == "PUT":
        data = json.loads(request.body)
        book.title = data["title"]
        book.author = data["author"]
        book.save()
        return JsonResponse({"id": book.id, "title": book.title, "author": book.author})

    if request.method == "PATCH":
        data = json.loads(request.body)
        for field in ["title", "author"]:
            if field in data:
                setattr(book, field, data[field])
        book.save()
        return JsonResponse({"id": book.id, "title": book.title, "author": book.author})

    if request.method == "DELETE":
        book.delete()
        return JsonResponse({}, status=204)
