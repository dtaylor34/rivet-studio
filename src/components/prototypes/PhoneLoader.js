import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../theme/ThemeContext';

const PhoneLoader = () => {
  const containerRef = useRef(null);
  const p5Instance = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const initializeSketch = () => {
      // Phone sketch code
      const phoneSketch = (p) => {
        let menuItems = [];
        let loadingStarted = false;
        let startTime = 0;
        let selectedEasing = 'easeOutQuad';
        let easingOptions = [];
        let durationSliders = {};
        
        // ═══════════════════════════════════════════════════════════════
        // EASING FUNCTIONS
        // ═══════════════════════════════════════════════════════════════
        
        function easeLinear(t) {
          return t;
        }
        
        function easeInQuad(t) {
          return t * t;
        }
        
        function easeOutQuad(t) {
          return t * (2 - t);
        }
        
        function easeInOutQuad(t) {
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }
        
        function easeOutCubic(t) {
          return (--t) * t * t + 1;
        }
        
        function easeOutElastic(t) {
          const c4 = (2 * p.PI) / 3;
          return t === 0 ? 0 : t === 1 ? 1 : 
            Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
        }
        
        function easeOutBounce(t) {
          const n1 = 7.5625;
          const d1 = 2.75;
          if (t < 1 / d1) {
            return n1 * t * t;
          } else if (t < 2 / d1) {
            return n1 * (t -= 1.5 / d1) * t + 0.75;
          } else if (t < 2.5 / d1) {
            return n1 * (t -= 2.25 / d1) * t + 0.9375;
          } else {
            return n1 * (t -= 2.625 / d1) * t + 0.984375;
          }
        }
        
        // All available easing functions
        const easingFunctions = {
          linear: { fn: easeLinear, name: 'Linear' },
          easeInQuad: { fn: easeInQuad, name: 'Ease In' },
          easeOutQuad: { fn: easeOutQuad, name: 'Ease Out' },
          easeInOutQuad: { fn: easeInOutQuad, name: 'Ease In-Out' },
          easeOutCubic: { fn: easeOutCubic, name: 'Ease Out Cubic' },
          easeOutElastic: { fn: easeOutElastic, name: 'Elastic' },
          easeOutBounce: { fn: easeOutBounce, name: 'Bounce' }
        };
        
        // ═══════════════════════════════════════════════════════════════
        // GOOGLE MATERIAL ICONS (MaterialIcons-Regular codepoints)
        // ═══════════════════════════════════════════════════════════════
        const MATERIAL_ICONS = {
          person: '\uE7FD',       // person
          message: '\uE0C9',     // message
          settings: '\uE8B8',    // settings
          notification: '\uE7F4', // notifications
          gallery: '\uE413',     // photo_library
          calendar: '\uE935',    // calendar_today
          help: '\uE8FD'        // help_outline
        };

        function drawMaterialIcon(x, y, iconType) {
          const iconChar = MATERIAL_ICONS[iconType];
          if (!iconChar) return;
          p.push();
          p.fill(0); // Black
          p.noStroke();
          p.textFont('Material Icons');
          p.textSize(28);
          p.textAlign(p.CENTER, p.CENTER);
          p.text(iconChar, x, y);
          p.pop();
        }

        
        // ═══════════════════════════════════════════════════════════════
        // SETUP
        // ═══════════════════════════════════════════════════════════════
        
        p.setup = () => {
          p.createCanvas(800, 640);
          
          // Load Roboto font (using system font as fallback)
          p.textFont('Roboto, sans-serif');
          
          // Create easing selector buttons - reduced height by 8px (from 40 to 32)
          let index = 0;
          for (let key in easingFunctions) {
            easingOptions.push({
              id: key,
              name: easingFunctions[key].name,
              x: 530,
              y: 40 + (index * 42), // Adjusted spacing for smaller buttons
              width: 240,
              height: 32 // Reduced from 40 to 32
            });
            index++;
          }
          
          // Initialize duration sliders with default values
          durationSliders = {
            itemDelay: { value: 150, min: 0, max: 500, dragging: false, editing: false },
            itemDuration: { value: 800, min: 100, max: 2000, dragging: false, editing: false },
            startDelay: { value: 500, min: 0, max: 2000, dragging: false, editing: false }
          };
          
          // Define menu items with 12px spacing (67px total per item: 55px height + 12px gap)
          // First item targetY 86 so there is consistent top margin below easing label (58 + 14 + 14 gap)
          menuItems = [
            {
              label: 'Profile',
              iconType: 'person',
              targetY: 86,
              delay: 0,
              duration: 800,
              progress: 0,
              x: 50,
              startY: 700
            },
            {
              label: 'Messages',
              iconType: 'message',
              targetY: 153,
              delay: 150,
              duration: 800,
              progress: 0,
              x: 50,
              startY: 700
            },
            {
              label: 'Settings',
              iconType: 'settings',
              targetY: 220,
              delay: 300,
              duration: 800,
              progress: 0,
              x: 50,
              startY: 700
            },
            {
              label: 'Notifications',
              iconType: 'notification',
              targetY: 287,
              delay: 450,
              duration: 800,
              progress: 0,
              x: 50,
              startY: 700
            },
            {
              label: 'Gallery',
              iconType: 'gallery',
              targetY: 354,
              delay: 600,
              duration: 800,
              progress: 0,
              x: 50,
              startY: 700
            },
            {
              label: 'Calendar',
              iconType: 'calendar',
              targetY: 421,
              delay: 750,
              duration: 800,
              progress: 0,
              x: 50,
              startY: 700
            },
            {
              label: 'Help',
              iconType: 'help',
              targetY: 488,
              delay: 900,
              duration: 800,
              progress: 0,
              x: 50,
              startY: 700
            }
          ];
        };
        
        // ═══════════════════════════════════════════════════════════════
        // DRAW LOOP
        // ═══════════════════════════════════════════════════════════════
        
        function getIsDarkMode() {
          const container = p.canvas && p.canvas.parentElement;
          return container?.getAttribute('data-is-dark') !== 'false';
        }

        p.draw = () => {
          const isDarkMode = getIsDarkMode();
          p.background(isDarkMode ? 20 : 255);

          // Draw phone frame FIRST
          drawPhone();
          drawEasingSelector();
          drawDurationControls();
          
          // Start animation after a brief delay
          if (!loadingStarted && p.frameCount > 30) {
            loadingStarted = true;
            startTime = p.millis();
          }
          
          // Draw screen content (on top of phone)
          if (loadingStarted) {
            drawScreenContent();
          }
          
          // Draw mask on top to clip menu items to screen area
          drawPhoneMask();
          
          // Handle cursor
          updateCursor();
        };
        
        // ═══════════════════════════════════════════════════════════════
        // DRAW FUNCTIONS
        // ═══════════════════════════════════════════════════════════════
        
        function drawPhone() {
          const isDarkMode = getIsDarkMode();
          p.push();
          p.translate(240, p.height / 2);

          // Phone body (slightly lighter in light mode)
          p.fill(isDarkMode ? 40 : 55);
          p.stroke(isDarkMode ? 60 : 90);
          p.strokeWeight(4);
          p.rect(-175, -320, 350, 640, 30);

          // Screen - theme-aware background
          p.fill(isDarkMode ? 0 : 252);
          p.noStroke();
          p.rect(-165, -280, 330, 560, 10);

          // Notch
          p.fill(isDarkMode ? 40 : 55);
          p.rect(-40, -280, 80, 20, 0, 0, 10, 10);

          p.pop();
        }

        function drawPhoneMask() {
          const isDarkMode = getIsDarkMode();
          const bezel = isDarkMode ? 40 : 55;
          p.push();
          p.translate(240, p.height / 2);
          p.noStroke();

          // Top bezel
          p.fill(bezel);
          p.rect(-175, -320, 350, 40, 30, 30, 0, 0);
          // Left bezel
          p.fill(bezel);
          p.rect(-175, -280, 10, 560);
          // Right bezel
          p.fill(bezel);
          p.rect(165, -280, 10, 560);
          // Bottom bezel
          p.fill(bezel);
          p.rect(-175, 280, 350, 40, 0, 0, 30, 30);
          p.pop();
        }

        function drawEasingSelector() {
          p.push();
          const isDarkMode = getIsDarkMode();

          // Colors: reversed-out = accent text on light background for selected
          const blue = [100, 181, 246]; // Google Blue 300
          const bgDark = [38, 38, 38];
          const borderGray = [163, 163, 163];
          const bgLight = [255, 255, 255];
          const bgLightMuted = [245, 245, 245];
          const textLight = [212, 212, 212];
          const textDark = [64, 64, 64];
          const hoverTintLight = [230, 240, 250];

          // Selector title - theme-aware
          p.fill(isDarkMode ? borderGray[0] : textDark[0], isDarkMode ? borderGray[1] : textDark[1], isDarkMode ? borderGray[2] : textDark[2]);
          p.noStroke();
          p.textAlign(p.LEFT);
          p.textSize(16);
          p.textStyle(p.NORMAL);
          p.text('Animation Style', 530, 20);

          // Draw easing option buttons - reversed out (accent text on light bg when selected)
          easingOptions.forEach(option => {
            let isHovering = p.mouseX > option.x &&
                            p.mouseX < option.x + option.width &&
                            p.mouseY > option.y &&
                            p.mouseY < option.y + option.height;

            let isSelected = option.id === selectedEasing;

            // Button background and border (same padding for selected as unselected)
            const pad = 1; // Inset so selected matches stroked buttons’ visual padding
            if (isSelected) {
              p.fill(blue[0], blue[1], blue[2]);
              p.noStroke();
              p.rect(option.x + pad, option.y + pad, option.width - pad * 2, option.height - pad * 2, 20);
            } else if (isHovering) {
              if (isDarkMode) {
                p.fill(bgDark[0], bgDark[1], bgDark[2]);
                p.stroke(blue[0], blue[1], blue[2]);
              } else {
                p.fill(hoverTintLight[0], hoverTintLight[1], hoverTintLight[2]);
                p.stroke(blue[0], blue[1], blue[2]);
              }
              p.strokeWeight(1);
              p.rect(option.x, option.y, option.width, option.height, 20);
            } else {
              if (isDarkMode) {
                p.noFill();
                p.stroke(borderGray[0], borderGray[1], borderGray[2]);
              } else {
                p.fill(bgLightMuted[0], bgLightMuted[1], bgLightMuted[2]);
                p.stroke(borderGray[0], borderGray[1], borderGray[2]);
              }
              p.strokeWeight(1);
              p.rect(option.x, option.y, option.width, option.height, 20);
            }

            // Button text - selected = white on blue; others theme-aware
            p.noStroke();
            if (isSelected) {
              p.fill(255, 255, 255);
            } else if (isHovering) {
              p.fill(isDarkMode ? 255 : blue[0], isDarkMode ? 255 : blue[1], isDarkMode ? 255 : blue[2]);
            } else {
              p.fill(isDarkMode ? textLight[0] : textDark[0], isDarkMode ? textLight[1] : textDark[1], isDarkMode ? textLight[2] : textDark[2]);
            }
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(14);
            p.textStyle(p.NORMAL);
            p.text(option.name, option.x + option.width / 2, option.y + option.height / 2);
          });

          p.pop();
        }
        
        function drawDurationControls() {
          p.push();
          const isDarkMode = getIsDarkMode();

          const labelColor = isDarkMode ? [212, 212, 212] : [64, 64, 64];
          const boxBg = isDarkMode ? [38, 38, 38] : [255, 255, 255];
          const boxText = isDarkMode ? [255, 255, 255] : [0, 0, 0];
          const handleInner = isDarkMode ? 20 : 255;
          const resetBg = isDarkMode ? [38, 38, 38] : [245, 245, 245];
          const resetStroke = isDarkMode ? [163, 163, 163] : [200, 200, 200];
          const resetText = isDarkMode ? [212, 212, 212] : [64, 64, 64];

          let startX = 530;
          let startY = 384;
          let controlSpacing = 58;
          let sliderWidth = 120;
          let sliderX = startX;

          // Title - theme-aware
          p.fill(isDarkMode ? 163 : 64, isDarkMode ? 163 : 64, isDarkMode ? 163 : 64);
          p.noStroke();
          p.textAlign(p.LEFT);
          p.textSize(16);
          p.textStyle(p.NORMAL);
          p.text('Timing Controls', startX, startY - 34);

          function drawSliderControl(label, slider, yPos) {
            p.textSize(13);
            p.fill(labelColor[0], labelColor[1], labelColor[2]);
            p.textAlign(p.LEFT);
            p.text(label, startX, yPos - 5);
            p.stroke(100, 181, 246);
            p.strokeWeight(2);
            p.line(sliderX, yPos + 15, sliderX + sliderWidth, yPos + 15);
            let normalizedValue = (slider.value - slider.min) / (slider.max - slider.min);
            let sliderHandleX = sliderX + normalizedValue * sliderWidth;
            p.noStroke();
            p.fill(100, 181, 246);
            p.circle(sliderHandleX, yPos + 15, 16);
            p.fill(handleInner);
            p.circle(sliderHandleX, yPos + 15, 8);
            let boxX = sliderX + sliderWidth + 20;
            let boxWidth = 70;
            p.fill(boxBg[0], boxBg[1], boxBg[2]);
            p.stroke(100, 181, 246);
            p.strokeWeight(1);
            p.rect(boxX, yPos + 3, boxWidth, 25, 5);
            p.noStroke();
            p.fill(boxText[0], boxText[1], boxText[2]);
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(13);
            p.text(Math.round(slider.value), boxX + boxWidth / 2, yPos + 15);
            return { sliderHandleX, yPos, boxX, boxWidth };
          }

          drawSliderControl('Item Delay (ms)', durationSliders.itemDelay, startY);
          drawSliderControl('Item Duration (ms)', durationSliders.itemDuration, startY + controlSpacing);
          drawSliderControl('Start Delay (ms)', durationSliders.startDelay, startY + controlSpacing * 2);

          let resetY = startY + controlSpacing * 3 + 14;
          p.fill(resetBg[0], resetBg[1], resetBg[2]);
          p.stroke(resetStroke[0], resetStroke[1], resetStroke[2]);
          p.strokeWeight(1);
          p.rect(startX, resetY, 230, 35, 18);
          p.noStroke();
          p.fill(resetText[0], resetText[1], resetText[2]);
          p.textAlign(p.CENTER, p.CENTER);
          p.textSize(13);
          p.text('Reset Animation', startX + 115, resetY + 17.5);

          p.pop();
        }
        
        function drawScreenContent() {
          const isDarkMode = getIsDarkMode();
          let currentTime = p.millis() - startTime;

          // App title - theme-aware (light on dark screen, dark on light screen)
          p.fill(isDarkMode ? 255 : 32, isDarkMode ? 255 : 32, isDarkMode ? 255 : 32);
          p.textAlign(p.CENTER);
          p.textSize(28);
          p.textStyle(p.BOLD);
          p.text('MyApp', 240, 25);

          // Current easing label - theme-aware
          p.textSize(14);
          p.textStyle(p.NORMAL);
          p.fill(isDarkMode ? 163 : 96, isDarkMode ? 163 : 96, isDarkMode ? 163 : 96);
          p.text(easingFunctions[selectedEasing].name, 240, 58);
          
          // Get the selected easing function
          let easingFn = easingFunctions[selectedEasing].fn;
          
          // Update menu items with dynamic delays and durations
          menuItems.forEach((item, index) => {
            item.delay = index * durationSliders.itemDelay.value;
            item.duration = durationSliders.itemDuration.value;
          });
          
          // Update and draw menu items
          menuItems.forEach(item => {
            let elapsed = currentTime - item.delay;
            
            if (elapsed > 0 && item.progress < 1) {
              let t = Math.min(elapsed / item.duration, 1);
              // Clamp so Elastic/Bounce overshoots don't break layout (progress must stay 0–1)
              item.progress = Math.max(0, Math.min(1, easingFn(t)));
            }
            
            if (item.progress > 0) {
              let currentY = p.lerp(item.startY, item.targetY, item.progress);
              let opacity = item.progress * 255;
              
              // Menu item background - Google Blue 300
              p.push();
              p.fill(100, 181, 246, opacity);
              p.noStroke();
              p.rect(item.x + 40, currentY, 300, 55, 10);
              
              // Draw icon with 12px left padding
              let iconX = item.x + 40 + 12 + 15;
              let iconY = currentY + 27.5;
              
              p.push();
              p.drawingContext.globalAlpha = item.progress;
              drawMaterialIcon(iconX, iconY, item.iconType);
              p.pop();
              
              // Menu label - Roboto Medium with Black text
              p.fill(0, opacity); // Black text
              p.textAlign(p.LEFT);
              p.textSize(18);
              p.textStyle(p.NORMAL); // Medium weight
              p.text(item.label, item.x + 40 + 12 + 40, currentY + 35);
              
              p.pop();
            }
          });
        }
        
        function updateCursor() {
          // Check if hovering over easing options
          let easingHovering = easingOptions.some(option => 
            p.mouseX > option.x && 
            p.mouseX < option.x + option.width &&
            p.mouseY > option.y && 
            p.mouseY < option.y + option.height
          );
          
          let startX = 530;
          let startY = 384;
          let controlSpacing = 58;
          let sliderX = startX;
          let sliderWidth = 120;

          // Check if hovering over reset button
          let resetY = startY + controlSpacing * 3 + 14;
          let resetHovering = p.mouseX > startX && p.mouseX < startX + 230 &&
                             p.mouseY > resetY && p.mouseY < resetY + 35;
          
          // Check if hovering over sliders
          let sliderHovering = false;
          
          // Item Delay slider
          let delaySliderY = startY + 15;
          if (p.mouseX >= sliderX - 10 && p.mouseX <= sliderX + sliderWidth + 10 &&
              p.mouseY >= delaySliderY - 10 && p.mouseY <= delaySliderY + 10) {
            sliderHovering = true;
          }

          // Item Duration slider
          let durationSliderY = startY + controlSpacing + 15;
          if (p.mouseX >= sliderX - 10 && p.mouseX <= sliderX + sliderWidth + 10 &&
              p.mouseY >= durationSliderY - 10 && p.mouseY <= durationSliderY + 10) {
            sliderHovering = true;
          }

          // Start Delay slider
          let startDelaySliderY = startY + controlSpacing * 2 + 15;
          if (p.mouseX >= sliderX - 10 && p.mouseX <= sliderX + sliderWidth + 10 &&
              p.mouseY >= startDelaySliderY - 10 && p.mouseY <= startDelaySliderY + 10) {
            sliderHovering = true;
          }
          
          // Check if hovering over value boxes
          let boxX = sliderX + sliderWidth + 20;
          let boxWidth = 70;
          let boxHovering = false;
          
          if (p.mouseX >= boxX && p.mouseX <= boxX + boxWidth) {
            if ((p.mouseY >= startY + 3 && p.mouseY <= startY + 28) ||
                (p.mouseY >= startY + controlSpacing + 3 && p.mouseY <= startY + controlSpacing + 28) ||
                (p.mouseY >= startY + controlSpacing * 2 + 3 && p.mouseY <= startY + controlSpacing * 2 + 28)) {
              boxHovering = true;
            }
          }
          
          if (easingHovering || resetHovering || sliderHovering || boxHovering) {
            p.cursor(p.HAND);
          } else {
            p.cursor(p.ARROW);
          }
        }
        
        // ═══════════════════════════════════════════════════════════════
        // EVENT HANDLERS
        // ═══════════════════════════════════════════════════════════════
        
        p.mousePressed = () => {
          let startX = 530;
          let startY = 384;
          let controlSpacing = 58;
          let sliderX = startX;
          let sliderWidth = 120;
          let boxX = sliderX + sliderWidth + 20;
          let boxWidth = 70;

          // Check if any easing option was clicked
          easingOptions.forEach(option => {
            if (p.mouseX > option.x &&
                p.mouseX < option.x + option.width &&
                p.mouseY > option.y &&
                p.mouseY < option.y + option.height) {
              selectedEasing = option.id;
              loadingStarted = false;
              startTime = 0;
              menuItems.forEach(item => item.progress = 0);
            }
          });

          // Check if reset button clicked
          let resetY = startY + controlSpacing * 3 + 14;
          if (p.mouseX > startX && p.mouseX < startX + 230 &&
              p.mouseY > resetY && p.mouseY < resetY + 35) {
            loadingStarted = false;
            startTime = 0;
            menuItems.forEach(item => item.progress = 0);
          }
          
          // Check if clicking on sliders
          let delaySliderY = startY + 15;
          if (p.mouseX >= sliderX && p.mouseX <= sliderX + sliderWidth &&
              p.mouseY >= delaySliderY - 10 && p.mouseY <= delaySliderY + 10) {
            durationSliders.itemDelay.dragging = true;
          }

          let durationSliderY = startY + controlSpacing + 15;
          if (p.mouseX >= sliderX && p.mouseX <= sliderX + sliderWidth &&
              p.mouseY >= durationSliderY - 10 && p.mouseY <= durationSliderY + 10) {
            durationSliders.itemDuration.dragging = true;
          }

          let startDelaySliderY = startY + controlSpacing * 2 + 15;
          if (p.mouseX >= sliderX && p.mouseX <= sliderX + sliderWidth &&
              p.mouseY >= startDelaySliderY - 10 && p.mouseY <= startDelaySliderY + 10) {
            durationSliders.startDelay.dragging = true;
          }
          
          // Check if clicking on value boxes for direct editing
          if (p.mouseX >= boxX && p.mouseX <= boxX + boxWidth) {
            // Item Delay box
            if (p.mouseY >= startY + 3 && p.mouseY <= startY + 28) {
              let newVal = prompt('Enter Item Delay (ms):', Math.round(durationSliders.itemDelay.value));
              if (newVal !== null) {
                let val = parseInt(newVal);
                if (!isNaN(val)) {
                  durationSliders.itemDelay.value = Math.max(durationSliders.itemDelay.min, 
                    Math.min(durationSliders.itemDelay.max, val));
                  loadingStarted = false;
                  startTime = 0;
                  menuItems.forEach(item => item.progress = 0);
                }
              }
            }
            
            // Item Duration box
            if (p.mouseY >= startY + controlSpacing + 3 && p.mouseY <= startY + controlSpacing + 28) {
              let newVal = prompt('Enter Item Duration (ms):', Math.round(durationSliders.itemDuration.value));
              if (newVal !== null) {
                let val = parseInt(newVal);
                if (!isNaN(val)) {
                  durationSliders.itemDuration.value = Math.max(durationSliders.itemDuration.min, 
                    Math.min(durationSliders.itemDuration.max, val));
                  loadingStarted = false;
                  startTime = 0;
                  menuItems.forEach(item => item.progress = 0);
                }
              }
            }
            
            // Start Delay box
            if (p.mouseY >= startY + controlSpacing * 2 + 3 && p.mouseY <= startY + controlSpacing * 2 + 28) {
              let newVal = prompt('Enter Start Delay (ms):', Math.round(durationSliders.startDelay.value));
              if (newVal !== null) {
                let val = parseInt(newVal);
                if (!isNaN(val)) {
                  durationSliders.startDelay.value = Math.max(durationSliders.startDelay.min, 
                    Math.min(durationSliders.startDelay.max, val));
                }
              }
            }
          }
        };
        
        p.mouseDragged = () => {
          let startX = 530;
          let sliderX = startX;
          let sliderWidth = 120;
          
          // Update slider values based on mouse position
          if (durationSliders.itemDelay.dragging) {
            let normalizedPos = (p.mouseX - sliderX) / sliderWidth;
            normalizedPos = Math.max(0, Math.min(1, normalizedPos));
            durationSliders.itemDelay.value = durationSliders.itemDelay.min + 
              normalizedPos * (durationSliders.itemDelay.max - durationSliders.itemDelay.min);
            
            // Reset animation
            loadingStarted = false;
            startTime = 0;
            menuItems.forEach(item => item.progress = 0);
          }
          
          if (durationSliders.itemDuration.dragging) {
            let normalizedPos = (p.mouseX - sliderX) / sliderWidth;
            normalizedPos = Math.max(0, Math.min(1, normalizedPos));
            durationSliders.itemDuration.value = durationSliders.itemDuration.min + 
              normalizedPos * (durationSliders.itemDuration.max - durationSliders.itemDuration.min);
            
            // Reset animation
            loadingStarted = false;
            startTime = 0;
            menuItems.forEach(item => item.progress = 0);
          }
          
          if (durationSliders.startDelay.dragging) {
            let normalizedPos = (p.mouseX - sliderX) / sliderWidth;
            normalizedPos = Math.max(0, Math.min(1, normalizedPos));
            durationSliders.startDelay.value = durationSliders.startDelay.min + 
              normalizedPos * (durationSliders.startDelay.max - durationSliders.startDelay.min);
          }
        };
        
        p.mouseReleased = () => {
          // Stop dragging all sliders
          durationSliders.itemDelay.dragging = false;
          durationSliders.itemDuration.dragging = false;
          durationSliders.startDelay.dragging = false;
        };
      };

      // Create p5 instance only if it doesn't exist
      if (containerRef.current && window.p5 && !p5Instance.current) {
        p5Instance.current = new window.p5(phoneSketch, containerRef.current);
      }
    };

    // Check if p5.js is already loaded
    if (window.p5) {
      initializeSketch();
    } else {
      // Load p5.js dynamically
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js';
      script.async = true;
      script.onload = initializeSketch;
      document.head.appendChild(script);
    }

    // Cleanup
    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
        p5Instance.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center w-full"
      data-is-dark={isDark}
      aria-hidden="true"
    />
  );
};

export default PhoneLoader;