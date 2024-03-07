// MusicPlayer com padrão Observer
class MusicPlayer {
    constructor() {
        this.observers = [];
        this.state = { song: 'Nenhuma', playing: false };
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    notifyObservers() {
        for (const observer of this.observers) {
            observer.update(this.state);
        }
    }

    play(song) {
        this.state = { song: song, playing: true };
        this.notifyObservers();
    }

    stop() {
        this.state = { song: 'Nenhuma', playing: false };
        this.notifyObservers();
    }

    setVolume(volume) {
        this.state = { ...this.state, volume: volume }; // Atualizando o volume
        this.notifyObservers();
    }
}

// Display implementa Observer para atualizar a interface do usuário
class Display {
    constructor(displayElement) {
        this.displayElement = displayElement;
    }

    update(state) {
        if (state.playing) {
            this.displayElement.innerHTML = `Tocando agora: ${state.song} - Volume: ${state.volume}`;
        } else {
            this.displayElement.innerHTML = `Música atual: Nenhuma - Volume: ${state.volume}`;;
        }
    }
}

// Código "cliente" que usa as classes
// Instanciando o player e o display
const player = new MusicPlayer();
const display = new Display(document.getElementById('musicDisplay'));
player.addObserver(display);

// Configurando os listeners dos botões
document.getElementById('playButton').addEventListener('click', function () {
    player.play('Fear of the Dark - Iron Maiden');
});

document.getElementById('stopButton').addEventListener('click', function () {
    player.stop();
});

// Controle de volume
document.getElementById('volumeSlider').addEventListener('input', function () {
    const volume = parseInt(this.value);
    player.setVolume(volume);
});

