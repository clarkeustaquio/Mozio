# Generated by Django 3.2.5 on 2021-07-29 07:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('provider', '0003_alter_provider_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='provider',
            name='phone_number',
            field=models.CharField(default='25bbb2b2-f03b-11eb-bdbe-1c48b2491dc1', max_length=20, unique=True),
        ),
    ]