from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("academics", "0002_discipline_sort_order"),
    ]

    operations = [
        migrations.AddField(
            model_name="venue",
            name="notes",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="venue",
            name="google_maps_url",
            field=models.URLField(blank=True, null=True),
        ),
    ]
