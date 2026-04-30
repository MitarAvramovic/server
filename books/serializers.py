# books/serializers.py

# from rest_framework import serializers
# from .models import Book


# class BookSerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only=True)
#     title = serializers.CharField(max_length=200)
#     author = serializers.CharField(max_length=200)

#     def create(self, validated_data):
#         return Book.objects.create(**validated_data)

#     def update(self, instance, validated_data):
#         instance.title = validated_data.get("title", instance.title)
#         instance.author = validated_data.get("author", instance.author)

#         instance.save()
#         return instance


from rest_framework import serializers
from .models import Book


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ["id", "title", "author"]
        read_only_fields = ["id"]
