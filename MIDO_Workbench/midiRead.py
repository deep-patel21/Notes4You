import mido

#Scans for connected MIDI ports
print(mido.get_input_names())

input_port = mido.open_input('Port FPX60')

#Continously prints attributes for note name, status, velocity (loudness)
try: 
    while True:
        for msg in input_port.iter_pending():
            if msg.type == 'note_on':
                print(f"Note On: Note {msg.note}, Velocity {msg.velocity}")
            elif msg.type == 'note_off':
                print(f"Note Off: Note {msg.note}, Velocity {msg.velocity}")
except KeyboardInterrupt:
    print("Terminating MIDI connection.")
    input_port.close()
