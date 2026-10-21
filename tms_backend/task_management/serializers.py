from dataclasses import fields

from rest_framework import serializers

from .models import *








class CategoryReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
        depth = 1


    def validate(self, attrs):
        is_root = attrs.get(
            "is_root",
            self.instance.is_root
            if self.instance else False
        )

        superior = attrs.get(
            "superior",
            self.instance.superior
            if self.instance else None
        )

        if is_root and superior is not None:
            raise serializers.ValidationError({
                "superior":
                    "A root category cannot have a superior."
            })

        if not is_root and superior is None:
            raise serializers.ValidationError({
                "superior":
                    "A non-root category must have a superior."
            })

        return attrs


class CategoryWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


    def validate(self, attrs):
        is_root = attrs.get(
            "is_root",
            self.instance.is_root
            if self.instance else False
        )

        superior = attrs.get(
            "superior",
            self.instance.superior
            if self.instance else None
        )

        if is_root and superior is not None:
            raise serializers.ValidationError({
                "superior":
                    "A root category cannot have a superior."
            })

        if not is_root and superior is None:
            raise serializers.ValidationError({
                "superior":
                    "A non-root category must have a superior."
            })

        return attrs

        





class TagReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"
        depth = 1
class TagWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"


class ActionReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = "__all__"
        depth = 1
class ActionWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = "__all__"



class ActivityReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = "__all__"
        depth = 1
class ActivityWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = "__all__"



class TaskReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"
        depth = 1
class TaskWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"
