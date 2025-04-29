# Homework 15 - Project Update

## 🕹️ Overview

This project is a simple but dynamic arcade-style survival game built with p5.js. The player moves around the screen, collects gold coins for points, avoids red obstacles, and now gains access to new features like health pickups and difficulty progression.

---

## ✅ Current Features

- **Player Movement:** Controlled via arrow keys.
- **Collectibles:** Gold coins increase score by 10 points.
- **Obstacles:**
  - Red enemies either roam or chase the player.
  - Colliding with them causes damage and a visual screen flash.
- **Health Pickups:** Green squares restore 20 health points, up to a maximum of 100.
- **Level Progression:** Every 50 points earned increases the level.
  - New levels spawn more obstacles, collectibles, and occasional health pickups.
  - Chasing enemies get slightly faster with each level.
- **Game Over State:** When the player's health reaches zero, the game stops and displays a “Game Over” screen.

---

## 🌟 Enhancements Made

- Added **health pickups** to extend gameplay and allow recovery.
- Introduced **leveling system** that increases difficulty over time.
- Implemented a **flashing red screen effect** when the player takes damage for visual feedback.
- Dynamic speed scaling for **chasing obstacles** based on level.
- Cleaned up player movement bounds with `constrain()` to keep the player inside the screen.

---

## 📈 Progress Summary

The game now features a more complete and interactive gameplay loop. It rewards progression with increasing difficulty while offering small recovery windows via health pickups. The player is challenged to balance risk and reward as they collect coins and avoid enemies.

The current version feels more like a polished arcade game and is ready for basic user testing or additional polish like sound effects and menu screens.

---

## 🛠️ Next Steps

- Add **background music and sound effects** for collectibles, damage, and level-up.
- Include a **title screen and restart option**.
- Improve **mobile responsiveness** (optional).
- Add **different types of enemies or power-ups**.

---

## 🎮 How to Play

- Use **arrow keys** to move the blue player circle.
- **Collect gold coins** to earn points.
- **Avoid red obstacles** or you’ll lose health!
- **Pick up green squares** to regain health.
- Game ends when health reaches **0**.

---

## 💻 Built With

- [p5.js](https://p5js.org/) - JavaScript creative coding library
