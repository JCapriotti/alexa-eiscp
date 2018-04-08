import eiscp

from util import EiscpException


def get_receiver():
    return eiscp.eISCP('')


# noinspection PyBroadException
def issue_command(command, retry):
    receiver = get_receiver()

    try:
        receiver.command(command)
    except:
        if retry:
            issue_command(command, False)
        else:
            raise EiscpException()


# send get_command
# catch timeout (IP valid but not a receiver), no route (IP not a thing)
# on catch, try to discover
# if success, reissue command
