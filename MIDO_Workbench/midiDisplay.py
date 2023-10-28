import mido
import pygame

pygame.init()

WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)

screen_width = 800
screen_height = 200
screen = pygame.display.set_mode((screen_width, screen_height))

note_names = ["C", "C#", "D", "D#", "E", "E#", "F", "F#", "G", "G#", "A", "A#", "B"]

print(mido.get_input_names())
input_port = mido.open_input('Roland Digital Piano 0')

key_width = screen_width // 88
key_height = screen_height
key_positions = [(i * key_width, 0) for i in range(88)] 

def draw_piano():
    screen.fill(WHITE)
    for i, position in enumerate(key_positions):
        pygame.draw.rect(screen, red if notes_played[i] else white, [position[0], 0, key_width, key_height])

notes_played = [False] * 88

def get_note_name(note_number):
    octave = (note_number // 12) - 1
    note_index = note_number % 12
    note_name = note_names[note_index]
    return f"{note_name}{octave}"

try:
    while True:
        for msg in input_port.iter_pending():
            if msg.type == 'note_on':
                note_name = get_note_name(msg.note)
                print(f"Note On: Note {note_name}, Velocity: {msg.velocity}")
            elif msg.type == 'note_off':
                note_name = get_note_name(msg.note)
                print(f"Note Off: Note {note_name}, Velocity: {msg.velocity}")


run = True
while run:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            run = False
    for msg in input_port.iter_pending():
        if msg.type == 'note_on' and msg.note < 14:
            notes_played[msg.note] = True
        elif msg.type == 'note_off' and msg.note < 14:
            notes_played[msg.note] = False

    draw_piano()
    pygame.display.update()

pygame.quit()



