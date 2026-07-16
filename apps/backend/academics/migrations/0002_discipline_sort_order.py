from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("academics", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="discipline",
            name="sort_order",
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AlterModelOptions(
            name="discipline",
            options={"ordering": ["sort_order", "slug"]},
        ),
    ]
