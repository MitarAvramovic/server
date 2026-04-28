# books/views.py

import json
from django.http import JsonResponse
from django.views import View
from .models import Book


def book_list(request):
    books = Book.objects.all().values("id", "title", "author")
    print(list(books))
    return JsonResponse(list(books), safe=False)
