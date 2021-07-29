import uuid
import random
from django.db import models
from django.contrib.auth.models import AbstractUser

class Provider(AbstractUser):
    username = models.EmailField(max_length=250, unique=True)

    # Generating UUID for unique keys when creating superuser
    phone_number = models.CharField(
        max_length=20, unique=True, default=str(uuid.uuid1(random.randint(0, 281474976710655))))
    language = models.CharField(max_length=50, default='English')
    currency = models.CharField(max_length=10, default='PHP')

    def __str__(self):
        return self.last_name + ', ' + self.first_name

    REQUIRED_FIELDS = ['first_name', 'last_name']