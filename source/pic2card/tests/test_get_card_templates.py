""" Test for getting the card Templates"""
import unittest

# pylint: disable=no-name-in-module
from tests.base_test_class import BaseAPITest


class GetCardTemplatesTestAPI(BaseAPITest):
    """tests for get_card_templates"""

    def test_status_code(self):
        """checks if the response has a success status code 200"""
        self.assertEqual(self.response.status_code, 200)

    def test_response(self):
        """checks if the response is not empty or None"""
        self.assertEqual(len(self.output), 1)
        self.assertEqual(bool(self.output), True)

    def test_response_for_key_templates(self):
        """checks if the response has certain key named 'templates'"""
        key = bool(self.output.get("templates"))
        self.assertTrue(key, msg="Key 'templates' not found")


if __name__ == "__main__":
    unittest.main()
