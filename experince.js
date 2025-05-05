
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Неуловимая кнопка</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
            overflow: hidden;
            position: relative;
        }
        
        #game-container {
            position: relative;
            width: 800px;
            height: 600px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        #elusive-button {
            position: absolute;
            width: 120px;
            height: 50px;
            border: none;
            border-radius: 25px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s, background 0.3s;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
            background-size: 400% 400%;
            animation: rainbow 5s linear infinite;
        }
        
        #message {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 24px;
            font-weight: bold;
            color: #333;
            opacity: 0;
            transition: opacity 0.3s;
            text-align: center;
        }
        
        @keyframes rainbow {
            0% {
                background-position: 0% 50%;
            }
            100% {
                background-position: 400% 50%;
            }
        }
        
        .instructions {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            color: #666;
        }
    </style>
</head>
<body>
    <div id="game-container">
        <button id="elusive-button">Поймай меня</button>
        <div id="message">Иди уроки учи!</div>
        <div class="instructions">Чтобы поймать кнопку, нажми F5 и поставь курсор в центр экрана</div>
    </div>

    <script>
        const button = document.getElementById('elusive-button');
        const message = document.getElementById('message');
        const gameContainer = document.getElementById('game-container');
        
        // Начальная позиция кнопки (центр экрана)
        let buttonX = gameContainer.offsetWidth / 2 - 60;
        let buttonY = gameContainer.offsetHeight / 2 - 25;
        
        // Обновляем позицию кнопки
        function updateButtonPosition() {
            button.style.left = `${buttonX}px`;
            button.style.top = `${buttonY}px`;
        }
        
        // Перемещаем кнопку при наведении
        button.addEventListener('mouseover', () => {
            // Генерируем случайные координаты в пределах контейнера
            buttonX = Math.random() * (gameContainer.offsetWidth - 120);
            buttonY = Math.random() * (gameContainer.offsetHeight - 50);
            
            // Генерируем случайный цвет
            const hue = Math.floor(Math.random() * 360);
            button.style.filter = `hue-rotate(${hue}deg)`;
            
            updateButtonPosition();
        });
        
        // Обработка клика по кнопке
        button.addEventListener('click', () => {
            message.style.opacity = '1';
            setTimeout(() => {
                message.style.opacity = '0';
            }, 2000);
        });
        
        // Инициализация позиции кнопки
        updateButtonPosition();
        
        // Обработчик для F5 - возвращаем кнопку в центр
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F5') {
                e.preventDefault();
                buttonX = gameContainer.offsetWidth / 2 - 60;
                buttonY = gameContainer.offsetHeight / 2 - 25;
                updateButtonPosition();
            }
        });
        
        // Запрещаем контекстное меню (правый клик)
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    </script>
</body>
</html>
