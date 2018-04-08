import unittest
from unittest.mock import patch

import eiscp_wrapper
from util import EiscpException


class TestEiscpWrapper(unittest.TestCase):
    #
    # def test_get_receiver_none_available(self):
    #     actual = eiscp_wrapper.get_receiver()
    #     self.assertEqual(actual, None)

    @patch('eiscp_wrapper.eiscp.core.eISCP.command')
    def test_issue_command_when_error_no_retry_throws_exception(self, mock_command):
        mock_command.side_effect = OSError('foo')
        with self.assertRaises(EiscpException):
            eiscp_wrapper.issue_command('', False)
        self.assertEqual(mock_command.call_count, 1, "command should be called once when retry is false")

    @patch('eiscp_wrapper.eiscp.core.eISCP.command')
    def test_issue_command_when_error_with_retry_throws_exception(self, mock_command):
        mock_command.side_effect = OSError('foo')
        with self.assertRaises(EiscpException):
            eiscp_wrapper.issue_command('', True)
        self.assertEqual(mock_command.call_count, 2, "command should be called twice when retry is true")

    @patch('eiscp_wrapper.eiscp.core.eISCP.command')
    def test_issue_command_when_error_with_retry_second_call_passes(self, mock_command):
        mock_command.side_effect = [OSError('foo'), None]
        eiscp_wrapper.issue_command('', True)
        self.assertEqual(mock_command.call_count, 2, "command should be called twice when retry is true")
