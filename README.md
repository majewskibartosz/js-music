# MusicJS 🚄

A modern, browser-based 16-step drum sequencer with real-time BPM and swing controls. Create rhythmic patterns instantly with an intuitive grid interface, powered by Tone.js and vanilla JavaScript.

[Live demo on Railway 🚂💜](https://musicjs.railway.app/)

[Live demo on Netlify](https://musicjs.netlify.app/)

## Features

- **16-Step Sequencer**: Program drum patterns across 16 steps with 8 independent sound channels
- **Velocity Control**: Single-click (full velocity) or double-click (half velocity) for dynamic patterns
- **BPM Control**: Adjust tempo in real-time from 80–180 BPM
- **Swing Control**: Toggle swing rhythm for groove and feel
- **Visual Feedback**: Real-time playback indicator with swing indicator (orange/pink highlight)
- **Beat Markers**: Purple underlines at beat divisions (steps 1, 5, 9, 13) for kick drum placement
- **One-Click Clear**: Reset all programmed steps instantly
- **Responsive Design**: Works seamlessly across desktop and tablet devices

## How to Use

### Basic Workflow
1. Click a grid box to create a step with **full velocity** (yellow highlight)
2. Double-click a box to create a step with **half velocity** (green highlight)
3. Click a programmed step to delete it (toggle: yellow → deleted, green → yellow → deleted)
4. Use the **Play** button to start the sequencer
5. Adjust **BPM** with the slider to change tempo in real-time
6. Toggle **Swing** to add rhythmic groove
7. Click **Clear** to erase all steps and start fresh

### Visual Guide
- **Orange Highlight**: Current step (swing off)
- **Pink Highlight**: Current step (swing on)
- **Purple Underlines**: Beat boundaries (ideal for kick drum placement)
- **Yellow Box**: Full velocity hit
- **Green Box**: Half velocity hit

## Installation

### Development
```bash
npm install
npm start      # Launches live-server at http://localhost:8080
```

### Production
Docker image for deployment:
```bash
docker build -t musicjs .
docker run -p 80:80 musicjs
```

## Technologies

- **Tone.js** (v13.8.25) – Web Audio API abstraction and synthesis
- **Vanilla JavaScript** (ES6+) – Core application logic
- **HTML5 & CSS3** – Responsive UI with animations
- **Material Icons** – Icon library
- **ESLint & Prettier** – Code quality and formatting
- **Docker & Nginx** – Production deployment

## Development

### Scripts
```bash
npm start      # Start development server with live reload
npm run lint   # Run ESLint code quality checks
```

### Code Quality
- ESLint enforces consistent code standards
- Prettier auto-formats code (100-char line width, single quotes)
- All code follows ES6 module architecture

## Sound Library

The sequencer includes 8 drum samples across two octaves:

| Sound | Type | Note |
|-------|------|------|
| TONE1 | Melodic Tone | C2 |
| TONE2 | Melodic Tone | E2 |
| TONE3 | Melodic Tone | D2 |
| FX2 | Effect/Bass | F2 |
| CLAP | Clap Drum | G2 |
| CHH | Closed Hi-Hat | C3 |
| TOM | Tom Drum | D3 |
| KICK | Kick Drum | G3 |

## License

ISC License – See LICENSE file for details

---

Have fun making beats! 🚄    

