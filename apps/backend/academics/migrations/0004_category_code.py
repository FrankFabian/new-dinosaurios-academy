from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("academics", "0003_venue_notes_nullable_google_maps_url"),
    ]

    operations = [
        migrations.AddField(
            model_name="category",
            name="code",
            field=models.CharField(blank=True, max_length=24, null=True),
        ),
    ]
