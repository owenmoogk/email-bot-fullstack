from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Template(models.Model):
    info = models.JSONField(null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)


class Contact(models.Model):
    info = models.JSONField(null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)