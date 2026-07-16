from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("academics", "0004_category_code"),
    ]

    operations = [
        migrations.AlterField(
            model_name="court",
            name="notes",
            field=models.TextField(blank=True, null=True),
        ),
    ]
