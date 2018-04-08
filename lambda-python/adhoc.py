import eiscp

# Create a receiver object, connecting to the host
receiver = eiscp.eISCP('192.168.1.67')

#receivers = eiscp.eISCP.discover()

# Turn the receiver on, select PC input
#receiver.command('system-power=standby')
receiver.command('volume=25')

receiver.disconnect()

# receivers = eiscp.eISCP.discover()
# returns list of eISCP
# receivers[0].host is the IP