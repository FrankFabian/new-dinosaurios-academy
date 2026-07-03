import importlib
import os
import sys

from django.test import SimpleTestCase


class CeleryConfigurationTests(SimpleTestCase):
    def test_celery_uses_configured_broker_and_result_backend(self):
        os.environ["CELERY_BROKER_URL"] = "redis://broker.example/0"
        os.environ["CELERY_RESULT_BACKEND"] = "redis://backend.example/1"

        sys.modules.pop("config.celery", None)
        celery_module = importlib.import_module("config.celery")

        self.assertEqual(celery_module.app.conf.broker_url, "redis://broker.example/0")
        self.assertEqual(celery_module.app.conf.result_backend, "redis://backend.example/1")
