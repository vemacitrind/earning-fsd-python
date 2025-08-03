from django.db import models
from django.contrib.auth.models import User


class PasswordEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='password_entries')
    service_name = models.CharField(max_length=50)
    username_or_email = models.CharField(max_length=150)
    password_encypted = models.TextField()
    note = models.TextField()
    created_at = models.DateField()
    updated_at = models.DateField()

    def __str__(self):
        return f"{self.service_name} ({self.username_or_email})"
