# **prototype-01**  

A **2D platformer prototype** built using **Phaser**, **TypeScript**, **Electron**, and **Vite**. The project serves as a foundation for developing platformer games with smooth physics, animations, and desktop integration.  


## **1. Technologies Used**  

### **1.1 Core Technologies**  
- **Phaser 3** – Game engine for 2D games  
- **TypeScript** – Type-safe JavaScript for better maintainability  
- **Electron** – Desktop application framework  
- **Vite** – Fast development and build tool  

### **1.2 Key Features**  
- **Platformer mechanics**: movement and jumping  
- **Sprite animations** with frame-based rendering  
- **Physics-based interactions** using Phaser's arcade physics  
- **Desktop & Web support** with Electron and Vite  
- **Game scenes management** using Phaser's Scene API  
- **Optimized FPS control** with a custom `FPSScene` class  


## **2. Features Overview**  

### **2.1 Player Mechanics**  
- Movement with **cursor keys**  
- Jumping with collision detection  
- Smooth animations  

### **2.2 Environment**  
- **Platforms** dynamically created using a structured layout  
- **Physics interactions** between player and platforms  
- **Scene boundaries** to limit movement  

### **2.3 Performance Optimization**  
- **FPS management** using `FPSScene`  
- **Preloading assets** for smooth performance  


## **3. Project Structure**  

```plaintext
/src
  ├── assets/             # Game assets (sprites, audio, etc.)
  ├── config/             # Configurations (Electron, FPS settings)
  ├── constants/          # Game-related constants
  ├── entities/           # Game objects (Player, Platforms)
  ├── scenes/             # Game scenes (Main scene, FPS controller)
  ├── main.ts             # Game entry point
  ├── game.ts             # Phaser game setup
  ├── electron/           # Electron configuration
```


## **4. Development**  

### **4.1 Install Dependencies**  
Using **Yarn** (recommended):  
```sh
yarn install
```
Or using **npm**:  
```sh
npm install
```

### **4.2 Start the web version (browser)**
```sh
yarn start:dev:web
```
Runs the game in a browser using **Vite**.

### **4.3 Start the desktop version (Electron)**
```sh
yarn start:dev:desktop
```
Runs the game as a **desktop app** with **Electron**.


## **5. Build & Distribution**  

### **5.1 Build for Web**
```sh
yarn build:prod:web
```
Compiles TypeScript and builds the web version.

### **5.2 Build for Windows (Electron)**
```sh
yarn build:prod:windows
```
Generates a `.exe` file for **Windows**.

## **6. Future Improvements**  
Enhancements will be introduced in future prototypes based on this one. Check out the next iteration:
- [prototype-02][]


## **7. License**F  
This project is licensed under the **MIT License**.  
