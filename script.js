const apiKey = "5717dbc9c416d8510aa7e9f9d616585a"; // API 키
            const cityInput = document.getElementById("city");
            const weatherDiv = document.getElementById("weather");
            const mapDiv = document.getElementById("map");

            document.getElementById("getWeather").addEventListener("click", () => {
                const city = cityInput.value;
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`;

                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        if (data.cod === 200) {
                            // 날씨 정보 출력
                            weatherDiv.innerHTML = `
                                <h3>Weather in ${data.name}</h3>
                                <p>Temperature: ${data.main.temp}°C</p>
                                <p>Weather: ${data.weather[0].description}</p>
                                <p>Humidity: ${data.main.humidity}%</p>
                            `;
                            
                            // 지도 표시
                            const lat = data.coord.lat;
                            const lon = data.coord.lon;
                            
                            // Leaflet 지도 설정
                            const map = L.map(mapDiv).setView([lat, lon], 13);
                            
                            // OpenStreetMap 타일 레이어 추가
                            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            }).addTo(map);

                            // 마커 추가
                            L.marker([lat, lon]).addTo(map)
                                .bindPopup(`<b>${data.name}</b><br>Weather: ${data.weather[0].description}`)
                                .openPopup();
                        } else {
                            weatherDiv.innerHTML = `<p>날씨 정보를 가져올 수 없습니다.</p>`;
                        }
                    })
                    .catch(error => {
                        weatherDiv.innerHTML = `<p>API 호출 오류: ${error.message}</p>`;
                    });
            });