
import eiscp

# Create a receiver object, connecting to the host
receiver = eiscp.eISCP('192.168.1.135')

# Turn the receiver on, select PC input
receiver.command('system-power=standby')

receiver.disconnect()

