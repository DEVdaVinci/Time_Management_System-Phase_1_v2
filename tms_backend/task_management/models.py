from django.db import models
import uuid

from django.contrib.auth.models import User


# Create your models here.
class Account(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid7, editable=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(null=True, blank=True)
    last_name = models.CharField(null=True, blank=True)   
    date_of_birth = models.DateTimeField(null=True, blank=True)


class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid7, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    previous_version = models.ForeignKey("self", related_name="future_version", on_delete=models.PROTECT, blank=True, null=True)
    version_number_major = models.IntegerField(default=1)
    version_number_minor = models.IntegerField(default=0)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    superior = models.ForeignKey("self", related_name="subordinates", on_delete=models.PROTECT, blank=True, null=True)
    superiors_additional = models.ForeignKey("self", related_name="subordinates_additional", on_delete=models.DO_NOTHING, blank=True, null=True)
    is_root = models.BooleanField(default=False)
    

    class Meta:
        constraints = [
            models.CheckConstraint(
                condition=(
                    models.Q(is_root=True, superior__isnull=True)
                    | models.Q(is_root=False, superior__isnull=False)
                ),
                name="category_root_or_has_superior",
                violation_error_message=(
                    "A non-root category must have a superior."
                ),
            ),
        ]


    def __str__(self):
        return self.name


    
    
class Tag(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid7, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=False)
    previous_version = models.ForeignKey("self", on_delete=models.PROTECT, blank=True, null=True, related_name="future_version")
    version_number_major = models.IntegerField(default=1)
    version_number_minor = models.IntegerField(default=0)
    superiors = models.ManyToManyField("self", blank=True, symmetrical=False, related_name="subordinates")
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    


class Action (models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid7, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=False)
    previous_version = models.ForeignKey("self", on_delete=models.PROTECT, blank=True, null=True, related_name="future_version")
    version_number_major = models.IntegerField(default=1)
    version_number_minor = models.IntegerField(default=0)

    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True, related_name="actions")
    categories_additional = models.ManyToManyField(Category, blank=True, related_name="actions_additional")
    tags = models.ManyToManyField(Tag, blank=True)
    
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name



class Activity(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid7, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=False)
    previous_version = models.ForeignKey("self", on_delete=models.PROTECT, blank=True, null=True, related_name="future_version")
    version_number_major = models.IntegerField(default=1)
    version_number_minor = models.IntegerField(default=0)

    actions = models.ManyToManyField(Action)

    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True, related_name="activities")
    categories_additional = models.ManyToManyField(Category, blank=True, related_name="activities_additional")
    tags = models.ManyToManyField(Tag, blank=True)

    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    




class Task(models.Model):
    STATUS = (
        ("NOT_STARTED", "Not Started"),
        ("IN_PROGRESS", "In Progress"),
        ("PAUSED", "Paused"),
        ("BLOCKED", "Blocked"),
        ("COMPLETED", "Completed"),
        ("CANCELED", "Canceled"),
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid7, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=False)
    previous_version = models.ForeignKey("self", on_delete=models.PROTECT, blank=True, null=True, related_name="future_version")
    version_number_major = models.IntegerField(default=1)
    version_number_minor = models.IntegerField(default=0)
    #user = models.OneToOneField()

    activity = models.ForeignKey(Activity, on_delete=models.PROTECT)
    additional_actions = models.ManyToManyField(Action, blank=True)
    status = models.CharField(choices=STATUS, max_length=25, default="NOT_STARTED")
    

    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True, related_name="tasks")
    categories_additional = models.ManyToManyField(Category, blank=True, related_name="tasks_additional")
    tags = models.ManyToManyField(Tag, blank=True)

    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

