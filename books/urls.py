# books/urls.py

# from django.urls import path
# from .views import book_list, book_detail


# urlpatterns = [
#     path("books/", book_list),
#     path("books/<int:pk>/", book_detail),
# ]


# for APIView

# from django.urls import path
# from .views_api import BookListAPIView, BookDetailAPIView

# urlpatterns = [
#     path("books/", BookListAPIView.as_view(), name="book-list"),
#     path("books/<int:pk>/", BookDetailAPIView.as_view(), name="book-detail"),
# ]

# for APIView

# from django.urls import path
# from .views_generic import BookListCreateAPIView, BookRetrieveUpdateDestroyAPIView

# urlpatterns = [
#     path("books/", BookListCreateAPIView.as_view(), name="book-list"),
#     path("books/<int:pk>/", BookRetrieveUpdateDestroyAPIView.as_view(), name="book-detail"),
# ]

# for ModelViewSet

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views_model import BookViewSet

router = DefaultRouter()
router.register("books", BookViewSet, basename="book")

urlpatterns = [path("", include(router.urls))]
