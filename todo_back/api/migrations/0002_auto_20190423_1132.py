# Generated by Django 2.1.5 on 2019-04-23 05:32

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='created_at',
            field=models.DateTimeField(verbose_name=datetime.datetime(2019, 4, 23, 11, 32, 46, 307463)),
        ),
    ]
